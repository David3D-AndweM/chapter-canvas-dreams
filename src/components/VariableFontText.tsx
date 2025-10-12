import { motion } from 'framer-motion';
import { CSSProperties } from 'react';

interface VariableFontTextProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'weight' | 'width' | 'slant' | 'all' | 'pulse';
  duration?: number;
  trigger?: 'mount' | 'hover' | 'continuous';
}

const VariableFontText = ({ 
  children, 
  className = '',
  animation = 'weight',
  duration = 2,
  trigger = 'continuous'
}: VariableFontTextProps) => {
  
  const getAnimationValues = () => {
    switch (animation) {
      case 'weight':
        return {
          fontWeight: [300, 700, 300],
          fontVariationSettings: ['"wght" 300', '"wght" 700', '"wght" 300']
        };
      case 'width':
        return {
          fontStretch: ['75%', '125%', '75%']
        };
      case 'slant':
        return {
          fontStyle: ['normal', 'italic', 'normal']
        };
      case 'all':
        return {
          fontWeight: [300, 700, 300],
          fontStretch: ['100%', '110%', '100%']
        };
      case 'pulse':
        return {
          fontWeight: [400, 600, 400],
          fontVariationSettings: ['"wght" 400', '"wght" 600', '"wght" 400']
        };
      default:
        return {
          fontWeight: [300, 700, 300]
        };
    }
  };

  const animationConfig = {
    continuous: {
      animate: getAnimationValues(),
      transition: {
        duration,
        repeat: Infinity,
        ease: "easeInOut" as any
      }
    },
    hover: {
      whileHover: getAnimationValues(),
      transition: {
        duration: duration / 2,
        ease: "easeInOut" as any
      }
    },
    mount: {
      initial: { fontWeight: 300 },
      animate: { fontWeight: 700 },
      transition: {
        duration,
        ease: "easeInOut" as any
      }
    }
  };

  const config = animationConfig[trigger];

  return (
    <motion.span
      {...config}
      className={`inline-block ${className}`}
      style={{
        fontFamily: 'Inter, sans-serif',
        fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"'
      } as CSSProperties}
    >
      {children}
    </motion.span>
  );
};

export default VariableFontText;