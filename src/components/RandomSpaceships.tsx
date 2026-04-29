import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 生成随机位置和大小的辅助函数
const random = (min: number, max: number) => Math.random() * (max - min) + min;

// 简单的流星 SVG
function MeteorSVG({ color = "white" }) {
  return (
    <div className="relative w-24 h-4 flex items-center justify-end">
      {/* 流星尾迹 (渐变长条) */}
      <div 
        className="absolute left-0 h-[1px] w-20 rounded-full" 
        style={{ 
          background: `linear-gradient(to right, transparent, ${color})`,
          opacity: 0.8
        }} 
      />
      {/* 流星头部 (亮光点) */}
      <div 
        className="absolute right-0 w-1.5 h-1.5 rounded-full bg-white" 
        style={{ boxShadow: `0 0 4px 2px ${color}, 0 0 8px 4px white` }} 
      />
    </div>
  );
}

interface Spaceship {
  id: number;
  startX: number;
  endX: number;
  startY: number;
  endY: number;
  duration: number;
  delay: number;
  scale: number;
  opacity: number;
  color: string;
}

export function RandomSpaceships() {
  const [ships, setShips] = useState<Spaceship[]>([]);

  useEffect(() => {
    // 颜色池：蓝、青、紫、白
    const colors = ['#4F46E5', '#06B6D4', '#9333EA', '#FFFFFF'];

    // 初始生成几只流星
    const generateShip = (id: number) => {
      // 从左侧或右侧出现
      const startFromLeft = Math.random() > 0.5;
      return {
        id,
        startX: startFromLeft ? -10 : 110,
        endX: startFromLeft ? 110 : -10,
        startY: random(0, 50), // 从偏上的位置出现
        endY: random(50, 100), // 向下划过
        duration: random(2, 6), // 流星速度快一些
        delay: random(0, 10),
        scale: random(0.5, 1.5),
        opacity: random(0.4, 1),
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    };

    setShips([generateShip(1), generateShip(2), generateShip(3), generateShip(4), generateShip(5), generateShip(6), generateShip(7), generateShip(8)]);

    // 定期更新飞船，形成持续随机飞行效果
    const interval = setInterval(() => {
      setShips(prev => prev.map(ship => ({
        ...ship,
        ...generateShip(ship.id),
        id: ship.id + Math.random(), // 强制重新挂载动画
      })));
    }, 15000); // 15秒重置一波

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[10] overflow-hidden">
      <AnimatePresence>
        {ships.map(ship => {
          // 根据起点和终点计算偏航角
          const dx = ship.endX - ship.startX;
          const dy = ship.endY - ship.startY;
          // 由于屏幕是长方形，我们需要考虑屏幕宽高比来计算真实的视觉角度
          // 假设标准的宽高比为 16:9，即大约 1.77
          // vh 和 vw 的物理长度不同，所以我们需要进行换算
          // dy 是 vh，dx 是 vw。要得到真实的屏幕角度，需要把它们转换到相同的比例
          const aspectRatio = typeof window !== 'undefined' ? window.innerWidth / window.innerHeight : 16/9;
          const realDx = dx * aspectRatio;
          
          // 使用 atan2 计算角度，减去 90 度让头部指向飞行方向
          const angle = Math.atan2(dy, realDx) * (180 / Math.PI);

          return (
            <motion.div
              key={ship.id}
              initial={{ 
                x: `${ship.startX}vw`, 
                y: `${ship.startY}vh`, 
                opacity: 0,
                rotate: angle,
                scale: ship.scale 
              }}
              animate={{ 
                x: `${ship.endX}vw`, 
                y: `${ship.endY}vh`,
                opacity: [0, ship.opacity, ship.opacity, 0],
              }}
              transition={{ 
                duration: ship.duration, 
                delay: ship.delay, 
                ease: "linear" 
              }}
              className="absolute top-0 left-0"
            >
              <MeteorSVG color={ship.color} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
