import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface MorphingBlobImageProps {
  src: string;
  alt: string;
  className?: string;
}

const MorphingBlobImage = ({ src, alt, className = '' }: MorphingBlobImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
        <defs>
          <clipPath id={`blob-${src}`}>
            <path className="animate-morph-blob">
              <animate
                attributeName="d"
                dur="10s"
                repeatCount="indefinite"
                values="
                  M 200,50 C 280,50 350,120 350,200 C 350,280 280,350 200,350 C 120,350 50,280 50,200 C 50,120 120,50 200,50 Z;
                  M 200,80 C 260,80 320,140 320,200 C 320,260 260,320 200,320 C 140,320 80,260 80,200 C 80,140 140,80 200,80 Z;
                  M 180,60 C 270,70 340,130 340,210 C 340,290 270,340 180,340 C 90,340 60,270 60,190 C 60,110 90,60 180,60 Z;
                  M 200,50 C 280,50 350,120 350,200 C 350,280 280,350 200,350 C 120,350 50,280 50,200 C 50,120 120,50 200,50 Z;
                "
              />
            </path>
          </clipPath>
        </defs>
      </svg>
      
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ clipPath: `url(#blob-${src})` }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.6 }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 mix-blend-overlay pointer-events-none" />
    </motion.div>
  );
};

export default MorphingBlobImage;
