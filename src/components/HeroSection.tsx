import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Shield, Users } from "lucide-react";
import { useMagnetic } from "@/hooks/use-magnetic";
import { useCounterAnimation } from "@/hooks/use-counter-animation";
import HapticButton from "./HapticButton";
import ParallaxDepthImage from "./ParallaxDepthImage";
import TextMorph from "./TextMorph";
import VariableFontText from "./VariableFontText";
import AnimatedHeading from "./AnimatedHeading";
import heroTeamImg from "@/assets/children-circle-happy.jpg";

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const magneticRef1 = useMagnetic(0.15);
  const magneticRef2 = useMagnetic(0.15);
  const { count: percentage, ref: percentRef } = useCounterAnimation(100, 2000);
  const { count: ageStart, ref: ageRef } = useCounterAnimation(11, 1500);
  const { count: ageEnd, ref: ageEndRef } = useCounterAnimation(18, 1500, 11);

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-36"
      style={{
        background: "var(--gradient-hero)",
      }}
    >
      {/* Multi-Layer Parallax Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Layer 1 - Slowest */}
        <div
          className="absolute top-20 left-10 w-96 h-96 rounded-full opacity-30 blur-3xl animate-float parallax-element"
          style={{ background: "hsl(0 79% 60% / 0.3)" }}
          data-speed="0.2"
        />

        {/* Layer 2 */}
        <div
          className="absolute top-40 right-20 w-64 h-64 rounded-full opacity-20 blur-2xl animate-float-delayed parallax-element"
          style={{ background: "hsl(186 63% 78% / 0.4)" }}
          data-speed="0.3"
        />

        {/* Layer 3 */}
        <div
          className="absolute bottom-20 right-10 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl animate-float-delayed parallax-element"
          style={{ background: "hsl(186 63% 78% / 0.3)" }}
          data-speed="0.4"
        />

        {/* Layer 4 */}
        <div
          className="absolute bottom-40 left-20 w-80 h-80 rounded-full opacity-25 blur-3xl animate-float parallax-element"
          style={{ background: "hsl(330 100% 85% / 0.3)" }}
          data-speed="0.5"
        />

        {/* Layer 5 - Center glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl animate-pulse-glow parallax-element"
          style={{ background: "hsl(330 100% 93% / 0.4)" }}
          data-speed="0.6"
        />

        {/* Layer 6 - Additional accent */}
        <div
          className="absolute top-60 left-1/3 w-72 h-72 rounded-full opacity-15 blur-2xl animate-float parallax-element"
          style={{ background: "hsl(0 79% 70% / 0.2)" }}
          data-speed="0.7"
        />

        {/* Layer 7 - Fastest */}
        <div
          className="absolute bottom-32 right-1/4 w-56 h-56 rounded-full opacity-25 blur-3xl animate-float-delayed parallax-element"
          style={{ background: "hsl(186 63% 85% / 0.3)" }}
          data-speed="0.8"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 glass-effect-premium px-6 py-3 rounded-full mb-8 animate-fade-in-up shadow-xl glass-shimmer">
            <Heart className="w-5 h-5 text-primary" fill="currentColor" />
            <span className="text-sm font-semibold text-foreground">Trauma-Informed Therapeutic Care</span>
          </div>

          {/* Main Headline with Text Morphing */}
          <AnimatedHeading
            variant="split"
            delay={0.2}
            className="text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-8 leading-tight"
          >
            Every Child Deserves
          </AnimatedHeading>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-8 leading-tight">
            <TextMorph
              words={["A Brighter Future", "A Safe Haven", "Hope & Healing", "To Flourish"]}
              className="text-gradient animate-gradient-shift"
              interval={3500}
              staggerChildren
            />
          </h1>

          {/* Subheadline with Variable Font */}
          <p
            className="text-xl md:text-2xl text-foreground/80 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up font-light"
            style={{ animationDelay: "0.4s" }}
          >
            <VariableFontText animation="pulse" duration={3} trigger="continuous">
              Specialist therapeutic residential care
            </VariableFontText>{" "}
            for children and young people with emotional and behavioural difficulties across England and Wales
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <HapticButton
              ref={magneticRef1 as any}
              size="lg"
              hapticStrength="medium"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-2xl shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 group"
            >
              Explore Our Services
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </HapticButton>
            <HapticButton
              ref={magneticRef2 as any}
              size="lg"
              variant="outline"
              hapticStrength="light"
              className="bg-white/80 backdrop-blur-sm hover:bg-white border-2 border-primary/20 text-foreground px-8 py-6 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Learn About Our Approach
            </HapticButton>
          </div>

          {/* Hero Image */}
          <div className="mb-16 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
            <ParallaxDepthImage
              src={heroTeamImg}
              alt="Children forming a circle representing unity and support at Dream Paths Care Services"
              depth={80}
              className="max-w-5xl mx-auto"
            />
          </div>

          {/* Stats Cards */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "1s" }}
          >
            <div
              ref={percentRef}
              className="glass-effect-gradient rounded-3xl p-8 border border-white/30 hover:border-primary/60 transition-all duration-500 transform hover:scale-105 hover:shadow-[var(--shadow-glow)] group gpu-accelerated glass-shimmer"
            >
              <Heart
                className="w-12 h-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform"
                fill="currentColor"
              />
              <div className="text-3xl font-display font-bold mb-2 font-weight-hover">{percentage}%</div>
              <div className="text-sm text-foreground/70 font-medium">Trauma-Informed</div>
            </div>

            <div className="glass-effect-gradient rounded-3xl p-8 border border-white/30 hover:border-secondary/60 transition-all duration-500 transform hover:scale-105 hover:shadow-[var(--shadow-glow)] group gpu-accelerated glass-shimmer">
              <Shield
                className="w-12 h-12 mx-auto mb-4 text-secondary group-hover:scale-110 transition-transform"
                fill="currentColor"
              />
              <div className="text-3xl font-display font-bold mb-2 font-weight-hover">Expert</div>
              <div className="text-sm text-foreground/70 font-medium">Qualified Staff</div>
            </div>

            <div
              ref={ageRef}
              className="glass-effect-gradient rounded-3xl p-8 border border-white/30 hover:border-accent/60 transition-all duration-500 transform hover:scale-105 hover:shadow-[var(--shadow-glow)] group gpu-accelerated glass-shimmer"
            >
              <Users
                className="w-12 h-12 mx-auto mb-4 text-accent group-hover:scale-110 transition-transform"
                fill="currentColor"
              />
              <div className="text-3xl font-display font-bold mb-2 font-weight-hover">{ageStart}-18</div>
              <div className="text-sm text-foreground/70 font-medium">Young People</div>
            </div>
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
