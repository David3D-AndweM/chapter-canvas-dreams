import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

interface VelocityTextProps {
  children: React.ReactNode;
  className?: string;
  baseVelocity?: number;
}

const VelocityText = ({ children, className = '', baseVelocity = 1 }: VelocityTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const scrollVelocity = useTransform(scrollY, (latest) => {
    if (typeof latest === 'number') {
      return latest * baseVelocity;
    }
    return 0;
  });

  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  const x = useTransform(smoothVelocity, [0, 1000], [0, -100]);

  return (
    <div ref={containerRef} className="overflow-hidden whitespace-nowrap">
      <motion.div
        style={{ x }}
        className={`inline-block ${className}`}
      >
        {children}
        {children}
        {children}
      </motion.div>
    </div>
  );
};

export default VelocityText;
