import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

const OptimizedImage = ({ src, alt, className = '', width, height }: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {/* Blur placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 animate-pulse" />
      )}
      
      {/* Actual image with blur-up effect */}
      <motion.img
        src={imageSrc}
        alt={alt}
        className="w-full h-full object-cover"
        initial={{ opacity: 0, filter: 'blur(20px)' }}
        animate={isLoaded ? { 
          opacity: 1, 
          filter: 'blur(0px)',
          transition: { duration: 0.6 }
        } : {}}
      />
    </div>
  );
};

export default OptimizedImage;
