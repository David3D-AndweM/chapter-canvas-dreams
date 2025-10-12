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
  },
  {
    icon: Sparkles,
    title: 'Forensic Services',
    description: 'Alternative to secure placements with intensive support',
    gridArea: 'span 2 / span 1',
    color: 'accent'
  }
];

const BentoCard = ({ item, index }: any) => {
  const tiltRef = useTilt(5);

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
      style={{ gridArea: item.gridArea }}
      className="group"
    >
      <div
        ref={tiltRef}
        className={`relative h-full ${
          item.featured ? 'min-h-[400px]' : 'min-h-[200px]'
        } bg-gradient-to-br from-white to-${item.color}/5 rounded-3xl p-8 border border-${item.color}/20 hover:border-${item.color}/40 transition-all duration-500 shadow-lg hover:shadow-[var(--shadow-glow)] overflow-hidden`}
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.3s ease-out'
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className={`absolute top-0 right-0 w-32 h-32 bg-${item.color} rounded-full blur-3xl`} />
          <div className={`absolute bottom-0 left-0 w-24 h-24 bg-${item.color} rounded-full blur-2xl`} />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          <div 
            className={`w-16 h-16 bg-${item.color}/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
            style={{ transform: 'translateZ(30px)' }}
          >
            <item.icon className={`w-8 h-8 text-${item.color}`} />
          </div>

          <h3 
            className={`${item.featured ? 'text-3xl' : 'text-2xl'} font-display font-bold mb-4 text-foreground group-hover:text-${item.color} transition-colors`}
            style={{ transform: 'translateZ(20px)' }}
          >
            {item.title}
          </h3>

          <p 
            className={`${item.featured ? 'text-lg' : 'text-base'} text-foreground/70 leading-relaxed ${item.featured ? 'mb-auto' : ''}`}
            style={{ transform: 'translateZ(10px)' }}
          >
            {item.description}
          </p>

          {item.featured && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 px-6 py-3 bg-primary text-white rounded-2xl font-semibold hover:bg-primary/90 transition-colors"
            >
              Learn More
            </motion.button>
          )}
        </div>

        {/* Hover Glow Effect */}
        <div className={`absolute inset-0 bg-gradient-to-br from-${item.color}/0 to-${item.color}/0 group-hover:from-${item.color}/5 group-hover:to-${item.color}/10 transition-all duration-500 rounded-3xl`} />
      </div>
    </motion.div>
  );
};

const BentoGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[200px]">
      {bentoItems.map((item, index) => (
        <BentoCard key={index} item={item} index={index} />
      ))}
    </div>
  );
};

export default BentoGrid;
