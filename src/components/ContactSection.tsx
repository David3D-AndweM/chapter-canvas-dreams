import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useMagnetic } from "@/hooks/use-magnetic";
import HapticButton from "./HapticButton";
import MagneticRevealImage from "./MagneticRevealImage";
import contactConnectImg from "@/assets/placeholder.png";

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const magneticRef1 = useMagnetic(0.2);
  const magneticRef2 = useMagnetic(0.2);

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
    <section id="contact" ref={sectionRef} className="py-32 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
        <div className="absolute inset-0 bg-gradient-to-bl from-primary to-secondary" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-6 py-2 bg-primary/10 rounded-full mb-6">
              <span className="text-primary font-semibold text-sm">Get in Touch</span>
            </div>
            
            <h2 className={`text-5xl md:text-6xl font-display font-bold mb-6 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
              Start a <span className="text-gradient">Conversation</span>
            </h2>
            
            <p className={`text-xl text-foreground/80 leading-relaxed max-w-2xl mx-auto ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
               style={{ animationDelay: "0.2s" }}>
              Ready to learn more about how Dream Path can support your young person? 
              Our dedicated team is here to help.
            </p>
          </div>

          {/* Magnetic Reveal Image */}
          <div className="mb-16">
            <MagneticRevealImage 
              src={contactConnectImg}
              alt="Connect with Dream Path"
              className="max-w-4xl mx-auto h-96"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className={`${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-10 border border-primary/10 h-full">
                <h3 className="text-3xl font-display font-bold mb-8 text-foreground">
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Phone</h4>
                      <p className="text-foreground/70">+44 (0) 123 456 7890</p>
                      <p className="text-sm text-foreground/50">Monday - Friday, 9am - 6pm</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center group-hover:bg-secondary/20 transition-all duration-300">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Email</h4>
                      <p className="text-foreground/70">info@dreampath.care</p>
                      <p className="text-sm text-foreground/50">We'll respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center group-hover:bg-accent/20 transition-all duration-300">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Locations</h4>
                      <p className="text-foreground/70">England & Wales</p>
                      <p className="text-sm text-foreground/50">Multiple locations to serve you</p>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mt-10 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white">
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    Our referral team works closely with local authorities and healthcare 
                    professionals to provide a smooth, transparent process—ensuring every 
                    child is connected with the right care at the right time.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className={`${isVisible ? "animate-slide-in-right" : "opacity-0"}`}>
              <div className="bg-gradient-to-br from-primary to-primary/90 rounded-3xl p-10 text-white h-full flex flex-col justify-between shadow-2xl">
                <div>
                  <h3 className="text-3xl font-display font-bold mb-6">
                    Ready to Make a Difference?
                  </h3>
                  
                  <p className="text-white/90 text-lg leading-relaxed mb-8">
                    Whether you're a local authority looking for specialist placements, 
                    or a professional seeking support for a young person, we're here to help.
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full" />
                      <span className="text-white/90">Specialist therapeutic care</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full" />
                      <span className="text-white/90">Multi-disciplinary team support</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full" />
                      <span className="text-white/90">Proven track record of success</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full" />
                      <span className="text-white/90">Flexible, person-centered approach</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <HapticButton
                    ref={magneticRef1 as any}
                    size="lg"
                    hapticStrength="medium"
                    className="w-full bg-white text-primary hover:bg-white/90 font-semibold py-6 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                    onClick={() => window.location.href = '/consultation'}
                  >
                    Request a Consultation
                    <Send className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </HapticButton>
                  
                  <HapticButton
                    ref={magneticRef2 as any}
                    size="lg"
                    variant="outline"
                    hapticStrength="light"
                    className="w-full bg-white/10 border-2 border-white text-white hover:bg-white/20 font-semibold py-6 text-lg rounded-2xl backdrop-blur-sm"
                  >
                    Download Our Brochure
                  </HapticButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
