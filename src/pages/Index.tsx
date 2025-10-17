import { lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import SkeletonLoader from "@/components/SkeletonLoader";
import DemoBanner from "@/components/DemoBanner";

// Lazy load heavy and decorative components for better performance
const ParticleSystem = lazy(() => import("@/components/ParticleSystem"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const BentoServicesSection = lazy(() => import("@/components/BentoServicesSection"));
const ValuesSection = lazy(() => import("@/components/ValuesSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const VideoSection = lazy(() => import("@/components/VideoSection"));
const LeadershipSection = lazy(() => import("@/components/LeadershipSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const PremiumPartnersSection = lazy(() => import("@/components/PremiumPartnersSection"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  return (
    <div className="min-h-screen">
      <DemoBanner />
      <Suspense fallback={null}>
        <ParticleSystem />
      </Suspense>
      <Navigation />
      <main>
        <HeroSection />
        
        <Suspense fallback={<SkeletonLoader className="min-h-screen" />}>
          <AboutSection />
        </Suspense>
        
        <Suspense fallback={<SkeletonLoader className="min-h-screen" />}>
          <BentoServicesSection />
        </Suspense>
        
        <Suspense fallback={<SkeletonLoader className="min-h-screen" />}>
          <ValuesSection />
        </Suspense>
        
        <Suspense fallback={<SkeletonLoader className="min-h-screen" />}>
          <TestimonialsSection />
        </Suspense>
        
        <Suspense fallback={<SkeletonLoader className="min-h-screen" />}>
          <VideoSection />
        </Suspense>
        
        <Suspense fallback={<SkeletonLoader className="min-h-screen" />}>
          <LeadershipSection />
        </Suspense>
        
        <Suspense fallback={<SkeletonLoader className="min-h-screen" />}>
          <ContactSection />
        </Suspense>
        
        <Suspense fallback={<SkeletonLoader className="min-h-screen" />}>
          <FAQSection />
        </Suspense>
      </main>
      
      <Suspense fallback={<SkeletonLoader className="min-h-[400px]" />}>
        <PremiumPartnersSection />
      </Suspense>
      
      <Suspense fallback={<SkeletonLoader className="min-h-[400px]" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
