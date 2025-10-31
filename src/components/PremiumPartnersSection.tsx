import { useState } from "react";
import teamteachLogo from "@/assets/partners/teamteach.png";
import childProtectionLogo from "@/assets/partners/child-protection.png";
import stJohnLogo from "@/assets/partners/st-john-ambulance.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Partner {
  name: string;
  logo: string;
  description: string;
  detailedDescription: string;
  url: string;
  altText: string;
  width: number;
  height: number;
}

const partners: Partner[] = [
  {
    name: "Team Teach",
    logo: teamteachLogo,
    description: "Positive Behaviour Management Training - Evidence-based de-escalation and restrictive physical intervention training",
    detailedDescription: "All our staff take part in Team Teach training to help us respond to children with empathy, patience, and understanding. Most of the training focuses on calm, positive approaches to manage behaviour, with physical intervention only ever used as a last resort to keep everyone safe.\n\nWe know that behaviour is often a way of showing feelings or unmet needs, so our team is trained to listen, de-escalate, and support each child with care. This approach makes sure children feel respected, safe, and understood, while also helping us create a nurturing environment where they can thrive.",
    url: "https://www.teamteach.co.uk",
    altText: "TeamTeach positive behaviour management training accreditation logo",
    width: 200,
    height: 80,
  },
  {
    name: "St John Ambulance",
    logo: stJohnLogo,
    description: "First Aid Training & Certification - Professional emergency first aid and medical response training",
    detailedDescription: "At Dream Paths Care Services, we ensure all staff are trained in emergency first aid so they are fully prepared to respond quickly, calmly, and confidently in urgent situations. While many incidents may only require comfort and reassurance, our team is also equipped to recognise when immediate medical attention or emergency intervention is needed.\n\nThis readiness to act decisively and compassionately helps secure the best possible outcomes for the children and young people in our care, giving families and professionals confidence that safety is always our priority.",
    url: "https://www.sja.org.uk",
    altText: "St John Ambulance first aid training certification logo",
    width: 200,
    height: 80,
  },
  {
    name: "Child Protection Training UK",
    logo: childProtectionLogo,
    description: "Safeguarding & Child Protection Training - Comprehensive child safety and safeguarding certification",
    detailedDescription: "At Dream Paths Care Services, safeguarding is at the heart of everything we do. Our mission is to protect young people from harm, exploitation, and abuse, while creating a safe and nurturing environment where they can grow and thrive.\n\nThrough specialist training, our staff are equipped to recognise signs of vulnerability early and take proactive steps to reduce risks. In situations involving child exploitation, our safeguarding protocols ensure timely support and protection for young people—while also contributing to the prevention of further harm.\n\nThis commitment ensures that every child in our care receives the safety, respect, and opportunities they deserve.",
    url: "https://www.childprotectioncompany.com",
    altText: "Child Protection Training UK safeguarding accreditation logo",
    width: 200,
    height: 80,
  },
];

const PartnerCard = ({ partner }: { partner: Partner }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <figure
          className="relative flex-shrink-0 w-[280px] md:w-[320px] h-[180px] md:h-[200px] cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          itemScope
          itemType="https://schema.org/Organization"
        >
          <div className="relative h-full bg-card border border-border rounded-2xl p-8 flex flex-col items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={partner.logo}
                alt={partner.altText}
                title={partner.name}
                width={partner.width}
                height={partner.height}
                loading="eager"
                itemProp="logo"
                className="premium-partner-logo max-w-full max-h-full object-contain transition-all duration-500 grayscale hover:grayscale-0 opacity-60 hover:opacity-100"
              />
              <meta itemProp="name" content={partner.name} />
              <meta itemProp="url" content={partner.url} />
            </div>

            {isHovered && (
              <figcaption className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm whitespace-nowrap pointer-events-none animate-in fade-in slide-in-from-top-2 duration-300 z-20">
                Click for more info
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rotate-45" />
              </figcaption>
            )}
          </div>
        </figure>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-4">
            <img
              src={partner.logo}
              alt={partner.altText}
              className="w-24 h-24 object-contain"
            />
            <div>
              <DialogTitle className="text-2xl">{partner.name}</DialogTitle>
              <DialogDescription className="text-base mt-1">
                {partner.description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="mt-6 space-y-4">
          {partner.detailedDescription.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-foreground/80 leading-relaxed">
              {paragraph}
            </p>
          ))}
          <div className="pt-4 mt-6 border-t border-border">
            <a
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Visit {partner.name} website
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const PremiumPartnersSection = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Dream Path Care Services",
    "url": "https://dreampathcare.co.uk",
    "logo": "https://dreampathcare.co.uk/dreampath-logo.png",
    "partner": partners.map(partner => ({
      "@type": "Organization",
      "name": partner.name,
      "url": partner.url,
      "description": partner.description
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
    </>
  );
};

export default PremiumPartnersSection;
