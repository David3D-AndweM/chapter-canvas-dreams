import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

const OptimizedImage = ({ src, alt, className = '', width, height, priority = false }: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    const img = new Image();
    
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setLoadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + Math.random() * 30;
      });
    }, 100);

    img.src = src;
    img.onload = () => {
      setLoadProgress(100);
      setTimeout(() => {
        setImageSrc(src);
        setIsLoaded(true);
        clearInterval(progressInterval);
      }, 200);
    };

    img.onerror = () => {
      clearInterval(progressInterval);
      setLoadProgress(0);
    };

    return () => clearInterval(progressInterval);
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {/* Loading placeholder with shimmer effect */}
      {!isLoaded && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-muted via-muted/80 to-muted/50" />
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
            style={{
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s infinite',
            }}
          />
          {/* Loading bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted/30">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${loadProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}
      
      {/* Actual image with blur-up effect */}
      <motion.img
        src={imageSrc}
        alt={alt}
        className="w-full h-full object-cover"
        loading={priority ? 'eager' : 'lazy'}
        initial={{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }}
        animate={isLoaded ? { 
          opacity: 1, 
          filter: 'blur(0px)',
          scale: 1,
          transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }
        } : {}}
      />
    </div>
  );
};

export default OptimizedImage;
