import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import BentoServicesSection from "@/components/BentoServicesSection";
import ValuesSection from "@/components/ValuesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import VideoSection from "@/components/VideoSection";
import LeadershipSection from "@/components/LeadershipSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ParticleSystem from "@/components/ParticleSystem";

const Index = () => {
  return (
    <div className="min-h-screen">
      <ParticleSystem />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <BentoServicesSection />
        <ValuesSection />
        <TestimonialsSection />
        <VideoSection />
        <LeadershipSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
