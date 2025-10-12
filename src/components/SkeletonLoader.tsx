import { motion } from 'framer-motion';

interface SkeletonProps {
  variant?: 'card' | 'text' | 'circle' | 'button';
  width?: string;
  height?: string;
  className?: string;
}

const Skeleton = ({ 
  variant = 'text', 
  width = '100%', 
  height = '20px',
  className = '' 
}: SkeletonProps) => {
  const baseClasses = 'bg-gradient-to-r from-muted via-muted/50 to-muted rounded-lg';
  
  const variants = {
    card: 'h-64 w-full rounded-3xl',
    text: 'h-4 w-full rounded-lg',
    circle: 'rounded-full aspect-square',
    button: 'h-12 w-32 rounded-2xl'
  };

  return (
    <motion.div
      className={`${baseClasses} ${variants[variant]} ${className}`}
      style={{ 
        width, 
        height,
        backgroundSize: '200% 100%',
      }}
      animate={{
        backgroundPosition: ['0% 0%', '100% 0%'],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'linear'
      }}
    />
  );
};

export const CardSkeleton = () => (
  <div className="space-y-4 p-6 bg-white rounded-3xl shadow-lg">
    <Skeleton variant="circle" width="60px" height="60px" />
    <Skeleton variant="text" width="70%" />
    <Skeleton variant="text" width="100%" />
    <Skeleton variant="text" width="90%" />
    <Skeleton variant="button" />
  </div>
);

export const GridSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    {Array.from({ length: count }).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);

export default Skeleton;
