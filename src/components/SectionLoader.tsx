import { motion } from 'framer-motion';

interface SectionLoaderProps {
  isVisible?: boolean;
  children: React.ReactNode;
  delay?: number;
}

const SectionLoader = ({ isVisible = true, children, delay = 0 }: SectionLoaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.8,
          delay,
          ease: [0.34, 1.56, 0.64, 1]
        }
      } : {}}
    >
      {children}
    </motion.div>
  );
};

export default SectionLoader;
