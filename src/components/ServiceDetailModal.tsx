import { LucideIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface ServiceDetail {
  icon: LucideIcon;
  title: string;
  description: string;
  fullDescription: string;
  features: string[];
  targetAudience: string;
  qualifications: string;
  outcomes: string[];
  color: string;
}

interface ServiceDetailModalProps {
  service: ServiceDetail | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ServiceDetailModal = ({ service, open, onOpenChange }: ServiceDetailModalProps) => {
  if (!service) return null;

  const Icon = service.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto glass-effect-premium border-primary/20">
        <DialogHeader>
          <div className="flex items-start gap-6 mb-4">
            <div 
              className={`w-20 h-20 bg-${service.color}/10 rounded-2xl flex items-center justify-center flex-shrink-0`}
            >
              <Icon className={`w-10 h-10 text-${service.color}`} />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-3xl font-display font-bold mb-2">
                {service.title}
              </DialogTitle>
              <DialogDescription className="text-lg text-foreground/70">
                {service.description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-8 py-4">
          {/* Full Description */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-primary">About This Service</h3>
            <p className="text-foreground/80 leading-relaxed whitespace-pre-line">
              {service.fullDescription}
            </p>
          </div>

          {/* Key Features */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-primary">Key Features</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-background/50">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground/80">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Target Audience */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-primary">Who This Is For</h3>
            <p className="text-foreground/80 leading-relaxed">{service.targetAudience}</p>
          </div>

          {/* Staff Qualifications */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-primary">Our Team</h3>
            <p className="text-foreground/80 leading-relaxed">{service.qualifications}</p>
          </div>

          {/* Expected Outcomes */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-primary">Expected Outcomes</h3>
            <div className="space-y-2">
              {service.outcomes.map((outcome, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5">
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                  <span className="text-foreground/80">{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
          <Button 
            className="flex-1 bg-primary hover:bg-primary/90 text-white"
            size="lg"
            onClick={() => {
              // Scroll to contact section
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              onOpenChange(false);
            }}
          >
            Contact Us About This Service
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDetailModal;
