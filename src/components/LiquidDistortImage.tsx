import { useRef, useEffect } from 'react';
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

  useEffect(() => {
    if (!canvasRef.current || !imgRef.current || !isInView) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = imgRef.current;

    if (!ctx) return;

    const render = () => {
      if (!img.complete) return;

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;

      // Apply liquid distortion effect
      const time = Date.now() * 0.001;
      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const index = (y * canvas.width + x) * 4;
          
          const wave = Math.sin(x * 0.02 + time) * Math.cos(y * 0.02 + time) * 10;
          const sourceX = Math.floor(x + wave);
          const sourceY = Math.floor(y + wave);
          
          if (sourceX >= 0 && sourceX < canvas.width && sourceY >= 0 && sourceY < canvas.height) {
            const sourceIndex = (sourceY * canvas.width + sourceX) * 4;
            pixels[index] = pixels[sourceIndex];
            pixels[index + 1] = pixels[sourceIndex + 1];
            pixels[index + 2] = pixels[sourceIndex + 2];
            pixels[index + 3] = pixels[sourceIndex + 3];
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
      requestAnimationFrame(render);
    };

    img.onload = () => render();
    if (img.complete) render();

  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden rounded-3xl ${className}`}
      initial={{ opacity: 0, scale: 0.9, rotateZ: -5 }}
      animate={isInView ? { opacity: 1, scale: 1, rotateZ: 0 } : {}}
      transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ scale: 1.05, rotateZ: 2 }}
    >
      <img ref={imgRef} src={src} alt={alt} className="hidden" />
      <canvas ref={canvasRef} className="w-full h-full object-cover" />
      
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 mix-blend-overlay pointer-events-none" />
    </motion.div>
  );
};

export default LiquidDistortImage;
