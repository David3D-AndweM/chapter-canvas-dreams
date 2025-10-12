import { useEffect, useRef, useState } from "react";
import AnimatedSVG from "@/components/AnimatedSVG";
import MorphingBlobImage from "./MorphingBlobImage";
import aboutInnovationImg from "@/assets/about-innovation.jpg";

const AboutSection = () => {
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
    <section id="about" ref={sectionRef} className="py-32 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className={`${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
            <div className="inline-block px-6 py-2 bg-primary/10 rounded-full mb-6">
              <span className="text-primary font-semibold text-sm">About Dream Path</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-8 leading-tight">
              Every Child Deserves the Chance to{" "}
              <span className="text-gradient">Thrive</span>
            </h2>
            
            <div className="space-y-6 text-lg text-foreground/80 leading-relaxed">
              <p>
                At Dream Path, we believe every child deserves the chance to feel safe, 
                valued, and hopeful about their future. Each day within our homes, we see 
                the small but powerful moments of healing and growth that remind us why 
                we do what we do.
              </p>
              
              <p>
                We provide specialist residential care for children and young people with 
                emotional behavioural difficulties across England and Wales who have lived 
                through complex trauma and abuse.
              </p>
              
              <p className="font-semibold text-foreground">
                Many come to us carrying experiences no child should have to face — and 
                our role is to offer not just safety, but a place where trust can be rebuilt, 
                resilience can grow, and new possibilities can take root.
              </p>
            </div>
          </div>

          {/* Image/Visual Side */}
          <div className={`${isVisible ? "animate-slide-in-right" : "opacity-0"} relative`}>
            <div className="relative">
              {/* Morphing Blob Image */}
              <div className="mb-8">
                <MorphingBlobImage 
                  src={aboutInnovationImg}
                  alt="Innovation and Technology at Dream Path"
                  className="w-full h-64 md:h-80"
                />
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary/30 rounded-3xl animate-float" />
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-primary/20 rounded-3xl animate-float-delayed" />
              
              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-12 backdrop-blur-sm border border-white/50 shadow-2xl">
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <span className="text-3xl font-bold text-primary">20+</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-bold mb-2">Years of Experience</h3>
                      <p className="text-foreground/70">
                        Dedicated to providing exceptional therapeutic care
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center">
                      <span className="text-3xl font-bold text-primary">MDT</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-bold mb-2">Multi-Disciplinary Team</h3>
                      <p className="text-foreground/70">
                        Comprehensive support from qualified specialists
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center">
                      <span className="text-3xl font-bold text-primary">24/7</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-bold mb-2">Round-the-Clock Care</h3>
                      <p className="text-foreground/70">
                        Continuous support when young people need it most
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
