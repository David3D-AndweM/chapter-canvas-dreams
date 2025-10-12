import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import ScrollTransform3D from './ScrollTransform3D';

interface Card3DProps {
  children: ReactNode;
  index: number;
  total: number;
}

const Card3D = ({ children, index, total }: Card3DProps) => {
  const delay = index * 0.15;
  const angle = (360 / total) * index;
  
  return (
    <ScrollTransform3D
      rotateY={[angle - 20, angle + 20]}
      scale={[0.8, 1]}
      opacity={[0.3, 1]}
      scrollRange={[0, 1]}
      springConfig={{ stiffness: 100, damping: 25 }}
      className="absolute top-1/2 left-1/2"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
        whileInView={{ 
          opacity: 1, 
          scale: 1, 
          rotateY: 0,
          transition: {
            duration: 0.8,
            delay,
            ease: [0.34, 1.56, 0.64, 1]
          }
        }}
        viewport={{ once: true, margin: "-100px" }}
        whileHover={{ 
          scale: 1.05,
          z: 50,
          transition: { duration: 0.3 }
        }}
        className="w-80 h-96 -translate-x-1/2 -translate-y-1/2"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </motion.div>
    </ScrollTransform3D>
  );
};

interface Rotating3DCardShowcaseProps {
  cards: ReactNode[];
  className?: string;
}

const Rotating3DCardShowcase = ({ cards, className = '' }: Rotating3DCardShowcaseProps) => {
  return (
    <div className={`relative w-full h-[600px] perspective-[2000px] ${className}`}>
      <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
        {cards.map((card, index) => (
          <Card3D key={index} index={index} total={cards.length}>
            {card}
          </Card3D>
        ))}
      </div>
    </div>
  );
};

export default Rotating3DCardShowcase;