import { Star, Quote } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    name: "Sarah Thompson",
    role: "Local Authority Placement Officer",
    content: "Dream Path has consistently provided exceptional care for the young people we've placed. Their trauma-informed approach and dedicated staff make a real difference.",
    rating: 5,
  },
  {
    name: "Michael Davies",
    role: "Social Worker",
    content: "The multi-disciplinary team approach is outstanding. Every child receives personalized support that truly addresses their unique needs.",
    rating: 5,
  },
  {
    name: "Emma Wilson",
    role: "Healthcare Professional",
    content: "I've seen remarkable progress in young people under Dream Path's care. Their therapeutic interventions are evidence-based and highly effective.",
    rating: 5,
  },
  {
    name: "James Foster",
    role: "Education Coordinator",
    content: "The on-site educational provision is excellent. Young people thrive in the supportive learning environment they create.",
    rating: 5,
  },
  {
    name: "Rachel Bennett",
    role: "Clinical Psychologist",
    content: "Dream Path's commitment to trauma-informed care is evident in every aspect of their service. They truly put children first.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  return (
    <section ref={sectionRef} className="py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block px-6 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-6">
            <span className="text-primary font-semibold text-sm">Testimonials</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">
            Trusted by <span className="text-gradient">Professionals</span>
          </h2>
          
          <p className="text-xl text-foreground/80 leading-relaxed">
            Hear from the local authorities and professionals who work with us
          </p>
        </div>
      </div>

      {/* Horizontal Scrolling Container - CSS Marquee */}
      {isInView && (
        <div className="marquee-container">
          <div className="marquee-track">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0 w-[500px] bg-white rounded-3xl p-8 shadow-xl border border-primary/10 hover:shadow-2xl transition-all duration-500 hover:border-primary/30"
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <Quote className="w-12 h-12 text-primary/20 mb-6" />
            
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              "{testimonial.content}"
            </p>
            
            <div className="flex items-center gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-primary fill-primary" />
              ))}
            </div>
            
            <div className="border-t border-primary/10 pt-4">
              <h4 className="font-display font-bold text-foreground">{testimonial.name}</h4>
              <p className="text-sm text-foreground/60">{testimonial.role}</p>
            </div>
          </motion.div>
            ))}
          </div>
        </div>
      )}

      <div className="text-center mt-8">
        <p className="text-sm text-foreground/60">
          Hover to pause auto-scroll
        </p>
      </div>
    </section>
  );
};

export default TestimonialsSection;
