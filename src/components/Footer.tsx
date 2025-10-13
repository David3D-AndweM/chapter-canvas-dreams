import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Bounce } from "./MicroInteractions";

const Footer = () => {
  return (
    <footer className="bg-foreground text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Bounce>
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center">
                  <span className="text-2xl font-display font-bold text-white">D</span>
                </div>
              </Bounce>
              <motion.span 
                className="text-2xl font-display font-bold"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Dream Path
              </motion.span>
            </div>
            <motion.p 
              className="text-white/70 leading-relaxed mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Specialist therapeutic residential care for children and young people 
              across England and Wales.
            </motion.p>
            <motion.div 
              className="flex items-center space-x-2 text-white/80"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-primary fill-current" />
              </motion.div>
              <span>by</span>
              <a 
                href="https://davidmwape.netlify.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                David Mwape
              </a>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2">
              {["About", "Services", "Approach", "Values", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold mb-4 text-lg">Services</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-white/70">Therapeutic Care</li>
              <li className="text-white/70">Complex Needs</li>
              <li className="text-white/70">Forensic Services</li>
              <li className="text-white/70">Educational Support</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 text-center md:text-left">
          <div className="md:flex md:items-center md:justify-between">
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} Dream Path. All rights reserved.
            </p>
            <div className="flex items-center justify-center md:justify-end space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
