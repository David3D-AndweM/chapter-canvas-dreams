import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface SectionTransitionProps {
  children: React.ReactNode;
  variant?: 'curtain' | 'reveal' | 'slide';
}

const SectionTransition = ({ children, variant = 'curtain' }: SectionTransitionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const variants = {
    curtain: {
      hidden: { clipPath: 'inset(0 0 100% 0)' },
      visible: { 
        clipPath: 'inset(0 0 0% 0)',
        transition: { 
          duration: 1.2, 
          ease: [0.34, 1.56, 0.64, 1] as any
        }
      }
    },
    reveal: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: { 
          duration: 0.8,
          ease: [0.34, 1.56, 0.64, 1] as any
        }
      }
    },
    slide: {
      hidden: { x: -100, opacity: 0 },
      visible: { 
        x: 0, 
        opacity: 1,
        transition: { 
          duration: 0.8,
          ease: [0.34, 1.56, 0.64, 1] as any
        }
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[variant] as any}
    >
      {children}
    </motion.div>
  );
};

export default SectionTransition;
