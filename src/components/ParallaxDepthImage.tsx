import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

interface ParallaxDepthImageProps {
  src: string;
  alt: string;
  depth?: number;
  className?: string;
}

const ParallaxDepthImage = ({ src, alt, depth = 50, className = '' }: ParallaxDepthImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [depth, -depth]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.8]);

  return (
    <div ref={ref} className={`perspective-1000 ${className}`}>
      <motion.div
        className="relative overflow-hidden rounded-3xl"
        style={{
          y,
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
        }}
        initial={{ opacity: 0, z: -100 }}
        animate={isInView ? { opacity: 1, z: 0 } : {}}
        transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          style={{
            transform: 'translateZ(50px)',
          }}
        />
        
        {/* Multiple depth layers */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-secondary/30 mix-blend-overlay"
          style={{
            transform: 'translateZ(40px)',
          }}
        />
        
        <motion.div
          className="absolute inset-0 bg-gradient-to-tl from-accent/20 via-transparent to-primary/20 mix-blend-soft-light"
          style={{
            transform: 'translateZ(30px)',
          }}
        />

        {/* Shadow layer */}
        <div className="absolute inset-0 shadow-2xl" style={{ transform: 'translateZ(20px)' }} />
      </motion.div>
    </div>
  );
};

export default ParallaxDepthImage;
