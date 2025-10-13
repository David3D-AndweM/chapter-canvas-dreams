import { useEffect, useState } from "react";
import { InlineWidget } from "react-calendly";
import { motion } from "framer-motion";
import { Calendar, Clock, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Consultation = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Listen for Calendly events via window message
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data.event === 'calendly.event_scheduled') {
        console.log("Event scheduled:", e.data);
        toast.success("Consultation Booked!", {
          description: "We'll send you a confirmation email shortly.",
        });
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect-premium border-b border-white/30 shadow-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="text-primary hover:text-primary/80 font-semibold"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
            
            <a href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl glass-effect-frosted flex items-center justify-center">
                <span className="text-xl font-display font-bold text-primary">D</span>
              </div>
              <span className="text-xl font-display font-bold text-primary">Dream Path</span>
            </a>
            
            <div className="w-32"></div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-6 py-2 bg-primary/10 rounded-full mb-6">
              <span className="text-primary font-semibold text-sm">Book Your Consultation</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Let's Start a <span className="text-gradient">Conversation</span>
            </h1>
            
            <p className="text-xl text-foreground/80 leading-relaxed max-w-3xl mx-auto">
              Schedule a free consultation with our team to discuss how Dream Path can 
              support your young person's journey toward stability and success.
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mb-16"
          >
            <div className="glass-effect-frosted p-6 rounded-2xl border border-primary/10">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Flexible Scheduling</h3>
              <p className="text-foreground/70">
                Choose a time that works best for you from our available slots
              </p>
            </div>

            <div className="glass-effect-frosted p-6 rounded-2xl border border-secondary/10">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">30-Minute Session</h3>
              <p className="text-foreground/70">
                Focused discussion about your needs and our services
              </p>
            </div>

            <div className="glass-effect-frosted p-6 rounded-2xl border border-accent/10">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">No Obligation</h3>
              <p className="text-foreground/70">
                Free consultation with no commitment required
              </p>
            </div>
          </motion.div>

          {/* Calendly Embed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-effect-frosted rounded-3xl p-8 border border-primary/10 shadow-2xl"
          >
            <div className="calendly-embed-container">
              <InlineWidget
                url="https://calendly.com/your-calendly-link"
                styles={{
                  height: '700px',
                  minWidth: '100%',
                }}
                pageSettings={{
                  backgroundColor: 'ffffff',
                  hideEventTypeDetails: false,
                  hideLandingPageDetails: false,
                  primaryColor: '8b5cf6',
                  textColor: '1a202c'
                }}
              />
            </div>
          </motion.div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="glass-effect-frosted rounded-2xl p-8 border border-primary/10 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">What to Expect</h3>
              <div className="space-y-4 text-left">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-foreground/80">
                    <strong>Personalized Discussion:</strong> We'll take time to understand your specific needs and circumstances
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-foreground/80">
                    <strong>Service Overview:</strong> Learn about our therapeutic care approach and available programs
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-foreground/80">
                    <strong>Next Steps:</strong> Get clear guidance on the referral process and timeline
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-foreground/80">
                    <strong>Q&A Session:</strong> Ask any questions you have about our services, team, or approach
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Alternative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 text-center"
          >
            <p className="text-foreground/70 mb-4">
              Prefer to reach out directly?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.location.href = "mailto:info@dreampath.care"}
                className="font-semibold"
              >
                Email Us
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.location.href = "tel:+441234567890"}
                className="font-semibold"
              >
                Call +44 (0) 123 456 7890
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-primary/10">
        <div className="container mx-auto px-6 text-center text-foreground/60">
          <p>&copy; 2024 Dream Path. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Consultation;