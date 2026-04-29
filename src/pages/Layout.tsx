import { Outlet, Link, useLocation } from 'react-router-dom';
import { CustomCursor } from '../components/CustomCursor';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Github, Mail } from 'lucide-react';
import { ScrollToNextRocket } from '../components/ScrollToNextRocket';
import { RandomSpaceships } from '../components/RandomSpaceships';

// 小红书自定义 SVG Icon
function XiaoHongShuIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
      <path d="M12 6v12" />
      <path d="M8 10c0 2.21 1.79 4 4 4s4-1.79 4-4" />
      <path d="M8 18h8" />
    </svg>
  );
}

function Navbar({ currentPath }: { currentPath: string }) {
  const links = [
    { path: '/works', label: '数字痕迹' },
    { path: '/about', label: '关于我' },
    { path: '/musings', label: '边角碎念' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link 
          to="/" 
          className="font-serif text-xl tracking-widest text-primary cursor-pointer hover:text-white transition-colors flex items-center gap-2 logo-hover-trigger"
        >
          <span className="font-normal text-2xl tracking-[0.2em] relative">
            序章
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8 font-sans text-sm tracking-widest">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors cursor-pointer ${
                currentPath === link.path ? 'text-white' : 'text-secondary hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="py-12 border-t border-accent-line/30 text-center font-sans text-muted relative z-10 bg-background/50 backdrop-blur-sm">
      <ScrollToNextRocket />
      <div className="flex justify-center items-center gap-8 mb-6">
        <a 
          href="https://github.com/mai74672691op-del" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors cursor-pointer"
          aria-label="GitHub"
        >
          <Github size={24} strokeWidth={1.5} />
        </a>
        <a 
          href="https://xhslink.com/m/pSHpwNiMv4" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors cursor-pointer"
          aria-label="小红书"
        >
          <XiaoHongShuIcon size={24} />
        </a>
        <a 
          href="mailto:mai74672691op@gmail.com"
          className="hover:text-primary transition-colors cursor-pointer"
          aria-label="Email"
        >
          <Mail size={24} strokeWidth={1.5} />
        </a>
      </div>
      <p className="text-sm tracking-wider">
        © {new Date().getFullYear()} AI Trainer Portfolio. All rights reserved.
      </p>
    </footer>
  );
}

export function Layout() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const location = useLocation();

  return (
    <div className="bg-background min-h-screen text-primary relative selection:bg-white/20 selection:text-white">
      <CustomCursor />
      <RandomSpaceships />
      
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-white z-[60] origin-left"
        style={{ scaleX }}
      />

      <Navbar currentPath={location.pathname} />
      
      <main className="relative min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6 }}
            className="w-full min-h-screen"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
