import { motion, useInView } from "framer-motion";
import { useRef, useState, memo } from "react";
import teamteachLogo from "@/assets/partners/teamteach.png";
import childProtectionLogo from "@/assets/partners/child-protection.png";
import stJohnLogo from "@/assets/partners/st-john-ambulance.png";

interface Partner {
  name: string;
  logo: string;
  description: string;
  primaryColor: string;
}

const partners: Partner[] = [
  {
    name: "TeamTeach",
    logo: teamteachLogo,
    description: "Positive Behaviour Management Training",
    primaryColor: "120, 180, 80",
  },
  {
    name: "Child Protection Training UK",
    logo: childProtectionLogo,
    description: "Safeguarding & Child Protection Training",
    primaryColor: "255, 140, 0",
  },
  {
    name: "St John Ambulance",
    logo: stJohnLogo,
    description: "First Aid Training & Certification",
    primaryColor: "0, 0, 0",
  },
];

const PartnerCard = memo(({ partner }: { partner: Partner }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative flex-shrink-0 w-[280px] md:w-[320px] h-[180px] md:h-[200px]"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        scale: 1.05,
        y: -10,
      }}
      transition={{
        duration: 0.4,
        ease: [0.34, 1.56, 0.64, 1],
      }}
    >
      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none blur-xl"
        style={{
          background: isHovered
            ? `radial-gradient(circle, rgba(${partner.primaryColor}, 0.3) 0%, transparent 70%)`
            : "transparent",
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Card */}
      <div className="relative h-full bg-card/80 backdrop-blur-md border border-border rounded-2xl p-8 flex flex-col items-center justify-center gap-4 shadow-lg hover:shadow-2xl transition-shadow duration-500">
        {/* Logo Container */}
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.img
            src={partner.logo}
            alt={partner.name}
            className="max-w-full max-h-full object-contain"
            style={{
              filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
              opacity: isHovered ? 1 : 0.6,
            }}
            transition={{
              duration: 0.5,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          />
        </div>

        {/* Description Tooltip */}
        <motion.div
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm whitespace-nowrap pointer-events-none"
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : -10,
          }}
          transition={{ duration: 0.3 }}
        >
          {partner.description}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rotate-45" />
        </motion.div>
      </div>
    </motion.div>
  );
});

PartnerCard.displayName = "PartnerCard";

const PartnersSection = () => {
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  // Dynamic animation calculation
  const CARD_WIDTH = 320;
  const GAP = 48;
  const ANIMATION_DISTANCE = -(CARD_WIDTH + GAP) * partners.length;

  return (
    <section
      ref={ref}
      className="py-24 relative overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background"
      id="partners"
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="inline-block mb-4">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              Trusted Partners & Accreditations
            </span>
          </motion.div>
          
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            Working With{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            We collaborate with leading organizations to ensure our staff receive
            the highest quality training in safeguarding, behavior management, and
            emergency first aid. These partnerships enable us to deliver exceptional
            care that meets and exceeds industry standards.
          </motion.p>
        </motion.div>

        {/* Infinite Marquee */}
        <div className="relative">
          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-8 md:gap-12"
              style={{ willChange: 'transform' }}
              onHoverStart={() => setIsPaused(true)}
              onHoverEnd={() => setIsPaused(false)}
              animate={{
                x: prefersReducedMotion || isPaused ? 0 : [0, ANIMATION_DISTANCE],
              }}
              transition={{
                x: {
                  repeat: prefersReducedMotion || isPaused ? 0 : Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {/* Original Set */}
              {partners.map((partner, index) => (
                <PartnerCard key={`original-${index}`} partner={partner} />
              ))}
              {/* Duplicate Set for Seamless Loop */}
              {partners.map((partner, index) => (
                <PartnerCard key={`duplicate-${index}`} partner={partner} />
              ))}
              {/* Triple Set for Extra Smoothness */}
              {partners.map((partner, index) => (
                <PartnerCard key={`triple-${index}`} partner={partner} />
              ))}
            </motion.div>
          </div>

          {/* Fade Edges */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
        </div>

        {/* Hover to Pause Indicator */}
        <motion.p
          className="text-center text-sm text-muted-foreground mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 0.6 : 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Hover to pause
        </motion.p>
      </div>
    </section>
  );
};

export default PartnersSection;
