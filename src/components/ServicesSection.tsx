import { useEffect, useRef, useState } from "react";
import { Brain, Heart, Shield, Users, Sparkles, GraduationCap } from "lucide-react";
import { useTilt } from "@/hooks/use-tilt";
import { motion } from "framer-motion";
import RotatingCardGallery from "./RotatingCardGallery";
import ScrollTransform3D from "./ScrollTransform3D";
import { useIsMobile } from "@/hooks/use-mobile";
import ServiceDetailModal from "./ServiceDetailModal";

const services = [
  {
    icon: Heart,
    title: "Therapeutic Care",
    description: "Trauma-informed therapeutic care approach with access to our bespoke 'Well Being for Life' clinical programme.",
    fullDescription: "Our therapeutic care service provides a comprehensive, trauma-informed approach that prioritizes the emotional and psychological well-being of every young person. Through our bespoke 'Well Being for Life' clinical programme, we deliver evidence-based therapeutic interventions tailored to individual needs.\n\nWe understand that healing from trauma requires time, expertise, and a nurturing environment. Our team works collaboratively to create safe spaces where young people can process their experiences, develop healthy coping mechanisms, and build resilience for their future.",
    features: [
      "Individual therapy sessions with qualified therapists",
      "Group therapy programmes fostering peer support",
      "Access to 'Well Being for Life' clinical programme",
      "Trauma-informed care approach throughout",
      "Family involvement and systemic therapy",
      "Crisis intervention and emotional regulation support"
    ],
    targetAudience: "Young people who have experienced trauma, attachment difficulties, or emotional challenges requiring therapeutic intervention and a nurturing care environment.",
    qualifications: "Our therapeutic team includes qualified therapists, counsellors, and psychologists with extensive experience in childhood trauma, attachment theory, and evidence-based therapeutic modalities.",
    outcomes: [
      "Improved emotional regulation and self-awareness",
      "Development of healthy coping strategies",
      "Enhanced ability to form secure attachments",
      "Increased resilience and confidence",
      "Better understanding and processing of past trauma"
    ],
    color: "primary",
    delay: "0s",
  },
  {
    icon: Brain,
    title: "Mental Health Support",
    description: "Comprehensive mental health support from qualified psychologists and behaviour support professionals.",
    fullDescription: "Mental health is at the heart of everything we do. Our comprehensive mental health support service brings together qualified psychologists, psychiatric consultants, and behaviour support professionals to provide holistic care for young people facing mental health challenges.\n\nWe offer both reactive and proactive mental health interventions, ensuring that every young person receives the support they need when they need it. From assessment and diagnosis to ongoing therapeutic support and medication management, our team works together to promote positive mental health outcomes.",
    features: [
      "Psychiatric assessments and consultations",
      "Individual psychological therapy",
      "Medication management and monitoring",
      "Behaviour support planning and implementation",
      "Crisis intervention and safety planning",
      "Mental health awareness and psychoeducation"
    ],
    targetAudience: "Young people experiencing mental health difficulties including anxiety, depression, emotional dysregulation, or complex psychological needs requiring specialist intervention.",
    qualifications: "Our mental health team comprises clinical psychologists, consultant psychiatrists, mental health nurses, and trained behaviour support professionals, all with expertise in adolescent mental health.",
    outcomes: [
      "Improved mental health stability and wellbeing",
      "Better understanding of mental health conditions",
      "Effective symptom management strategies",
      "Enhanced emotional literacy and expression",
      "Reduced crisis incidents and improved safety"
    ],
    color: "secondary",
    delay: "0.1s",
  },
  {
    icon: GraduationCap,
    title: "Educational Services",
    description: "DfE registered on-site school with tailored education packages for every young person.",
    fullDescription: "Education is a fundamental right and a pathway to future opportunities. Our DfE registered on-site school provides high-quality education in a supportive, therapeutic environment. We understand that traditional educational settings may not have met the needs of the young people in our care, which is why we offer flexible, individualized learning approaches.\n\nOur education team works closely with therapeutic and care staff to ensure that learning is accessible, engaging, and tailored to each young person's abilities, interests, and aspirations. From functional skills to GCSEs and vocational qualifications, we support educational progression at every level.",
    features: [
      "DfE registered on-site school provision",
      "Personalized education plans for each learner",
      "Small class sizes and 1-to-1 support",
      "GCSE, functional skills, and vocational qualifications",
      "Therapeutic integration within education",
      "Transition support to further education or employment"
    ],
    targetAudience: "Young people who have experienced educational disruption, school exclusion, or require specialist educational provision alongside therapeutic support.",
    qualifications: "Our teaching staff are qualified educators with experience in SEND education, trauma-informed teaching practices, and alternative provision. They work alongside educational psychologists and learning support specialists.",
    outcomes: [
      "Re-engagement with learning and education",
      "Achievement of qualifications and certifications",
      "Improved literacy and numeracy skills",
      "Development of independent learning skills",
      "Successful transition to further education or employment"
    ],
    color: "accent",
    delay: "0.2s",
  },
  {
    icon: Shield,
    title: "Complex Needs Service",
    description: "Specialist support for young people with emotional and behavioural difficulties, offering stability and structure.",
    fullDescription: "Our complex needs service is designed for young people who require intensive, specialist support due to emotional and behavioural difficulties. We provide a structured, consistent environment where young people can feel safe while receiving the therapeutic interventions they need.\n\nThrough high staff ratios, comprehensive behaviour support planning, and a trauma-informed approach, we help young people develop the skills and strategies needed to manage their emotions and behaviours effectively. Our goal is to provide the stability and support that enables positive change and growth.",
    features: [
      "High staff-to-young person ratios",
      "Comprehensive behaviour support plans",
      "Positive behaviour support approaches",
      "Structured daily routines and activities",
      "Sensory integration and regulation support",
      "Collaborative working with external professionals"
    ],
    targetAudience: "Young people with complex emotional and behavioural needs, including those with neurodevelopmental conditions, attachment difficulties, or histories of placement breakdown.",
    qualifications: "Staff are trained in positive behaviour support, therapeutic crisis intervention, sensory integration, and trauma-informed care, working alongside psychologists and behaviour analysts.",
    outcomes: [
      "Reduction in challenging behaviours",
      "Improved emotional and behavioural regulation",
      "Enhanced social skills and peer relationships",
      "Increased placement stability and reduced breakdown risk",
      "Development of independence and life skills"
    ],
    color: "primary",
    delay: "0.3s",
  },
  {
    icon: Users,
    title: "Sexual Trauma Recovery",
    description: "Safe, structured environments with our three-phase recovery programme for CSE and HSB services.",
    fullDescription: "Supporting young people who have experienced child sexual exploitation (CSE) or who display harmful sexual behaviour (HSB) requires specialist knowledge, sensitivity, and therapeutic expertise. Our dedicated service provides safe, structured environments where young people can heal, recover, and develop healthy understandings of relationships and boundaries.\n\nThrough our evidence-based three-phase recovery programme, we address the complex trauma, shame, and confusion that often accompanies these experiences. Our approach combines individual therapy, group work, and psychoeducation to support recovery and prevent future harm.",
    features: [
      "Three-phase recovery programme (stabilization, processing, integration)",
      "Specialist CSE and HSB trained therapists",
      "Individual trauma-focused therapy",
      "Group therapy and peer support",
      "Healthy relationships and boundaries education",
      "Safety planning and risk management"
    ],
    targetAudience: "Young people who have experienced child sexual exploitation or who display harmful sexual behaviours, requiring specialist therapeutic intervention in a safe environment.",
    qualifications: "Our team includes therapists specialized in sexual trauma, CSE, and HSB, trained in evidence-based therapeutic modalities including trauma-focused CBT and attachment-based interventions.",
    outcomes: [
      "Recovery from trauma and reduced PTSD symptoms",
      "Development of healthy relationship understanding",
      "Improved boundaries and consent awareness",
      "Reduced risk of re-exploitation or harmful behaviours",
      "Enhanced self-esteem and identity formation"
    ],
    color: "secondary",
    delay: "0.4s",
  },
];

const ServiceCard = ({ service, index, isVisible, spiralDelay, onClick }: any) => {
  const tiltRef = useTilt(8);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateZ: -10 }}
      animate={isVisible ? { 
        opacity: 1, 
        scale: 1, 
        rotateZ: 0,
        transition: {
          duration: 0.6,
          delay: spiralDelay,
          ease: [0.34, 1.56, 0.64, 1]
        }
      } : {}}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div 
        ref={tiltRef}
        className="h-full bg-white rounded-3xl p-8 shadow-lg hover:shadow-[var(--shadow-glow)] transition-all duration-500 border border-transparent hover:border-primary/30 hover:scale-[1.02]"
        style={{ 
          transformStyle: 'preserve-3d',
          transition: 'transform 0.3s ease-out'
        }}
      >
        {/* Icon with 3D effect */}
        <div 
          className={`w-16 h-16 bg-${service.color}/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
          style={{ transform: 'translateZ(30px)' }}
        >
          <service.icon className={`w-8 h-8 text-${service.color}`} />
        </div>

        {/* Content */}
        <h3 
          className="text-2xl font-display font-bold mb-4 group-hover:text-primary transition-colors"
          style={{ transform: 'translateZ(20px)' }}
        >
          {service.title}
        </h3>
        
        <p 
          className="text-foreground/70 leading-relaxed mb-4"
          style={{ transform: 'translateZ(10px)' }}
        >
          {service.description}
        </p>

        {/* Learn More Indicator */}
        <div className="flex items-center gap-2 text-primary font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>Learn More</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>

        {/* Hover Effect Bar */}
        <div className="mt-6 h-1 w-0 bg-gradient-to-r from-primary to-secondary rounded-full group-hover:w-full transition-all duration-500" />
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleServiceClick = (service: typeof services[0]) => {
    setSelectedService(service);
    setModalOpen(true);
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header with 3D Transform */}
        <ScrollTransform3D
          rotateX={[15, 0]}
          y={[100, 0]}
          opacity={[0, 1]}
          scrollRange={[0, 0.3]}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-block px-6 py-2 glass-effect-premium rounded-full mb-6 glass-shimmer">
            <span className="text-primary font-semibold text-sm">Our Services</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">
            Comprehensive Support for{" "}
            <span className="text-gradient">Every Need</span>
          </h2>
          
          <p className="text-xl text-foreground/80 leading-relaxed">
            A complete multi-disciplinary service where therapeutic, clinical, and 
            educational specialists work together
          </p>
        </ScrollTransform3D>

        {/* 3D Rotating Card Gallery - Desktop Only */}
        {!isMobile && (
          <div className="mb-20">
            <RotatingCardGallery 
              cards={services}
              autoRotate={true}
              rotationInterval={4000}
            />
          </div>
        )}

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            const spiralDelay = 0.1 + (index * 0.15);
            
            // Use 3D transforms only on desktop
            if (isMobile) {
              return (
                <ServiceCard
                  key={index}
                  service={service}
                  index={index}
                  isVisible={isVisible}
                  spiralDelay={spiralDelay}
                  onClick={() => handleServiceClick(service)}
                />
              );
            }
            
            return (
              <ScrollTransform3D
                key={index}
                rotateY={[index % 2 === 0 ? -15 : 15, 0]}
                scale={[0.8, 1]}
                opacity={[0, 1]}
                scrollRange={[0, 0.5]}
              >
                <ServiceCard
                  service={service}
                  index={index}
                  isVisible={isVisible}
                  spiralDelay={spiralDelay}
                  onClick={() => handleServiceClick(service)}
                />
              </ScrollTransform3D>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-20 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
             style={{ animationDelay: "0.6s" }}>
          <p className="text-lg text-foreground/80 mb-6">
            Want to learn more about how we can support your young person?
          </p>
          <button className="bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            Contact Our Team
          </button>
        </div>
      </div>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </section>
  );
};

export default ServicesSection;
