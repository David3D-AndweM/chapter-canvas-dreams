import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useMagnetic } from "@/hooks/use-magnetic";
import { Glow, Magnetic } from "./MicroInteractions";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const magneticRef = useMagnetic(0.2);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Approach", href: "#approach" },
    { label: "Values", href: "#values" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-8 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent origin-left z-[60]"
        style={{ scaleX }}
      />
      
      <nav
        className={`fixed top-8 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass-effect-premium border-b border-white/30 shadow-xl py-4"
            : "bg-primary py-6"
        }`}
      >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center space-x-3 group">
            <Glow>
              <div className="w-12 h-12 rounded-2xl glass-effect-frosted flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 glass-shimmer">
                <span className={`text-2xl font-display font-bold ${isScrolled ? 'text-primary' : 'text-white'}`}>D</span>
              </div>
            </Glow>
            <motion.span 
              className={`text-2xl font-display font-bold ${isScrolled ? 'text-primary' : 'text-white'}`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Dream Path
            </motion.span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                className={`px-5 py-2 ${isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/90 hover:text-white'} font-medium rounded-xl hover:bg-white/10 transition-all duration-300`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Magnetic>
              <Button
                ref={magneticRef as any}
                className={`${isScrolled ? 'bg-primary text-white' : 'bg-white text-primary'} hover:bg-opacity-90 font-semibold px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                Get in Touch
              </Button>
            </Magnetic>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 ${isScrolled ? 'text-primary' : 'text-white'}`}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-6 space-y-2 pb-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 ${isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/90 hover:text-white'} hover:bg-white/10 rounded-xl transition-all duration-300`}
              >
                {item.label}
              </a>
            ))}
            <Button className={`w-full ${isScrolled ? 'bg-primary text-white' : 'bg-white text-primary'} hover:bg-opacity-90 font-semibold mt-4`}>
              Get in Touch
            </Button>
          </div>
        )}
      </div>
    </nav>
    </>
  );
};

export default Navigation;
