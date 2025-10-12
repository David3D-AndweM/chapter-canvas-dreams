import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface MagneticRevealImageProps {
  src: string;
  alt: string;
  className?: string;
}

const MagneticRevealImage = ({ src, alt, className = '' }: MagneticRevealImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const maskX = useSpring(mouseX, { stiffness: 500, damping: 30 });
  const maskY = useSpring(mouseY, { stiffness: 500, damping: 30 });

  // Create transforms unconditionally (Rules of Hooks)
  const clipPathTransform = useTransform(
    [maskX, maskY],
    ([x, y]) => `circle(150px at ${x}px ${y}px)`
  );

  const backgroundTransform = useTransform(
    [maskX, maskY],
    ([x, y]) => `radial-gradient(circle 200px at ${x}px ${y}px, hsla(var(--primary) / 0.3), transparent)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden rounded-3xl ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4 }}
    >
      {/* Base grayscale image */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover filter grayscale"
      />
      
      {/* Color reveal layer */}
      <motion.div
        className="absolute inset-0"
        style={{
          clipPath: isHovered ? clipPathTransform : 'circle(0px at 50% 50%)',
        }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: backgroundTransform,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default MagneticRevealImage;
