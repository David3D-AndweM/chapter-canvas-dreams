import { useEffect, useRef, useState } from "react";
import { Award, Briefcase, Heart, Lightbulb, Target } from "lucide-react";

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

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <div
              key={index}
              className={`${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="group relative h-full">
                {/* Card */}
                <div className="relative h-full bg-gradient-to-br from-white to-primary/5 rounded-3xl p-8 border border-primary/10 hover:border-primary/30 transition-all duration-500 shadow-lg hover:shadow-2xl transform hover:-translate-y-2">
                  {/* Glow Effect on Hover */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/0 to-secondary/0 group-hover:from-primary/5 group-hover:to-secondary/5 transition-all duration-500" />
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                      <value.icon className="w-8 h-8 text-primary" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-display font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                      {value.title}
                    </h3>

                    {/* Description */}
                    <p className="text-foreground/70 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
