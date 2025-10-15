import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  X, 
  Clock, 
  Shield, 
  Users, 
  AlertCircle, 
  Heart, 
  Phone, 
  Car, 
  Scale, 
  Lightbulb,
  Home,
  Activity,
  UserCheck,
  ChevronDown,
  Sparkles
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// FAQ Data Structure
interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'advocacy' | 'crisis' | 'mental-health' | 'contact' | 'safeguarding';
  icon: typeof Clock;
  tags: string[];
}

const faqData: FAQItem[] = [
  // General Care Questions (5)
  {
    id: 'faq-1',
    question: 'Is your home open 24/7?',
    answer: 'Yes. Our children\'s home operates 24 hours a day, 7 days a week. Children always have access to care, support, and supervision, no matter the time of day or night. Our team is on hand around the clock to provide stability, reassurance, and a safe environment.',
    category: 'general',
    icon: Clock,
    tags: ['24/7', 'hours', 'availability', 'supervision', 'always open']
  },
  {
    id: 'faq-2',
    question: 'How do you keep children safe?',
    answer: 'Safety is at the heart of everything we do. All staff are fully trained in safeguarding, first aid, crisis management, and de-escalation techniques. We follow strict safeguarding policies and ensure children are always cared for in a secure, nurturing setting.',
    category: 'general',
    icon: Shield,
    tags: ['safety', 'safeguarding', 'security', 'protection', 'training']
  },
  {
    id: 'faq-3',
    question: 'Can children stay in touch with their families?',
    answer: 'Yes. Where safe and appropriate, we encourage and support family contact through visits, phone calls, and video calls. We know how important family connections are for a child\'s identity, belonging, and emotional wellbeing.',
    category: 'general',
    icon: Users,
    tags: ['family', 'contact', 'visits', 'communication', 'relationships']
  },
  {
    id: 'faq-4',
    question: 'What happens during a crisis situation?',
    answer: 'Our staff are trained to respond calmly and compassionately in moments of crisis. We focus on de-escalation first, offering comfort and support to help children feel safe and understood. If needed, we also provide crisis and respite care in a secure, homely environment.',
    category: 'general',
    icon: AlertCircle,
    tags: ['crisis', 'emergency', 'response', 'de-escalation', 'respite']
  },
  {
    id: 'faq-5',
    question: 'What makes Dream Paths different?',
    answer: 'We combine professionalism with genuine care. Our team treats every child as an individual, focusing on their strengths, hopes, and future goals. We create a homely, supportive environment where children feel valued, respected, and empowered to thrive.',
    category: 'general',
    icon: Sparkles,
    tags: ['difference', 'unique', 'approach', 'values', 'philosophy']
  },
  // Appropriate Adult Advocacy (3)
  {
    id: 'faq-6',
    question: 'What is Appropriate Adult Advocacy?',
    answer: 'We provide a trusted presence for young people during police interviews, court proceedings, or key meetings with professionals. Our advocates ensure that every child feels safe, listened to, and respected, while also making sure their rights are upheld. We take time to explain things clearly at their level, reducing fear and confusion.',
    category: 'advocacy',
    icon: Scale,
    tags: ['advocacy', 'legal', 'court', 'police', 'rights', 'support']
  },
  {
    id: 'faq-7',
    question: 'Who needs an Appropriate Adult?',
    answer: 'Any young person under 18 involved in legal proceedings, police interviews, or formal meetings where they may feel overwhelmed or unable to fully express themselves. We ensure they have someone in their corner who genuinely cares and can help them understand what\'s happening.',
    category: 'advocacy',
    icon: UserCheck,
    tags: ['appropriate adult', 'legal', 'young people', 'support', 'representation']
  },
  {
    id: 'faq-8',
    question: 'How do you support children during legal proceedings?',
    answer: 'We act as a steady and supportive presence, helping children feel safe and confident. We explain processes in simple terms, advocate for their rights, and ensure their voice is heard. Our goal is to replace fear with understanding and empower them throughout the process.',
    category: 'advocacy',
    icon: Lightbulb,
    tags: ['legal', 'court', 'support', 'advocacy', 'empowerment']
  },
  // Crisis & Respite Support (3)
  {
    id: 'faq-9',
    question: 'What is Crisis and Respite Support?',
    answer: 'We provide a safe, structured, and welcoming environment where children can feel secure during difficult times. Whether it\'s a short break to relieve family pressures or immediate intervention during a crisis, we offer compassionate care that brings stability and reassurance.',
    category: 'crisis',
    icon: Home,
    tags: ['crisis', 'respite', 'emergency', 'break', 'support', 'relief']
  },
  {
    id: 'faq-10',
    question: 'How quickly can you respond to a crisis?',
    answer: 'Our staff are trained to respond quickly but with empathy. We understand that behind every crisis is a story and a set of needs. We create a calm, homely atmosphere so children feel comforted rather than unsettled, and work with both the child and their family to prevent future crises.',
    category: 'crisis',
    icon: Activity,
    tags: ['crisis', 'emergency', 'response time', 'quick', 'immediate']
  },
  {
    id: 'faq-11',
    question: 'Can families access respite care regularly?',
    answer: 'Yes. Respite support gives families valuable space and time to rebuild and find balance. We work with families to create flexible arrangements that support both the child\'s wellbeing and family stability.',
    category: 'crisis',
    icon: Heart,
    tags: ['respite', 'regular', 'flexible', 'family support', 'planning']
  },
  // Mental Health & Family Support (3)
  {
    id: 'faq-12',
    question: 'What is Family-Centred Mental Health Support?',
    answer: 'We focus on the whole family unit, helping to strengthen relationships and create healthier patterns of communication. We work alongside children, parents, and carers to address challenges such as anxiety, stress, and emotional difficulties, offering strategies and support tailored to each family\'s needs.',
    category: 'mental-health',
    icon: Heart,
    tags: ['mental health', 'family', 'therapy', 'counseling', 'support', 'wellbeing']
  },
  {
    id: 'faq-13',
    question: 'Do you work with families together or separately?',
    answer: 'We listen closely to both the child\'s and family\'s experiences so that no one feels ignored. By supporting families together, we build resilience, improve understanding, and create positive foundations for long-term wellbeing. Small, consistent steps are encouraged because lasting change happens gradually.',
    category: 'mental-health',
    icon: Users,
    tags: ['family therapy', 'together', 'holistic', 'approach', 'relationships']
  },
  {
    id: 'faq-14',
    question: 'How long does mental health support take?',
    answer: 'Every family is different. We work at a pace that feels comfortable and sustainable, focusing on gradual progress rather than quick fixes. Our aim is to bring families closer and help them move forward with stronger connections and renewed hope.',
    category: 'mental-health',
    icon: Activity,
    tags: ['duration', 'timeline', 'progress', 'mental health', 'therapy']
  },
  // Contact & Transport Services (3)
  {
    id: 'faq-15',
    question: 'What are Supported Contact Visits?',
    answer: 'We provide a safe, structured, and nurturing environment where children can spend time with family members under the guidance of our experienced staff. We ensure visits are managed sensitively and positively, helping to rebuild trust, strengthen bonds, and support meaningful connections.',
    category: 'contact',
    icon: Users,
    tags: ['contact', 'visits', 'family', 'supervised', 'support', 'reunion']
  },
  {
    id: 'faq-16',
    question: 'What is Secure Welfare Transport?',
    answer: 'We ensure that every journey is handled by trained, caring staff who prioritise the safety, comfort, and emotional wellbeing of the child. Whether travelling to school, appointments, court hearings, or moving between care placements, we provide a calm and reassuring presence throughout.',
    category: 'contact',
    icon: Car,
    tags: ['transport', 'travel', 'safe', 'secure', 'journey', 'appointments']
  },
  {
    id: 'faq-17',
    question: 'How do you prepare children for transport or visits?',
    answer: 'We prepare children in advance so they know what to expect and feel reassured. We take time to build trust before and during journeys or visits, treating each interaction with sensitivity and respect. Our goal is to reduce stress and make every experience as positive as possible.',
    category: 'contact',
    icon: Lightbulb,
    tags: ['preparation', 'visits', 'transport', 'planning', 'communication']
  },
  // Safeguarding & Welfare (3)
  {
    id: 'faq-18',
    question: 'What are Child and Family Welfare Visits?',
    answer: 'We provide regular check-ins where our staff offer guidance, reassurance, and practical support to families experiencing challenges. These visits allow us to quickly identify any risks or concerns and offer solutions that promote stability, safety, and positive outcomes.',
    category: 'safeguarding',
    icon: Shield,
    tags: ['welfare', 'visits', 'check-ins', 'monitoring', 'support', 'safety']
  },
  {
    id: 'faq-19',
    question: 'How do you ensure safeguarding during visits?',
    answer: 'Each visit is approached with care and respect, never judgment. We believe early support can prevent problems from escalating and give families the tools they need to succeed. Our staff are fully trained in safeguarding protocols and work within strict guidelines.',
    category: 'safeguarding',
    icon: UserCheck,
    tags: ['safeguarding', 'safety', 'protocols', 'training', 'guidelines']
  },
  {
    id: 'faq-20',
    question: 'Can you work alongside other professionals?',
    answer: 'Absolutely. We work closely with local authorities, healthcare professionals, and other agencies to provide a smooth, transparent process. By building stronger support networks, we help families create safe, stable environments where children can flourish.',
    category: 'safeguarding',
    icon: Users,
    tags: ['collaboration', 'professionals', 'agencies', 'partnership', 'teamwork']
  },
];

const categories = [
  { id: 'all', label: 'All Questions', count: 20 },
  { id: 'general', label: 'General Care', count: 5 },
  { id: 'advocacy', label: 'Advocacy', count: 3 },
  { id: 'crisis', label: 'Crisis & Respite', count: 3 },
  { id: 'mental-health', label: 'Mental Health', count: 3 },
  { id: 'contact', label: 'Contact & Transport', count: 3 },
  { id: 'safeguarding', label: 'Safeguarding', count: 3 },
];

const FAQSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  // Filter FAQs based on search and category
  const filteredFAQs = useMemo(() => {
    let filtered = faqData;

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(faq => faq.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(faq => 
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [searchQuery, activeCategory]);

  // Highlight matching text in search results
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={index} className="bg-yellow-200 text-foreground px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as any }
    }
  };

  return (
    <section 
      id="faq" 
      ref={sectionRef}
      className="py-32 bg-gradient-to-b from-white via-primary/5 to-white relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-block px-6 py-2 bg-primary/10 rounded-full mb-6"
            >
              <span className="text-primary font-semibold text-sm">FAQ</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl font-display font-bold mb-6"
            >
              Frequently Asked <span className="text-gradient">Questions</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-foreground/80 leading-relaxed max-w-3xl mx-auto"
            >
              Get answers to your most common questions about our services, approach, and how we can support your young person.
            </motion.p>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
              <Input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-12 h-14 bg-white/80 backdrop-blur-sm border-2 border-primary/20 focus:border-primary rounded-xl text-lg shadow-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12 overflow-x-auto scrollbar-hide"
          >
            <div className="flex flex-wrap justify-center gap-3 min-w-max px-4">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  variant={activeCategory === category.id ? 'default' : 'outline'}
                  className={cn(
                    "rounded-full px-6 py-3 transition-all duration-300",
                    activeCategory === category.id
                      ? "bg-primary text-white shadow-lg scale-105"
                      : "bg-white/50 backdrop-blur-sm hover:bg-white hover:scale-105"
                  )}
                >
                  {category.label}
                  <span className={cn(
                    "ml-2 px-2 py-0.5 rounded-full text-xs font-semibold",
                    activeCategory === category.id
                      ? "bg-white/20"
                      : "bg-primary/10 text-primary"
                  )}>
                    {category.count}
                  </span>
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Results Count */}
          {searchQuery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mb-6 text-foreground/60"
            >
              {filteredFAQs.length} {filteredFAQs.length === 1 ? 'result' : 'results'} found
            </motion.div>
          )}

          {/* FAQ Accordion */}
          <AnimatePresence mode="wait">
            {filteredFAQs.length > 0 ? (
              <motion.div
                key={`${activeCategory}-${searchQuery}`}
                variants={containerVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <Accordion type="single" collapsible className="space-y-4">
                  {filteredFAQs.map((faq, index) => {
                    const Icon = faq.icon;
                    return (
                      <motion.div key={faq.id} variants={itemVariants}>
                        <AccordionItem
                          value={faq.id}
                          className="bg-white/80 backdrop-blur-sm border-2 border-primary/10 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:border-primary/30 transition-all duration-300 group"
                        >
                          <AccordionTrigger className="px-6 py-6 hover:no-underline [&[data-state=open]]:bg-gradient-to-r [&[data-state=open]]:from-primary/5 [&[data-state=open]]:to-secondary/5">
                            <div className="flex items-start gap-4 text-left flex-1">
                              {/* Question Number */}
                              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm shadow-lg">
                                {String(faqData.indexOf(faq) + 1).padStart(2, '0')}
                              </div>
                              
                              {/* Question Content */}
                              <div className="flex-1">
                                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-1 pr-4 group-hover:text-primary transition-colors">
                                  {highlightText(faq.question, searchQuery)}
                                </h3>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                                    {categories.find(c => c.id === faq.category)?.label}
                                  </span>
                                </div>
                              </div>

                              {/* Icon */}
                              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                                <Icon className="w-6 h-6 text-primary" />
                              </div>
                            </div>
                          </AccordionTrigger>
                          
                          <AccordionContent className="px-6 pb-6">
                            <div className="pl-14 pr-4">
                              <p className="text-foreground/80 leading-relaxed text-base md:text-lg">
                                {searchQuery ? highlightText(faq.answer, searchQuery) : faq.answer}
                              </p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </motion.div>
                    );
                  })}
                </Accordion>
              </motion.div>
            ) : (
              <motion.div
                key="no-results"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-20"
              >
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-12 h-12 text-primary/40" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">No results found</h3>
                  <p className="text-foreground/60 mb-6">
                    We couldn't find any questions matching "{searchQuery}". 
                    Try a different search term or browse our categories.
                  </p>
                  <Button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('all');
                    }}
                    variant="outline"
                    className="rounded-full"
                  >
                    Clear Search
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA at Bottom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-12 text-white shadow-2xl">
              <h3 className="text-3xl font-display font-bold mb-4">
                Still have questions?
              </h3>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Our team is here to help. Get in touch and we'll provide personalized answers to your specific questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  <a href="#contact">Contact Us</a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary rounded-full px-8 py-6 text-lg font-semibold"
                >
                  <a href="/consultation">Book a Consultation</a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
