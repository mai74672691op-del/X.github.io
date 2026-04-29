import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  uniform float uTime;
  uniform vec3 uMouse;
  uniform float uAbsorbRadius;
  uniform float uScatterRadius;
  
  attribute vec3 aColor;
  attribute float aSize;
  attribute float aSpeed;
  attribute float aOffset;
  // 新增: 传递给片段着色器，决定显示0还是1
  attribute float aDigit;

  varying vec3 vColor;
  varying float vAlpha;
  varying float vDigit;

  void main() {
    vColor = aColor;
    vAlpha = 1.0;
    vDigit = aDigit;

    vec3 pos = position;

    // 基础旋转
    float angle = atan(pos.y, pos.x);
    float radius = length(pos.xy);
    angle += uTime * aSpeed / (radius + 0.5) + aOffset;
    
    pos.x = radius * cos(angle);
    pos.y = radius * sin(angle);
    
    // Z轴起伏
    pos.z += sin(uTime * 2.0 + aOffset) * 0.2;

    // 鼠标交互逻辑
    float distToMouse = distance(pos.xy, uMouse.xy);
    
    float finalSize = aSize * 2.0; // 稍微放大一点点以看清数字

    if (distToMouse < uAbsorbRadius) {
      // 吸收范围：强行拉向鼠标中心
      float pull = 1.0 - (distToMouse / uAbsorbRadius); // 越近引力越大
      // 产生旋涡效果：向中心靠拢的同时加速旋转
      float swirlAngle = atan(pos.y - uMouse.y, pos.x - uMouse.x);
      swirlAngle += pull * 2.0; 
      
      float newRadius = mix(distance(pos.xy, uMouse.xy), 0.0, pull * 0.8);
      
      pos.x = uMouse.x + newRadius * cos(swirlAngle);
      pos.y = uMouse.y + newRadius * sin(swirlAngle);
      
      // 靠近中心时透明度降低，模拟被吞噬
      vAlpha = smoothstep(0.0, uAbsorbRadius * 0.5, distToMouse);
      // 尺寸根据距离缩小
      finalSize *= (distToMouse / uAbsorbRadius);
      
    } else if (distToMouse < uScatterRadius) {
      // 散开范围：受到排斥力和扰动
      float push = 1.0 - ((distToMouse - uAbsorbRadius) / (uScatterRadius - uAbsorbRadius));
      vec2 dir = normalize(pos.xy - uMouse.xy);
      
      // 向外排斥
      pos.xy += dir * push * 1.5;
      // Z轴散开
      pos.z += (sin(aOffset) > 0.0 ? 1.0 : -1.0) * push * 2.0;
      
      // 散开时变亮
      vColor = mix(vColor, vec3(1.0, 1.0, 1.0), push * 0.5);
      finalSize *= (1.0 + push * 1.5);
      vAlpha = 1.0 - push * 0.5; // 轻微变透明
    }

    // 根据Z深度调整最终尺寸
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = finalSize * (15.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  varying vec3 vColor;
  varying float vAlpha;
  varying float vDigit;

  void main() {
    // 根据 aDigit (0 或 1) 选择读取纹理的左半边或右半边
    vec2 uv = gl_PointCoord;
    uv.x = uv.x * 0.5 + (vDigit > 0.5 ? 0.5 : 0.0);
    
    vec4 texColor = texture2D(uTexture, uv);
    
    // 使用纹理的 alpha 通道来作为粒子的 alpha
    float alpha = texColor.a * vAlpha;
    if (alpha < 0.1) discard;
    
    gl_FragColor = vec4(vColor, alpha);
  }
`;

// 创建 0 和 1 的纹理
function createDigitTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128; // 左半边放0，右半边放1
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, 128, 64);
    
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 48px monospace';
    
    ctx.fillText('0', 32, 32);
    ctx.fillText('1', 96, 32);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function BlackHole({
  color1 = '#00ffff', // 赛博青/蓝绿
  color2 = '#ff4500', // 橙红色
  color3 = '#000000', // 深暗
}: {
  color1?: string;
  color2?: string;
  color3?: string;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();
  const mousePosition = useRef(new THREE.Vector3(0, 0, 0));

  const particleCount = 10000; // 优化粒子数量以兼顾转场性能

  const [positions, colors, sizes, speeds, offsets, digits, digitTexture] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const speeds = new Float32Array(particleCount);
    const offsets = new Float32Array(particleCount);
    const digits = new Float32Array(particleCount);
    
    const colorPrimary = new THREE.Color(color1);
    const colorSecondary = new THREE.Color(color2);
    const colorTertiary = new THREE.Color(color3);

    for (let i = 0; i < particleCount; i++) {
      // 不同的星云簇分布
      const clusterType = Math.random();
      let radius, angle, x, y, z;

      if (clusterType > 0.85) {
        // 极远景大尺度星尘背景
        radius = 15 + Math.random() * 25;
        angle = Math.random() * Math.PI * 2;
        x = Math.cos(angle) * radius + (Math.random() - 0.5) * 10;
        y = Math.sin(angle) * radius + (Math.random() - 0.5) * 10;
        z = (Math.random() - 0.5) * 20 - 10; // 推向深处
      } else if (clusterType > 0.6) {
        // 宏大星系旋臂
        const armCount = 3;
        const armIndex = Math.floor(Math.random() * armCount);
        const armOffset = (Math.PI * 2 * armIndex) / armCount;
        
        radius = 2 + Math.random() * 15;
        angle = radius * 0.5 + armOffset + (Math.random() - 0.5) * 0.5; // 旋臂弯曲度与发散度
        
        x = Math.cos(angle) * radius;
        y = Math.sin(angle) * radius;
        z = (Math.random() - 0.5) * 2;
      } else if (clusterType > 0.2) {
        // 主吸积盘 (致密环形)
        radius = 1.5 + Math.random() * 5;
        angle = Math.random() * Math.PI * 2;
        x = Math.cos(angle) * radius;
        y = Math.sin(angle) * radius;
        z = (Math.random() - 0.5) * 0.8;
      } else {
        // 内部黑洞边缘光晕层
        radius = 0.8 + Math.random() * 1.2;
        angle = Math.random() * Math.PI * 2;
        x = Math.cos(angle) * radius;
        y = Math.sin(angle) * radius;
        z = (Math.random() - 0.5) * 0.2;
      }

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // 颜色分配
      const mixedColor = new THREE.Color();
      const distFromCenter = Math.sqrt(x * x + y * y);
      
      if (distFromCenter < 2) {
        mixedColor.copy(colorTertiary).lerp(colorPrimary, distFromCenter / 2);
      } else {
        mixedColor.copy(colorPrimary).lerp(colorSecondary, (distFromCenter - 2) / 6);
      }
      
      // 添加一些随机白斑
      if (Math.random() > 0.95) mixedColor.setHex(0xffffff);

      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;

      // 尺寸、速度、偏移、数字(0或1)
      sizes[i] = Math.random() * 2.0 + 1.0;
      speeds[i] = 0.2 + Math.random() * 0.5;
      offsets[i] = Math.random() * Math.PI * 2;
      digits[i] = Math.random() > 0.5 ? 1.0 : 0.0;
    }

    return [positions, colors, sizes, speeds, offsets, digits, createDigitTexture()];
  }, [particleCount, color1, color2, color3]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector3(0, 0, 0) },
      uAbsorbRadius: { value: 1.5 }, // 吸收范围
      uScatterRadius: { value: 3.5 }, // 散开范围
      uTexture: { value: digitTexture }
    }),
    [digitTexture]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // 将鼠标屏幕坐标映射到 NDC (归一化设备坐标)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      
      // 映射到场景世界坐标 (假设 Z = 0 的平面)
      // 考虑相机的视角和视口尺寸
      mousePosition.current.set(
        (x * viewport.width) / 2,
        (y * viewport.height) / 2,
        0
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [viewport]);

  useFrame((state) => {
    if (!pointsRef.current || !materialRef.current) return;
    
    // 更新着色器 Uniforms
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    
    // 平滑插值鼠标位置
    materialRef.current.uniforms.uMouse.value.lerp(mousePosition.current, 0.1);

    // 整体场景轻微倾斜旋转
    pointsRef.current.rotation.x = Math.PI / 6; // 稍微俯视
    pointsRef.current.rotation.z -= 0.0005; // 整体极慢自转
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aColor"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aSize"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aSpeed"
          count={speeds.length}
          array={speeds}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aOffset"
          count={offsets.length}
          array={offsets}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aDigit"
          count={digits.length}
          array={digits}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
