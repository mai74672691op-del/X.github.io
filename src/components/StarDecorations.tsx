import { motion, useScroll, useTransform } from 'framer-motion';

export function StarDecorations({ variant = 'default' }: { variant?: 'default' | 'works' | 'about' | 'musings' }) {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const renderStars = () => {
    switch (variant) {
      case 'works':
        return null; // 移除原先的翠绿圆框和点，保持纯净背景
      case 'about':
        return null; // 移除原先的琥珀色抽象几何
      case 'musings':
        return (
          <>
            {/* 深红散落碎星 */}
            <motion.div style={{ y: y2 }} className="absolute top-[30%] right-[20%] w-32 h-32 border-t border-r border-rose-500/20 rounded-full" />
            <motion.div style={{ y: y1 }} className="absolute top-[70%] left-[10%] w-48 h-48 border-b border-l border-rose-500/20 rounded-full" />
          </>
        );
      default:
        return null; // 主页使用复杂的3D粒子，无需SVG装饰
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {renderStars()}
    </div>
  );
}