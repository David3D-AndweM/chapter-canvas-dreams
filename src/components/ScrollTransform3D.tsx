import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ScrollTransform3DProps {
  children: ReactNode;
  className?: string;
  rotateX?: [number, number];
  rotateY?: [number, number];
  rotateZ?: [number, number];
  scale?: [number, number];
  x?: [number, number];
  y?: [number, number];
  z?: [number, number];
  opacity?: [number, number];
  springConfig?: {
    stiffness?: number;
    damping?: number;
  };
  scrollRange?: [number, number];
}

const ScrollTransform3D = ({
  children,
  className = '',
  rotateX,
  rotateY,
  rotateZ,
  scale,
  x,
  y,
  z,
  opacity,
  springConfig = { stiffness: 100, damping: 30 },
  scrollRange = [0, 1]
}: ScrollTransform3DProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Apply spring physics for smoother animations
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  // Create transforms based on props
  const transforms: any = {};

  if (rotateX) {
    transforms.rotateX = useTransform(smoothProgress, scrollRange, rotateX);
  }
  if (rotateY) {
    transforms.rotateY = useTransform(smoothProgress, scrollRange, rotateY);
  }
  if (rotateZ) {
    transforms.rotateZ = useTransform(smoothProgress, scrollRange, rotateZ);
  }
  if (scale) {
    transforms.scale = useTransform(smoothProgress, scrollRange, scale);
  }
  if (x) {
    transforms.x = useTransform(smoothProgress, scrollRange, x);
  }
  if (y) {
    transforms.y = useTransform(smoothProgress, scrollRange, y);
  }
  if (z) {
    transforms.z = useTransform(smoothProgress, scrollRange, z);
  }
  if (opacity) {
    transforms.opacity = useTransform(smoothProgress, scrollRange, opacity);
  }

  return (
    <motion.div
      ref={ref}
      style={{
        ...transforms,
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollTransform3D;