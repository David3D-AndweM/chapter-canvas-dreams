import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Card {
  icon: any;
  title: string;
  description: string;
  color?: string;
}

interface RotatingCardGalleryProps {
  cards: Card[];
  autoRotate?: boolean;
  rotationInterval?: number;
}

const RotatingCardGallery = ({ 
  cards, 
  autoRotate = true, 
  rotationInterval = 4000 
}: RotatingCardGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (!autoRotate) return;
    
    const timer = setInterval(() => {
      handleNext();
    }, rotationInterval);

    return () => clearInterval(timer);
  }, [currentIndex, autoRotate, rotationInterval]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const getVisibleCards = () => {
    const visible = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + cards.length) % cards.length;
      visible.push({ ...cards[index], position: i, index });
    }
    return visible;
  };

  const visibleCards = getVisibleCards();

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center perspective-[2000px]">
      {/* 3D Card Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          {visibleCards.map((card, i) => {
            const { position, index } = card;
            const isCenter = position === 0;
            
            return (
              <motion.div
                key={index}
                custom={position}
                initial={{
                  rotateY: position * 45,
                  x: position * 400,
                  z: position === 0 ? 0 : -300,
                  opacity: 0
                }}
                animate={{
                  rotateY: position * 45,
                  x: position * 400,
                  z: position === 0 ? 100 : -300,
                  opacity: position === 0 ? 1 : 0.4,
                  scale: position === 0 ? 1.1 : 0.8,
                  filter: position === 0 ? 'blur(0px)' : 'blur(2px)'
                }}
                exit={{
                  rotateY: -position * 45,
                  x: -position * 400,
                  z: -300,
                  opacity: 0
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.34, 1.56, 0.64, 1]
                }}
                className="absolute w-[400px] h-[500px] cursor-pointer"
                style={{
                  transformStyle: 'preserve-3d',
                  pointerEvents: isCenter ? 'auto' : 'none'
                }}
                onClick={isCenter ? undefined : position > 0 ? handleNext : handlePrev}
              >
                {/* Card Front */}
                <div className="absolute inset-0 bg-gradient-to-br from-white to-background rounded-3xl shadow-2xl border border-primary/20 overflow-hidden group hover:border-primary/40 transition-all duration-500"
                     style={{ 
                       backfaceVisibility: 'hidden',
                       transform: 'translateZ(50px)'
                     }}>
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Content */}
                  <div className="relative h-full p-10 flex flex-col justify-center items-center text-center">
                    {/* Icon */}
                    <div className={`w-24 h-24 bg-${card.color || 'primary'}/10 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}
                         style={{ transform: 'translateZ(40px)' }}>
                      <card.icon className={`w-12 h-12 text-${card.color || 'primary'}`} />
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl font-display font-bold mb-6 text-foreground"
                        style={{ transform: 'translateZ(30px)' }}>
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="text-lg text-foreground/70 leading-relaxed max-w-sm"
                       style={{ transform: 'translateZ(20px)' }}>
                      {card.description}
                    </p>

                    {/* Decorative line */}
                    <div className="mt-8 h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full"
                         style={{ transform: 'translateZ(10px)' }} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-50 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 flex items-center justify-center group"
        aria-label="Previous card"
      >
        <ChevronLeft className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
      </button>
      
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-50 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 flex items-center justify-center group"
        aria-label="Next card"
      >
        <ChevronRight className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
      </button>

      {/* Progress Indicators */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-3 z-50">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-primary w-8' 
                : 'bg-primary/30 hover:bg-primary/50'
            }`}
            aria-label={`Go to card ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default RotatingCardGallery;