import { useEffect, useRef, useState } from "react";
import { Award, Briefcase, Heart, Lightbulb, Target } from "lucide-react";
import { useTilt } from "@/hooks/use-tilt";
import { motion } from "framer-motion";
import ParallaxDepthImage from "./ParallaxDepthImage";
import ScrollTransform3D from "./ScrollTransform3D";
import valuesHarmonyImg from "@/assets/placeholder.png";

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "We hold ourselves to the highest standards in the way we work, the services we deliver, and the outcomes we achieve.",
  },
  {
    icon: Briefcase,
    title: "Reliability",
    description: "With financial stability and proven experience, we provide a dependable and secure environment for every child.",
  },
  {
    icon: Heart,
    title: "Child-Centered",
    description: "Children remain at the heart of our work. We help them discover their strengths and reach their fullest potential.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We lead with expertise and creativity, developing clinically informed therapeutic solutions that make a difference.",
  },
  {
    icon: Target,
    title: "Commitment",
    description: "We never give up. Our teams go the extra mile to provide adaptable, effective support.",
  },
];

const ValueCard = ({ value, index, isVisible }: any) => {
  const tiltRef = useTilt(10);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -20 }}
      animate={isVisible ? {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
          duration: 0.7,
          delay: index * 0.15,
          ease: [0.34, 1.56, 0.64, 1]
        }
      } : {}}
    >
      <div className="group relative h-full">
        {/* Card */}
        <div 
          ref={tiltRef}
          className="relative h-full bg-gradient-to-br from-white to-primary/5 rounded-3xl p-8 border border-primary/10 hover:border-primary/30 transition-all duration-500 shadow-lg hover:shadow-[var(--shadow-glow)]"
          style={{ 
            transformStyle: 'preserve-3d',
            transition: 'transform 0.3s ease-out'
          }}
        >
          {/* Glow Effect on Hover */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/0 to-secondary/0 group-hover:from-primary/5 group-hover:to-secondary/5 transition-all duration-500" />
          
          <div className="relative z-10">
            {/* Icon */}
            <div 
              className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300"
              style={{ transform: 'translateZ(30px)' }}
            >
              <value.icon className="w-8 h-8 text-primary" />
            </div>

            {/* Title */}
            <h3 
              className="text-2xl font-display font-bold mb-4 text-foreground group-hover:text-primary transition-colors"
              style={{ transform: 'translateZ(20px)' }}
            >
              {value.title}
            </h3>

            {/* Description */}
            <p 
              className="text-foreground/70 leading-relaxed"
              style={{ transform: 'translateZ(10px)' }}
            >
              {value.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ValuesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="values" ref={sectionRef} className="py-32 bg-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-1/2 h-full opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary to-primary" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-block px-6 py-2 bg-primary/10 rounded-full mb-6">
            <span className="text-primary font-semibold text-sm">Our Values</span>
          </div>
          
          <h2 className={`text-5xl md:text-6xl font-display font-bold mb-6 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            The Foundation of{" "}
            <span className="text-gradient">Everything We Do</span>
          </h2>
          
          <p className={`text-xl text-foreground/80 leading-relaxed ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
             style={{ animationDelay: "0.2s" }}>
            Our values shape every interaction, every decision, and every home, 
            weaving hope and brighter futures into the lives of young people
          </p>
        </div>

        {/* Parallax Depth Image */}
        <div className="mb-16">
          <ParallaxDepthImage 
            src={valuesHarmonyImg}
            alt="Core Values Harmony"
            depth={60}
            className="max-w-3xl mx-auto h-96"
          />
        </div>

        {/* Values Grid with 3D Scroll Transforms */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => {
            const row = Math.floor(index / 3);
            const col = index % 3;
            
            return (
              <ScrollTransform3D
                key={index}
                rotateX={[-20, 0]}
                rotateY={[col === 0 ? -10 : col === 2 ? 10 : 0, 0]}
                scale={[0.85, 1]}
                y={[50, 0]}
                opacity={[0, 1]}
                scrollRange={[0, 0.6]}
                springConfig={{ stiffness: 100, damping: 25 }}
              >
                <ValueCard value={value} index={index} isVisible={isVisible} />
              </ScrollTransform3D>
            );
          })}
        </div>

        {/* Bottom Quote */}
        <div className={`mt-20 text-center max-w-4xl mx-auto ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
             style={{ animationDelay: "0.6s" }}>
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-12 border border-primary/10">
            <p className="text-2xl md:text-3xl font-display font-semibold text-foreground leading-relaxed">
              "At the heart of Dream Path are our values — they are the threads that 
              weave hope, belonging, and brighter futures into the lives of the children 
              and young people we care for."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
