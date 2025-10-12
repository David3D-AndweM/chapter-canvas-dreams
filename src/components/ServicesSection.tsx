import { useEffect, useRef, useState } from "react";
import { Brain, Heart, Shield, Users, Sparkles, GraduationCap } from "lucide-react";
import { useTilt } from "@/hooks/use-tilt";
import { motion } from "framer-motion";

const services = [
  {
    icon: Heart,
    title: "Therapeutic Care",
    description: "Trauma-informed therapeutic care approach with access to our bespoke 'Well Being for Life' clinical programme.",
    color: "primary",
    delay: "0s",
  },
  {
    icon: Brain,
    title: "Mental Health Support",
    description: "Comprehensive mental health support from qualified psychologists and behaviour support professionals.",
    color: "secondary",
    delay: "0.1s",
  },
  {
    icon: GraduationCap,
    title: "Educational Services",
    description: "DfE registered on-site school with tailored education packages for every young person.",
    color: "accent",
    delay: "0.2s",
  },
  {
    icon: Shield,
    title: "Complex Needs Service",
    description: "Specialist support for young people with emotional and behavioural difficulties, offering stability and structure.",
    color: "primary",
    delay: "0.3s",
  },
  {
    icon: Users,
    title: "Sexual Trauma Recovery",
    description: "Safe, structured environments with our three-phase recovery programme for CSE and HSB services.",
    color: "secondary",
    delay: "0.4s",
  },
  {
    icon: Sparkles,
    title: "Forensic Services",
    description: "Alternative to secure placements with intensive therapeutic interventions and high staff ratios.",
    color: "accent",
    delay: "0.5s",
  },
];

const ServiceCard = ({ service, index, isVisible, spiralDelay }: any) => {
  const tiltRef = useTilt(8);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateZ: -10 }}
      animate={isVisible ? { 
        opacity: 1, 
        scale: 1, 
        rotateZ: 0,
        transition: {
          duration: 0.6,
          delay: spiralDelay,
          ease: [0.34, 1.56, 0.64, 1]
        }
      } : {}}
      className="group"
    >
      <div 
        ref={tiltRef}
        className="h-full bg-white rounded-3xl p-8 shadow-lg hover:shadow-[var(--shadow-glow)] transition-all duration-500 border border-transparent hover:border-primary/30"
        style={{ 
          transformStyle: 'preserve-3d',
          transition: 'transform 0.3s ease-out'
        }}
      >
        {/* Icon with 3D effect */}
        <div 
          className={`w-16 h-16 bg-${service.color}/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
          style={{ transform: 'translateZ(30px)' }}
        >
          <service.icon className={`w-8 h-8 text-${service.color}`} />
        </div>

        {/* Content */}
        <h3 
          className="text-2xl font-display font-bold mb-4 group-hover:text-primary transition-colors"
          style={{ transform: 'translateZ(20px)' }}
        >
          {service.title}
        </h3>
        
        <p 
          className="text-foreground/70 leading-relaxed"
          style={{ transform: 'translateZ(10px)' }}
        >
          {service.description}
        </p>

        {/* Hover Effect Bar */}
        <div className="mt-6 h-1 w-0 bg-gradient-to-r from-primary to-secondary rounded-full group-hover:w-full transition-all duration-500" />
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-block px-6 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-6">
            <span className="text-primary font-semibold text-sm">Our Services</span>
          </div>
          
          <h2 className={`text-5xl md:text-6xl font-display font-bold mb-6 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            Comprehensive Support for{" "}
            <span className="text-gradient">Every Need</span>
          </h2>
          
          <p className={`text-xl text-foreground/80 leading-relaxed ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
             style={{ animationDelay: "0.2s" }}>
            A complete multi-disciplinary service where therapeutic, clinical, and 
            educational specialists work together
          </p>
        </div>

        {/* Services Grid with Spiral Animation */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            // Calculate spiral pattern delay
            const spiralDelay = 0.1 + (index * 0.15);
            
            return (
              <ServiceCard
                key={index}
                service={service}
                index={index}
                isVisible={isVisible}
                spiralDelay={spiralDelay}
              />
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-20 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
             style={{ animationDelay: "0.6s" }}>
          <p className="text-lg text-foreground/80 mb-6">
            Want to learn more about how we can support your young person?
          </p>
          <button className="bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            Contact Our Team
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
