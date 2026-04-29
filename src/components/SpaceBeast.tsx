import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export function SpaceBeast() {
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      animationFrameId = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        
        const trackingRadius = 6; 
        
        const updateEye = (eye: HTMLDivElement | null) => {
          if (!eye) return;
          const rect = eye.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
          const distance = Math.min(trackingRadius, Math.hypot(e.clientX - centerX, e.clientY - centerY) * 0.05);

          const x = Math.cos(angle) * distance;
          const y = Math.sin(angle) * distance;

          eye.style.transform = `translate(${x}px, ${y}px)`;
        };

        updateEye(leftEyeRef.current);
        updateEye(rightEyeRef.current);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[350px] pointer-events-none z-20 overflow-hidden"
      ref={containerRef}
    >
      <motion.div 
        className="relative w-full h-full flex justify-center items-end"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut", delay: 1 }}
      >
        {/* 暗金巨龙 - 体积感与光影重绘 */}
        <div 
          className="relative w-[500px] h-[300px] flex items-end justify-center"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <svg width="100%" height="100%" viewBox="0 0 500 300" fill="none" style={{ filter: 'drop-shadow(0 -10px 20px rgba(212,175,55,0.2))' }}>
            <defs>
              {/* 金色体积渐变 */}
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFDF00" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#8B6508" />
              </linearGradient>
              {/* 鳞片高光渐变 */}
              <linearGradient id="scaleHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,223,0,0.8)" />
                <stop offset="100%" stopColor="rgba(139,101,8,0)" />
              </linearGradient>
              {/* 暗色阴影过渡 */}
              <radialGradient id="shadowGlow" cx="50%" cy="100%" r="50%">
                <stop offset="0%" stopColor="#000000" stopOpacity="0.8" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* 背景阴影兜底 */}
            <path d="M150 300 C 100 200, 200 50, 250 50 C 300 50, 400 200, 350 300 Z" fill="url(#shadowGlow)" />

            {/* 巨龙盘绕的身躯 (后景) */}
            <path d="M50 300 Q 80 150 250 150 T 450 300" fill="none" stroke="url(#goldGradient)" strokeWidth="40" strokeLinecap="round" opacity="0.6" />
            <path d="M50 300 Q 80 150 250 150 T 450 300" fill="none" stroke="url(#scaleHighlight)" strokeWidth="40" strokeLinecap="round" opacity="0.3" strokeDasharray="10 5" />

            {/* 龙头轮廓与角 */}
            {/* 左龙角 */}
            <path d="M220 80 Q 200 20 150 10 Q 180 40 210 90" fill="url(#goldGradient)" />
            <path d="M200 70 Q 180 30 140 25 Q 170 50 190 80" fill="url(#goldGradient)" opacity="0.7" />
            {/* 右龙角 */}
            <path d="M280 80 Q 300 20 350 10 Q 320 40 290 90" fill="url(#goldGradient)" />
            <path d="M300 70 Q 320 30 360 25 Q 330 50 310 80" fill="url(#goldGradient)" opacity="0.7" />

            {/* 脸部骨架与体积 */}
            <path d="M250 60 C 200 60, 180 150, 200 200 L 250 250 L 300 200 C 320 150, 300 60, 250 60 Z" fill="url(#goldGradient)" />
            {/* 脸部高光层 */}
            <path d="M250 60 C 220 60, 200 120, 220 160 L 250 190 L 280 160 C 300 120, 280 60, 250 60 Z" fill="url(#scaleHighlight)" />

            {/* 龙须 (动态飘逸) */}
            <path d="M210 180 Q 100 220 80 150" fill="none" stroke="#FFDF00" strokeWidth="3" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 5px #FFDF00)' }} />
            <path d="M290 180 Q 400 220 420 150" fill="none" stroke="#FFDF00" strokeWidth="3" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 5px #FFDF00)' }} />
            
            {/* 吻部/鼻子立体感 */}
            <path d="M230 200 Q 250 180 270 200 L 260 230 L 240 230 Z" fill="#8B6508" />
            <circle cx="240" cy="220" r="4" fill="#000" />
            <circle cx="260" cy="220" r="4" fill="#000" />

            {/* 眼睛窝深邃阴影 */}
            <ellipse cx="215" cy="140" rx="25" ry="12" fill="#000" transform="rotate(-15 215 140)" />
            <ellipse cx="285" cy="140" rx="25" ry="12" fill="#000" transform="rotate(15 285 140)" />
          </svg>

          {/* 交互眼球 (悬浮在 SVG 阴影眼窝之上) */}
          <div className="absolute top-[41%] w-full h-[60px]">
            {/* 左眼瞳孔 */}
            <div className="absolute left-[39.5%] top-[15%] w-[40px] h-[20px] flex justify-center items-center overflow-hidden" style={{ transform: 'rotate(-15deg)' }}>
              <motion.div 
                ref={leftEyeRef}
                className="w-3 h-3 bg-white rounded-full shadow-[0_0_15px_#FFDF00,0_0_30px_#D4AF37]"
                animate={{ scaleY: isHovering ? 0.3 : 1 }}
              />
            </div>

            {/* 右眼瞳孔 */}
            <div className="absolute right-[39.5%] top-[15%] w-[40px] h-[20px] flex justify-center items-center overflow-hidden" style={{ transform: 'rotate(15deg)' }}>
              <motion.div 
                ref={rightEyeRef}
                className="w-3 h-3 bg-white rounded-full shadow-[0_0_15px_#FFDF00,0_0_30px_#D4AF37]"
                animate={{ scaleY: isHovering ? 0.3 : 1 }}
              />
            </div>
          </div>

          {/* 龙体散发的纯正金光 */}
          <motion.div 
            className="absolute bottom-0 w-[100%] h-32 bg-[#D4AF37]/10 blur-[40px] rounded-full"
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
