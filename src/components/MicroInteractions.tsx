import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PulseProps {
  children: ReactNode;
  className?: string;
}

export const Pulse = ({ children, className = '' }: PulseProps) => (
  <motion.div
    className={className}
    animate={{
      scale: [1, 1.05, 1],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    {children}
  </motion.div>
);

interface BounceProps {
  children: ReactNode;
  className?: string;
}

export const Bounce = ({ children, className = '' }: BounceProps) => (
  <motion.div
    className={className}
    whileHover={{
      y: [0, -10, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }}
  >
    {children}
  </motion.div>
);

interface RotateProps {
  children: ReactNode;
  className?: string;
}

export const Rotate = ({ children, className = '' }: RotateProps) => (
  <motion.div
    className={className}
    whileHover={{
      rotate: [0, -5, 5, -5, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }}
  >
    {children}
  </motion.div>
);

interface GlowProps {
  children: ReactNode;
  className?: string;
}

export const Glow = ({ children, className = '' }: GlowProps) => (
  <motion.div
    className={`relative ${className}`}
    whileHover={{
      filter: "drop-shadow(0 0 20px hsl(var(--primary) / 0.6))",
      transition: {
        duration: 0.3
      }
    }}
  >
    {children}
  </motion.div>
);

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export const Magnetic = ({ children, className = '', strength = 20 }: MagneticProps) => (
  <motion.div
    className={className}
    whileHover={{
      scale: 1.1,
    }}
    whileTap={{
      scale: 0.95,
    }}
    transition={{
      type: "spring",
      stiffness: 400,
      damping: 17
    }}
  >
    {children}
  </motion.div>
);
