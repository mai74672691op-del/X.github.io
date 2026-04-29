import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DogLogo } from './DogLogo';

export function InitialLoader() {
  const [stage, setStage] = useState<'loading' | 'done'>('loading');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 模拟加载进度：3秒内从0增加到1
    let startTime: number;
    const duration = 3000;

    const animateProgress = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const currentProgress = Math.min(elapsed / duration, 1);
      setProgress(currentProgress);

      if (currentProgress < 1) {
        requestAnimationFrame(animateProgress);
      } else {
        // 等待一点时间后进入 done 状态
        setTimeout(() => setStage('done'), 500);
      }
    };

    const animId = requestAnimationFrame(animateProgress);

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <AnimatePresence>
      {stage !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          <motion.div 
            className="flex flex-col items-center gap-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="w-[120px] h-[120px] mb-4 hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <DogLogo className="w-full h-full" />
            </motion.div>

            <div className="text-2xl md:text-4xl font-serif font-bold tracking-widest text-white mt-4 mb-4">
              欢迎来到我的秘密据点
            </div>
            
            {/* 进度条动画 */}
            <div className="w-64 h-[2px] bg-white/20 overflow-hidden relative rounded-full">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-white"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}