import { useEffect, useRef, useState } from "react";
import InteractiveTimeline from "./InteractiveTimeline";
import SectionTransition from "./SectionTransition";
import { GraduationCap, Award, Briefcase } from "lucide-react";
import LiquidDistortImage from "./LiquidDistortImage";
import approachStrategyImg from "@/assets/approach-strategy.jpg";

const LeadershipSection = () => {
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
    <section
      id="leadership"
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-6 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-6">
            <span className="text-primary font-semibold text-sm">Leadership</span>
          </div>
          
          <h2 className={`text-5xl md:text-6xl font-display font-bold mb-6 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            Led by <span className="text-gradient">Experience</span>
          </h2>
        </div>

        {/* Leadership Card */}
        <div className={`max-w-5xl mx-auto ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
             style={{ animationDelay: "0.2s" }}>
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-5 gap-0">
              {/* Image Side */}
              <div className="md:col-span-2 bg-gradient-to-br from-primary/10 to-secondary/10 p-12 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-48 h-48 bg-white rounded-full shadow-xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-6xl font-display font-bold text-primary">JW</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-2">J. Wole</h3>
                  <p className="text-primary font-semibold">Founder & Director</p>
                </div>
              </div>

              {/* Content Side */}
              <div className="md:col-span-3 p-12">
                <h3 className="text-3xl font-display font-bold mb-6 text-foreground">
                  Two Decades of Dedicated Service
                </h3>
                
                <div className="space-y-6 text-foreground/80 leading-relaxed mb-8">
                  <p>
                    With over two decades of experience in health and social care, J. Wole is a 
                    highly accomplished care manager with a proven track record in managing teams 
                    across diverse care settings.
                  </p>
                  
                  <p>
                    Beginning at 18 as a residential support worker, J. Wole progressed to team 
                    leader and manager before holding senior leadership roles including Regional 
                    Manager and Operations Director.
                  </p>
                </div>

                {/* Qualifications */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">BSc in Health and Social Care</h4>
                      <p className="text-sm text-foreground/70">University of South Wales</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Level 5 Diploma</h4>
                      <p className="text-sm text-foreground/70">Leadership and Management for Residential Child Care</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Level 3 Diploma</h4>
                      <p className="text-sm text-foreground/70">Health Care Professions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Interactive Timeline */}
        <SectionTransition variant="reveal">
          <div className="mt-20">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-display font-bold mb-4">
                The Journey to <span className="text-gradient">Dream Path</span>
              </h3>
              <p className="text-xl text-foreground/80">
                Over 20 years of dedication to children's care
              </p>
            </div>
            
            {/* Strategic Approach Image */}
            <div className="mb-12">
              <LiquidDistortImage 
                src={approachStrategyImg}
                alt="Strategic Approach Visualization"
                className="max-w-4xl mx-auto h-80"
              />
            </div>
            
            <InteractiveTimeline />
          </div>
        </SectionTransition>
      </div>
    </section>
  );
};

export default LeadershipSection;
