import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TextMorphProps {
  words: string[];
  className?: string;
  interval?: number;
  staggerChildren?: boolean;
}

const TextMorph = ({ 
  words, 
  className = '', 
  interval = 3000,
  staggerChildren = false 
}: TextMorphProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  const currentWord = words[currentIndex];
  const letters = currentWord.split('');

  return (
    <span className="inline-block">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.5,
            ease: [0.34, 1.56, 0.64, 1]
          }}
          className={`inline-block ${className}`}
        >
          {staggerChildren ? (
            letters.map((letter, i) => (
              <motion.span
                key={`${currentIndex}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.3,
                  delay: i * 0.05,
                  ease: [0.34, 1.56, 0.64, 1]
                }}
                className="inline-block"
                style={{ display: letter === ' ' ? 'inline' : 'inline-block' }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))
          ) : (
            currentWord
          )}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default TextMorph;