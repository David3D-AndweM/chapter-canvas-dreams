import { useState } from "react";
import teamteachLogo from "@/assets/partners/teamteach.png";
import childProtectionLogo from "@/assets/partners/child-protection.png";
import stJohnLogo from "@/assets/partners/st-john-ambulance.png";

interface Partner {
  name: string;
  logo: string;
  description: string;
}

const partners: Partner[] = [
  {
    name: "TeamTeach",
    logo: teamteachLogo,
    description: "Positive Behaviour Management Training",
  },
  {
    name: "Child Protection Training UK",
    logo: childProtectionLogo,
    description: "Safeguarding & Child Protection Training",
  },
  {
    name: "St John Ambulance",
    logo: stJohnLogo,
    description: "First Aid Training & Certification",
  },
];

const PartnerCard = ({ partner }: { partner: Partner }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex-shrink-0 w-[280px] md:w-[320px] h-[180px] md:h-[200px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full bg-card border border-border rounded-2xl p-8 flex flex-col items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={partner.logo}
            alt={partner.name}
            className="premium-partner-logo max-w-full max-h-full object-contain transition-all duration-500 grayscale hover:grayscale-0 opacity-60 hover:opacity-100"
          />
        </div>

        {isHovered && (
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm whitespace-nowrap pointer-events-none animate-in fade-in slide-in-from-top-2 duration-300">
            {partner.description}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rotate-45" />
          </div>
        )}
      </div>
    </div>
  );
};

const PremiumPartnersSection = () => {
  return (
    <section
      className="premium-partners py-24 relative overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background"
      id="partners"
      data-cursor="no-trail"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              Trusted Partners & Accreditations
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Working With{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We collaborate with leading organizations to ensure our staff receive
            the highest quality training in safeguarding, behavior management, and
            emergency first aid.
          </p>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden mask-fade group">
            <div className="flex gap-8 md:gap-12 transform-gpu will-change-transform [animation:partners-marquee_28s_linear_infinite] motion-reduce:animate-none group-hover:[animation-play-state:paused]">
              {partners.map((partner, index) => (
                <PartnerCard key={`original-${index}`} partner={partner} />
              ))}
              {partners.map((partner, index) => (
                <PartnerCard key={`duplicate-${index}`} partner={partner} />
              ))}
            </div>
          </div>

          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
        </div>

        <p className="text-center text-sm text-muted-foreground/60 mt-8">
          Hover to pause
        </p>
      </div>
    </section>
  );
};

export default PremiumPartnersSection;
