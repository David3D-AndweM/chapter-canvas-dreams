import { useEffect, useRef, useState } from "react";
import BentoGrid from "./BentoGrid";
import SectionTransition from "./SectionTransition";
import LiquidDistortImage from "./LiquidDistortImage";
import servicesTechImg from "@/assets/caregiver-children-learning.jpg";

const BentoServicesSection = () => {
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
      id="bento-services"
      ref={sectionRef}
      className="py-32 relative overflow-hidden bg-white"
    >
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <SectionTransition variant="slide">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-block px-6 py-2 bg-primary/10 rounded-full mb-6">
              <span className="text-primary font-semibold text-sm">Service Overview</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Everything You Need in{" "}
              <span className="text-gradient">One Place</span>
            </h2>
            
            <p className="text-xl text-foreground/80 leading-relaxed">
              A complete suite of integrated services designed for comprehensive care
            </p>
          </div>
        </SectionTransition>

        {/* Liquid Distort Image */}
        <div className="mb-16">
          <LiquidDistortImage 
            src={servicesTechImg}
            alt="Digital Services Visualization"
            className="max-w-2xl mx-auto h-96"
          />
        </div>

        {/* Bento Grid */}
        <BentoGrid />

        {/* Bottom CTA */}
        <SectionTransition variant="reveal">
          <div className="text-center mt-20">
            <p className="text-lg text-foreground/80 mb-6">
              Want to learn more about how we can support your young person?
            </p>
            <button className="bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-[var(--shadow-glow)] transform hover:scale-105 transition-all duration-300">
              Contact Our Team
            </button>
          </div>
        </SectionTransition>
      </div>
    </section>
  );
};

export default BentoServicesSection;
