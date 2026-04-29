import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

// 科幻风小火箭 SVG Logo
function RocketLogo() {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

export function ScrollToNextRocket() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 根据当前路径确定下一个路径
  const getNextPath = () => {
    switch (location.pathname) {
      case '/works': return '/about';
      case '/about': return '/musings';
      case '/musings': return '/';
      default: return null;
    }
  };

  const nextPath = getNextPath();

  useEffect(() => {
    if (!nextPath) {
      setIsVisible(false);
      return;
    }

    return scrollYProgress.on('change', (latest) => {
      // 当滑动到页面最底部 (99% 以上) 时显示火箭
      if (latest > 0.99) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
  }, [scrollYProgress, nextPath]);

  if (!nextPath) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.5 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="absolute -top-32 right-[8%] z-50 cursor-pointer group"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            navigate(nextPath);
          }}
        >
          <div className="relative w-14 h-14 bg-white/10 backdrop-blur-md rounded-full p-3 border border-white/20 transition-transform hover:scale-110 hover:bg-white/20">
            <RocketLogo />
            {/* 喷射火焰动画效果 */}
            <motion.div 
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4 h-6 bg-gradient-to-b from-orange-500 to-transparent rounded-full blur-[2px] opacity-0 group-hover:opacity-100"
              animate={{ height: ['24px', '32px', '24px'] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
