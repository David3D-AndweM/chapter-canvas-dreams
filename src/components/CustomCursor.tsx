import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

interface CursorParticle {
  id: number;
  x: number;
  y: number;
}

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [inNoBlendZone, setInNoBlendZone] = useState(false);
  const [particles, setParticles] = useState<CursorParticle[]>([]);
  const particleIdRef = useRef(0);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 28, stiffness: 1800, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);

      // Check if in no-trail zone
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      const inNoTrailZone = el?.closest('[data-cursor="no-trail"]');
      setInNoBlendZone(!!inNoTrailZone);
      // Create particle trail (reduced frequency, skip in no-trail zones)
      if (!inNoTrailZone && Math.random() > 0.85) {
        const newParticle: CursorParticle = {
          id: particleIdRef.current++,
          x: e.clientX,
          y: e.clientY
        };
        
        setParticles(prev => [...prev, newParticle]);
        
        // Remove particle after animation (faster)
        setTimeout(() => {
          setParticles(prev => prev.filter(p => p.id !== newParticle.id));
        }, 600);
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.onclick !== null ||
        target.closest('button') !== null ||
        target.closest('a') !== null;
      
      setIsHovering(isInteractive);
    };

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Hide default cursor
  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches) {
      document.body.style.cursor = 'none';
      
      const style = document.createElement('style');
      style.innerHTML = `
        * { cursor: none !important; }
        a, button { cursor: none !important; }
      `;
      document.head.appendChild(style);

      return () => {
        document.body.style.cursor = 'auto';
        style.remove();
      };
    }
  }, []);

  if (!window.matchMedia('(pointer: fine)').matches) {
    return null;
  }

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className={inNoBlendZone ? "fixed top-0 left-0 pointer-events-none z-[9999]" : "fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 1.5 : 1,
            opacity: isVisible && !inNoBlendZone ? 1 : 0
          }}
          transition={{ duration: 0.15 }}
          className="relative -translate-x-1/2 -translate-y-1/2"
        >
          {/* Outer ring */}
          <motion.div
            animate={{
              scale: isHovering ? 1 : 1.2,
              opacity: isHovering ? 0.3 : 0.5
            }}
            className="absolute inset-0 w-10 h-10 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2"
          />
          
          {/* Inner dot */}
          <motion.div
            animate={{
              scale: isHovering ? 0 : 1,
            }}
            className="w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
          />
        </motion.div>
      </motion.div>

      {/* Particle Trail */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ 
              x: particle.x, 
              y: particle.y, 
              opacity: 1, 
              scale: 1 
            }}
            animate={{ 
              y: particle.y - 20,
              opacity: 0,
              scale: 0
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-0 left-0 pointer-events-none z-[9998]"
            style={{
              width: '6px',
              height: '6px',
              background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              filter: 'blur(1px)'
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
};

export default CustomCursor;