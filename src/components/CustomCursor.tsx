import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let animationFrameId: number;

    const updateMousePosition = (e: MouseEvent) => {
      animationFrameId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    
    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key="station-cursor"
          className="fixed top-0 left-0 pointer-events-none hidden md:flex items-center justify-center text-white"
          style={{ zIndex: 9999 }}
          animate={{
            x: mousePosition.x - 24,
            y: mousePosition.y - 24,
            scale: isHovering ? 1.2 : 1,
            rotate: isHovering ? 90 : 0, // 悬停时旋转
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
            mass: 0.5,
          }}
        >
          <div className="relative w-12 h-12 flex items-center justify-center">
            {/* 外环 1 */}
            <div className="absolute inset-0 border border-[#E6F3FF]/40 rounded-full shadow-[0_0_10px_rgba(230,243,255,0.3)]" />
            {/* 外环 2 (虚线) */}
            <div className="absolute inset-1 border border-[#E6F3FF]/60 rounded-full border-dashed" />
            {/* 太阳能帆板 / 桁架交叉线 */}
            <div className="absolute w-14 h-[1px] bg-[#E6F3FF]/80 rotate-45 shadow-[0_0_5px_rgba(255,255,255,0.8)]" />
            <div className="absolute w-14 h-[1px] bg-[#E6F3FF]/80 -rotate-45 shadow-[0_0_5px_rgba(255,255,255,0.8)]" />
            {/* 中心核心发光区 */}
            <div className="absolute w-3 h-3 bg-white rounded-full shadow-[0_0_15px_2px_rgba(255,255,255,1)]" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 太空站悬停光环反馈 */}
      <AnimatePresence>
        <motion.div
          className="fixed top-0 left-0 w-24 h-24 rounded-full pointer-events-none hidden md:block"
          style={{
            zIndex: 9998,
            border: '1px solid rgba(230, 243, 255, 0.5)',
            background: 'radial-gradient(circle at center, transparent 40%, rgba(230, 243, 255, 0.1) 80%, transparent 100%)',
            boxShadow: '0 0 30px rgba(230, 243, 255, 0.2)',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            x: mousePosition.x - 48,
            y: mousePosition.y - 48,
            scale: isHovering ? 1.2 : 0,
            opacity: isHovering ? 1 : 0,
            rotate: mousePosition.x * 0.2,
          }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{
            type: 'spring',
            stiffness: 150,
            damping: 20,
            mass: 0.8,
          }}
        />
      </AnimatePresence>
    </>
  );
}
