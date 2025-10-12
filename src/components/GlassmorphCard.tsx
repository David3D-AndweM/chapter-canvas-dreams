import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassmorphCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'premium' | 'frosted' | 'gradient';
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
}

const GlassmorphCard = ({ 
  children, 
  className = '',
  variant = 'default',
  blur = 'md',
  animated = true
}: GlassmorphCardProps) => {
  
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl'
  };

  const variantClasses = {
    default: 'bg-white/70 border border-white/20 shadow-lg',
    premium: 'bg-gradient-to-br from-white/80 to-white/40 border border-white/30 shadow-xl',
    frosted: 'bg-white/60 border border-white/40 shadow-2xl',
    gradient: 'bg-gradient-to-br from-white/70 via-primary/5 to-white/70 border border-primary/20 shadow-xl'
  };

  const Component = animated ? motion.div : 'div';

  const animationProps = animated ? {
    whileHover: { 
      scale: 1.02,
      boxShadow: '0 20px 60px -15px rgba(0, 0, 0, 0.3)',
      transition: { duration: 0.3 }
    },
    whileTap: { scale: 0.98 }
  } : {};

  return (
    <Component
      className={`
        ${blurClasses[blur]}
        ${variantClasses[variant]}
        rounded-3xl
        relative overflow-hidden
        group
        ${className}
      `}
      {...animationProps}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
      </div>
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Glow border effect */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
           style={{
             background: 'linear-gradient(135deg, transparent, hsl(var(--primary) / 0.1), transparent)',
             padding: '1px',
             mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
             maskComposite: 'exclude'
           }}
      />
    </Component>
  );
};

export default GlassmorphCard;