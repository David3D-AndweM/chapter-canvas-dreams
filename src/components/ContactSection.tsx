import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, User, MessageSquare, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useMagnetic } from "@/hooks/use-magnetic";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import HapticButton from "./HapticButton";
import MagneticRevealImage from "./MagneticRevealImage";
import contactConnectImg from "@/assets/professional-caregiver.jpg";

// Contact form validation schema
const contactFormSchema = z.object({
  name: z.string()
    .trim()
    .min(1, "Please enter your name")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'\-]+$/, "Please use only letters, spaces, hyphens, and apostrophes"),
  
  email: z.string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters")
    .toLowerCase(),
  
  phone: z.string()
    .trim()
    .max(20, "Phone number must be less than 20 characters")
    .regex(/^[+\d\s()\-]*$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  
  message: z.string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters")
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const magneticRef1 = useMagnetic(0.2);
  const { toast } = useToast();

  // Form setup with validation
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    mode: "onBlur", // Validate on blur for better UX
  });

  // Form submission handler
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call - YOU WILL REPLACE THIS with your actual backend call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Form data:", data); // For debugging
      
      // Success state
      setIsSuccess(true);
      toast({
        title: "Message Sent Successfully! 🎉",
        description: "We'll get back to you within 24 hours.",
      });
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        form.reset();
      }, 3000);
      
    } catch (error) {
      // Error state
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
                      <p className="text-foreground/70">Info@dreampathservices.co.uk</p>
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

            {/* Contact Form Card */}
            <div className={`${isVisible ? "animate-slide-in-right" : "opacity-0"}`}>
              <div className="bg-gradient-to-br from-primary to-primary/90 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
                {/* Animated background gradient */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent animate-gradient-shift" />
                </div>

                <div className="relative z-10">
                  <h3 className="text-3xl font-display font-bold mb-6">
                    Ready to Make a Difference?
                  </h3>
                  
                  <p className="text-white/90 text-lg leading-relaxed mb-8">
                    Whether you're a local authority looking for specialist placements, 
                    or a professional seeking support for a young person, we're here to help.
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      <span className="text-white/90">Specialist therapeutic care</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
                      <span className="text-white/90">Multi-disciplinary team support</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
                      <span className="text-white/90">Proven track record of success</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: "0.6s" }} />
                      <span className="text-white/90">Flexible, person-centered approach</span>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {isSuccess ? (
                      // Success State
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/30 text-center"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                        >
                          <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-white" />
                        </motion.div>
                        <h4 className="text-2xl font-bold mb-2">Message Sent Successfully!</h4>
                        <p className="text-white/80">We'll get back to you within 24 hours.</p>
                      </motion.div>
                    ) : (
                      // Contact Form
                      <motion.div
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/* Name Field */}
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field, fieldState }) => (
                                <FormItem>
                                  <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                                      <User className={`w-5 h-5 transition-all duration-300 ${
                                        focusedField === 'name' ? 'text-white scale-110' : 'text-white/60'
                                      }`} />
                                    </div>
                                    <FormControl>
                                      <motion.div
                                        animate={fieldState.error ? { x: [-10, 10, -10, 10, 0] } : {}}
                                        transition={{ duration: 0.4 }}
                                      >
                                        <Input
                                          placeholder="Your Name *"
                                          className={`pl-12 pr-12 h-14 bg-white/10 border-2 backdrop-blur-sm text-white placeholder:text-white/50 rounded-xl transition-all duration-300 ${
                                            focusedField === 'name' 
                                              ? 'border-white shadow-lg shadow-white/20 bg-white/20' 
                                              : fieldState.error
                                              ? 'border-red-300 bg-red-500/10'
                                              : field.value && !fieldState.error
                                              ? 'border-green-300 bg-green-500/10'
                                              : 'border-white/30 hover:border-white/50'
                                          }`}
                                          {...field}
                                          onFocus={() => setFocusedField('name')}
                                          onBlur={() => {
                                            setFocusedField(null);
                                            field.onBlur();
                                          }}
                                        />
                                      </motion.div>
                                    </FormControl>
                                    {field.value && !fieldState.error && (
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute right-4 top-1/2 -translate-y-1/2"
                                      >
                                        <CheckCircle2 className="w-5 h-5 text-green-300" />
                                      </motion.div>
                                    )}
                                    {fieldState.error && (
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute right-4 top-1/2 -translate-y-1/2"
                                      >
                                        <AlertCircle className="w-5 h-5 text-red-300" />
                                      </motion.div>
                                    )}
                                  </div>
                                  <AnimatePresence>
                                    {fieldState.error && (
                                      <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                      >
                                        <FormMessage className="text-red-200 text-sm mt-2 ml-1" />
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </FormItem>
                              )}
                            />

                            {/* Email Field */}
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field, fieldState }) => (
                                <FormItem>
                                  <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                                      <Mail className={`w-5 h-5 transition-all duration-300 ${
                                        focusedField === 'email' ? 'text-white scale-110' : 'text-white/60'
                                      }`} />
                                    </div>
                                    <FormControl>
                                      <motion.div
                                        animate={fieldState.error ? { x: [-10, 10, -10, 10, 0] } : {}}
                                        transition={{ duration: 0.4 }}
                                      >
                                        <Input
                                          type="email"
                                          placeholder="Email Address *"
                                          className={`pl-12 pr-12 h-14 bg-white/10 border-2 backdrop-blur-sm text-white placeholder:text-white/50 rounded-xl transition-all duration-300 ${
                                            focusedField === 'email' 
                                              ? 'border-white shadow-lg shadow-white/20 bg-white/20' 
                                              : fieldState.error
                                              ? 'border-red-300 bg-red-500/10'
                                              : field.value && !fieldState.error
                                              ? 'border-green-300 bg-green-500/10'
                                              : 'border-white/30 hover:border-white/50'
                                          }`}
                                          {...field}
                                          onFocus={() => setFocusedField('email')}
                                          onBlur={() => {
                                            setFocusedField(null);
                                            field.onBlur();
                                          }}
                                        />
                                      </motion.div>
                                    </FormControl>
                                    {field.value && !fieldState.error && (
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute right-4 top-1/2 -translate-y-1/2"
                                      >
                                        <CheckCircle2 className="w-5 h-5 text-green-300" />
                                      </motion.div>
                                    )}
                                    {fieldState.error && (
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute right-4 top-1/2 -translate-y-1/2"
                                      >
                                        <AlertCircle className="w-5 h-5 text-red-300" />
                                      </motion.div>
                                    )}
                                  </div>
                                  <AnimatePresence>
                                    {fieldState.error && (
                                      <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                      >
                                        <FormMessage className="text-red-200 text-sm mt-2 ml-1" />
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </FormItem>
                              )}
                            />

                            {/* Phone Field */}
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field, fieldState }) => (
                                <FormItem>
                                  <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                                      <Phone className={`w-5 h-5 transition-all duration-300 ${
                                        focusedField === 'phone' ? 'text-white scale-110' : 'text-white/60'
                                      }`} />
                                    </div>
                                    <FormControl>
                                      <motion.div
                                        animate={fieldState.error ? { x: [-10, 10, -10, 10, 0] } : {}}
                                        transition={{ duration: 0.4 }}
                                      >
                                        <Input
                                          type="tel"
                                          placeholder="Phone Number (Optional)"
                                          className={`pl-12 pr-12 h-14 bg-white/10 border-2 backdrop-blur-sm text-white placeholder:text-white/50 rounded-xl transition-all duration-300 ${
                                            focusedField === 'phone' 
                                              ? 'border-white shadow-lg shadow-white/20 bg-white/20' 
                                              : fieldState.error
                                              ? 'border-red-300 bg-red-500/10'
                                              : field.value && !fieldState.error
                                              ? 'border-green-300 bg-green-500/10'
                                              : 'border-white/30 hover:border-white/50'
                                          }`}
                                          {...field}
                                          onFocus={() => setFocusedField('phone')}
                                          onBlur={() => {
                                            setFocusedField(null);
                                            field.onBlur();
                                          }}
                                        />
                                      </motion.div>
                                    </FormControl>
                                    {field.value && !fieldState.error && (
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute right-4 top-1/2 -translate-y-1/2"
                                      >
                                        <CheckCircle2 className="w-5 h-5 text-green-300" />
                                      </motion.div>
                                    )}
                                    {fieldState.error && (
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute right-4 top-1/2 -translate-y-1/2"
                                      >
                                        <AlertCircle className="w-5 h-5 text-red-300" />
                                      </motion.div>
                                    )}
                                  </div>
                                  <AnimatePresence>
                                    {fieldState.error && (
                                      <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                      >
                                        <FormMessage className="text-red-200 text-sm mt-2 ml-1" />
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </FormItem>
                              )}
                            />

                            {/* Message Field */}
                            <FormField
                              control={form.control}
                              name="message"
                              render={({ field, fieldState }) => (
                                <FormItem>
                                  <div className="relative">
                                    <div className="absolute left-4 top-4 z-10">
                                      <MessageSquare className={`w-5 h-5 transition-all duration-300 ${
                                        focusedField === 'message' ? 'text-white scale-110' : 'text-white/60'
                                      }`} />
                                    </div>
                                    <FormControl>
                                      <motion.div
                                        animate={fieldState.error ? { x: [-10, 10, -10, 10, 0] } : {}}
                                        transition={{ duration: 0.4 }}
                                      >
                                        <Textarea
                                          placeholder="Your Message *"
                                          rows={4}
                                          className={`pl-12 pr-4 pt-4 pb-8 bg-white/10 border-2 backdrop-blur-sm text-white placeholder:text-white/50 rounded-xl resize-none transition-all duration-300 ${
                                            focusedField === 'message' 
                                              ? 'border-white shadow-lg shadow-white/20 bg-white/20' 
                                              : fieldState.error
                                              ? 'border-red-300 bg-red-500/10'
                                              : field.value && !fieldState.error
                                              ? 'border-green-300 bg-green-500/10'
                                              : 'border-white/30 hover:border-white/50'
                                          }`}
                                          {...field}
                                          onFocus={() => setFocusedField('message')}
                                          onBlur={() => {
                                            setFocusedField(null);
                                            field.onBlur();
                                          }}
                                        />
                                      </motion.div>
                                    </FormControl>
                                    {/* Character counter */}
                                    <AnimatePresence>
                                      {(focusedField === 'message' || field.value) && (
                                        <motion.div
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          exit={{ opacity: 0 }}
                                          className="absolute right-4 bottom-2 text-xs text-white/60"
                                        >
                                          {field.value.length}/1000
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                  <AnimatePresence>
                                    {fieldState.error && (
                                      <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                      >
                                        <FormMessage className="text-red-200 text-sm mt-2 ml-1" />
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </FormItem>
                              )}
                            />

                            {/* Submit Buttons */}
                            <div className="space-y-4 pt-2">
                              <HapticButton
                                ref={magneticRef1 as any}
                                size="lg"
                                hapticStrength="medium"
                                className="w-full bg-white text-primary hover:bg-white/90 font-semibold py-6 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                                onClick={() => window.location.href = '/consultation'}
                                type="button"
                              >
                                Request a Consultation
                                <Send className="ml-2 group-hover:translate-x-1 transition-transform" />
                              </HapticButton>
                              
                              <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Button
                                  type="submit"
                                  disabled={isSubmitting}
                                  size="lg"
                                  className="w-full bg-white/10 border-2 border-white text-white hover:bg-white hover:text-primary font-semibold py-6 text-lg rounded-2xl backdrop-blur-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                                >
                                  {isSubmitting ? (
                                    <>
                                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                      Sending Message...
                                    </>
                                  ) : (
                                    <>
                                      <span className="relative z-10">Send Message</span>
                                      <Send className="ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
                                      {/* Animated background on hover */}
                                      <motion.div
                                        className="absolute inset-0 bg-white"
                                        initial={{ x: "-100%" }}
                                        whileHover={{ x: 0 }}
                                        transition={{ duration: 0.3 }}
                                      />
                                    </>
                                  )}
                                </Button>
                              </motion.div>
                            </div>
                          </form>
                        </Form>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
