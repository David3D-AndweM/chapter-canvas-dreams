import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Shield, Users } from "lucide-react";

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        const parallaxElements = heroRef.current.querySelectorAll(".parallax-element");
        
        parallaxElements.forEach((el, index) => {
          const speed = (index + 1) * 0.2;
          (el as HTMLElement).style.transform = `translateY(${scrolled * speed}px)`;
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24"
      style={{
        background: "var(--gradient-hero)",
      }}
    >
      {/* Floating Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-96 h-96 rounded-full opacity-30 blur-3xl animate-float parallax-element"
          style={{ background: "hsl(0 79% 60% / 0.3)" }}
        />
        <div
          className="absolute bottom-20 right-10 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl animate-float-delayed parallax-element"
          style={{ background: "hsl(186 63% 78% / 0.3)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl animate-pulse-glow"
          style={{ background: "hsl(330 100% 93% / 0.4)" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full mb-8 animate-fade-in-up shadow-lg">
            <Heart className="w-5 h-5 text-primary" fill="currentColor" />
            <span className="text-sm font-semibold text-foreground">
              Trauma-Informed Therapeutic Care
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-8 leading-tight animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}>
            Every Child Deserves
            <br />
            <span className="text-gradient">A Brighter Future</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-foreground/80 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up font-light"
             style={{ animationDelay: "0.4s" }}>
            Specialist therapeutic residential care for children and young people 
            with emotional and behavioural difficulties across England and Wales
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16 animate-fade-in-up"
               style={{ animationDelay: "0.6s" }}>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-2xl shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-glow)] transform hover:scale-105 transition-all duration-300 group"
            >
              Explore Our Services
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/80 backdrop-blur-sm hover:bg-white border-2 border-primary/20 text-foreground px-8 py-6 text-lg rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Learn About Our Approach
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in-up"
               style={{ animationDelay: "0.8s" }}>
            {[
              { icon: Heart, label: "Trauma-Informed", value: "100%", color: "primary" },
              { icon: Shield, label: "Qualified Staff", value: "Expert", color: "secondary" },
              { icon: Users, label: "Young People", value: "11-18", color: "accent" },
            ].map((stat, index) => (
              <div
                key={index}
                className="glass-effect rounded-3xl p-8 border border-white/30 hover:border-white/60 transition-all duration-500 transform hover:scale-105 hover:shadow-xl group"
              >
                <stat.icon className={`w-12 h-12 mx-auto mb-4 text-${stat.color} group-hover:scale-110 transition-transform`} />
                <div className="text-3xl font-display font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-foreground/70 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-24"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
