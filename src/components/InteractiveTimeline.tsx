import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Award, TrendingUp, Heart, Star } from 'lucide-react';

const timelineData = [
  {
    year: '2003',
    title: 'Journey Begins',
    description: 'Started career at 18 as a residential support worker in a children\'s home',
    icon: Calendar,
    color: 'primary'
  },
  {
    year: '2008',
    title: 'First Leadership Role',
    description: 'Progressed to Team Leader, managing frontline care teams',
    icon: TrendingUp,
    color: 'secondary'
  },
  {
    year: '2012',
    title: 'Home Manager',
    description: 'Became Manager of the home, implementing trauma-informed practices',
    icon: Award,
    color: 'accent'
  },
  {
    year: '2016',
    title: 'Senior Leadership',
    description: 'Promoted to Regional Manager, overseeing multiple care settings',
    icon: Star,
    color: 'primary'
  },
  {
    year: '2020',
    title: 'Operations Director',
    description: 'Led operations strategy, shaping care delivery across the organization',
    icon: Heart,
    color: 'secondary'
  },
  {
    year: '2023',
    title: 'Dream Path Founded',
    description: 'Established Dream Path with over 20 years of experience in health and social care',
    icon: Heart,
    color: 'primary'
  }
];

const InteractiveTimeline = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <div className="max-w-6xl mx-auto py-16">
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent transform -translate-x-1/2" />

        {/* Timeline Items */}
        <div className="space-y-12">
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex items-center ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } flex-col`}
            >
              {/* Content Card */}
              <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  className={`cursor-pointer bg-white rounded-3xl p-6 shadow-lg border-2 transition-all duration-300 ${
                    activeIndex === index 
                      ? 'border-primary shadow-[var(--shadow-glow)]' 
                      : 'border-transparent hover:border-primary/30'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 bg-${item.color}/10 rounded-2xl flex items-center justify-center`}>
                      <item.icon className={`w-6 h-6 text-${item.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-primary mb-1">{item.year}</div>
                      <h3 className="text-xl font-display font-bold mb-2">{item.title}</h3>
                      
                      <AnimatePresence>
                        {activeIndex === index && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-foreground/70 leading-relaxed"
                          >
                            {item.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Timeline Dot */}
              <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-6 h-6 z-10">
                <motion.div
                  whileHover={{ scale: 1.5 }}
                  className={`w-full h-full rounded-full border-4 border-white shadow-lg ${
                    activeIndex === index ? 'bg-primary' : 'bg-secondary'
                  }`}
                />
              </div>

              {/* Empty space for alternating layout */}
              <div className="hidden md:block w-5/12" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveTimeline;
