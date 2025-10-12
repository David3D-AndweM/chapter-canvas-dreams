import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface LiquidDistortImageProps {
  src: string;
  alt: string;
  className?: string;
}

const LiquidDistortImage = ({ src, alt, className = '' }: LiquidDistortImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const animationRef = useRef<number>();
  const [isHovered, setIsHovered] = useState(false);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if (!canvasRef.current || !imgRef.current || !isInView) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    const img = imgRef.current;

    if (!ctx) return;

    // Downsample for performance (0.5 = half resolution)
    const scaleFactor = 0.5;
    let lastTime = 0;
    const fps = 30;
    const frameDelay = 1000 / fps;

    const render = (currentTime: number) => {
      if (!img.complete) return;

      // Throttle to 30fps
      const deltaTime = currentTime - lastTime;
      if (deltaTime < frameDelay) {
        animationRef.current = requestAnimationFrame(render);
        return;
      }
      lastTime = currentTime;

      // Stop after 6 seconds if not hovered
      if (!isHovered && currentTime - startTimeRef.current > 6000) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = undefined;
        }
        return;
      }

      const width = Math.floor(img.naturalWidth * scaleFactor);
      const height = Math.floor(img.naturalHeight * scaleFactor);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      ctx.clearRect(0, 0, width, height);
      
      // Draw scaled-down image
      ctx.drawImage(img, 0, 0, width, height);

      const imageData = ctx.getImageData(0, 0, width, height);
      const pixels = imageData.data;
      const outputData = ctx.createImageData(width, height);
      const output = outputData.data;

      // Lightweight wave distortion
      const time = currentTime * 0.001;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const index = (y * width + x) * 4;
          
          const wave = Math.sin(x * 0.05 + time) * Math.cos(y * 0.05 + time) * 3;
          const sourceX = Math.floor(x + wave);
          const sourceY = Math.floor(y + wave);
          
          if (sourceX >= 0 && sourceX < width && sourceY >= 0 && sourceY < height) {
            const sourceIndex = (sourceY * width + sourceX) * 4;
            output[index] = pixels[sourceIndex];
            output[index + 1] = pixels[sourceIndex + 1];
            output[index + 2] = pixels[sourceIndex + 2];
            output[index + 3] = 255;
          }
        }
      }

      ctx.putImageData(outputData, 0, 0);
      animationRef.current = requestAnimationFrame(render);
    };

    const startAnimation = () => {
      if (!animationRef.current && img.complete) {
        startTimeRef.current = performance.now();
        animationRef.current = requestAnimationFrame(render);
      }
    };

    img.onload = startAnimation;
    if (img.complete) startAnimation();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isInView, isHovered]);

  // Fallback for reduced motion
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  if (prefersReducedMotion) {
    return (
      <motion.div
        ref={ref}
        className={`relative overflow-hidden rounded-3xl ${className}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden rounded-3xl ${className}`}
      initial={{ opacity: 0, scale: 0.9, rotateZ: -5 }}
      animate={isInView ? { opacity: 1, scale: 1, rotateZ: 0 } : {}}
      transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ scale: 1.05, rotateZ: 2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img ref={imgRef} src={src} alt={alt} className="hidden" />
      <canvas ref={canvasRef} className="w-full h-full object-cover" />
      
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 mix-blend-overlay pointer-events-none" />
    </motion.div>
  );
};

export default LiquidDistortImage;
