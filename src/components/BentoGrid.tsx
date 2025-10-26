import { motion } from 'framer-motion';
import { Brain, Heart, Shield, Users, Sparkles, GraduationCap } from 'lucide-react';
import { useTilt } from '@/hooks/use-tilt';

const bentoItems = [
  {
    icon: Heart,
    title: 'Therapeutic Care',
    description: 'Trauma-informed approach with our bespoke Well Being for Life programme',
    gridArea: 'span 2 / span 2',
    color: 'primary',
    featured: true
  },
  {
    icon: Brain,
    title: 'Mental Health',
    description: 'Support from psychologists and behaviour specialists',
    gridArea: 'span 1 / span 1',
    color: 'secondary'
  },
  {
    icon: GraduationCap,
    title: 'Education',
    description: 'DfE registered on-site school',
    gridArea: 'span 1 / span 1',
    color: 'accent'
  },
  {
    icon: Shield,
    title: 'Complex Needs',
    description: 'Specialist support for emotional and behavioural difficulties',
    gridArea: 'span 1 / span 2',
    color: 'primary'
  },
  {
    icon: Users,
    title: 'Trauma Recovery',
    description: 'Three-phase recovery for CSE and HSB services',
    gridArea: 'span 1 / span 1',
    color: 'secondary'
  }
];

const BentoCard = ({ item, index }: any) => {
  const tiltRef = useTilt(5);

  const colorClasses = {
    primary: {
      bg: 'bg-primary/5',
      border: 'border-primary/20 hover:border-primary/40',
      iconBg: 'bg-primary/10',
      iconText: 'text-primary',
      textHover: 'group-hover:text-primary',
      glow: 'bg-primary/5',
      pattern1: 'bg-primary',
      pattern2: 'bg-primary'
    },
    secondary: {
      bg: 'bg-secondary/5',
      border: 'border-secondary/20 hover:border-secondary/40',
      iconBg: 'bg-secondary/10',
      iconText: 'text-secondary',
      textHover: 'group-hover:text-secondary',
      glow: 'bg-secondary/5',
      pattern1: 'bg-secondary',
      pattern2: 'bg-secondary'
    },
    accent: {
      bg: 'bg-accent/5',
      border: 'border-accent/20 hover:border-accent/40',
      iconBg: 'bg-accent/10',
      iconText: 'text-accent',
      textHover: 'group-hover:text-accent',
      glow: 'bg-accent/5',
      pattern1: 'bg-accent',
      pattern2: 'bg-accent'
    }
  };

  const colors = colorClasses[item.color as keyof typeof colorClasses];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ 
        opacity: 1, 
        scale: 1,
        transition: {
          duration: 0.5,
          delay: index * 0.1,
          ease: [0.34, 1.56, 0.64, 1]
        }
      }}
      viewport={{ once: true }}
      className={`group md:col-span-${item.gridArea.split('/')[0].trim().split(' ')[1]} lg:col-span-${item.gridArea.split('/')[1].trim().split(' ')[1]}`}
    >
      <div
        ref={tiltRef}
        className={`relative h-full ${
          item.featured ? 'min-h-[300px] md:min-h-[400px]' : 'min-h-[250px] md:min-h-[200px]'
        } bg-gradient-to-br from-white ${colors.bg} rounded-3xl p-6 md:p-8 border ${colors.border} transition-all duration-500 shadow-lg hover:shadow-[var(--shadow-glow)] overflow-hidden`}
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.3s ease-out'
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className={`absolute top-0 right-0 w-32 h-32 ${colors.pattern1} rounded-full blur-3xl`} />
          <div className={`absolute bottom-0 left-0 w-24 h-24 ${colors.pattern2} rounded-full blur-2xl`} />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          <div 
            className={`w-14 h-14 md:w-16 md:h-16 ${colors.iconBg} rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300`}
            style={{ transform: 'translateZ(30px)' }}
          >
            <item.icon className={`w-7 h-7 md:w-8 md:h-8 ${colors.iconText}`} />
          </div>

          <h3 
            className={`${item.featured ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'} font-display font-bold mb-3 md:mb-4 text-foreground ${colors.textHover} transition-colors`}
            style={{ transform: 'translateZ(20px)' }}
          >
            {item.title}
          </h3>

          <p 
            className={`${item.featured ? 'text-base md:text-lg' : 'text-sm md:text-base'} text-foreground/70 leading-relaxed ${item.featured ? 'mb-auto' : ''}`}
            style={{ transform: 'translateZ(10px)' }}
          >
            {item.description}
          </p>

          {item.featured && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 px-6 py-3 bg-primary text-white rounded-2xl font-semibold hover:bg-primary/90 transition-colors text-sm md:text-base"
            >
              Learn More
            </motion.button>
          )}
        </div>

        {/* Hover Glow Effect */}
        <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-transparent group-hover:${colors.glow} transition-all duration-500 rounded-3xl`} />
      </div>
    </motion.div>
  );
};

const BentoGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {bentoItems.map((item, index) => (
        <BentoCard key={index} item={item} index={index} />
      ))}
    </div>
  );
};

export default BentoGrid;
