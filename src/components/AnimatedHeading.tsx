import { motion } from 'framer-motion';

interface AnimatedHeadingProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'split' | 'reveal' | 'wave';
  delay?: number;
}

const AnimatedHeading = ({ 
  children, 
  className = '',
  variant = 'split',
  delay = 0
}: AnimatedHeadingProps) => {
  
  const text = typeof children === 'string' ? children : '';
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay
      }
    }
  };

  const wordVariants = {
    split: {
      hidden: { opacity: 0, y: 50, rotateX: -90 },
      visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
          duration: 0.8,
          ease: [0.34, 1.56, 0.64, 1] as any
        }
      }
    },
    reveal: {
      hidden: { opacity: 0, x: -20 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.5,
          ease: "easeOut" as any
        }
      }
    },
    wave: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: [0.34, 1.56, 0.64, 1] as any
        }
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.34, 1.56, 0.64, 1] as any
      }
    }
  };

  if (variant === 'wave') {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={className}
      >
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block mr-3">
            {word.split('').map((letter, letterIndex) => (
              <motion.span
                key={`${wordIndex}-${letterIndex}`}
                variants={letterVariants}
                className="inline-block"
                style={{ display: letter === ' ' ? 'inline' : 'inline-block' }}
              >
                {letter}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
      style={{ perspective: '1000px' }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants[variant]}
          className="inline-block mr-3"
          style={{ 
            transformStyle: 'preserve-3d',
            display: 'inline-block'
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedHeading;