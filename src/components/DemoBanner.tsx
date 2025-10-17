import { motion } from 'framer-motion';

const DemoBanner = () => {
  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const message = `${today} • Dream Path Services - Therapeutic Care Excellence • Ofsted Registered & Inspected • Trauma-Informed Care Specialists • TeamTeach Certified Staff • 24/7 Support Available • Info@dreampathservices.co.uk • Person-Centered Approach • Early intervention makes a lasting difference • Serving England & Wales • Free Consultations Available`;
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 backdrop-blur-md border-b border-primary/10 overflow-hidden">
      <div className="relative h-8 flex items-center">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{
            x: [0, -1000],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
        >
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-8 px-8 text-xs font-light tracking-wider text-foreground/60"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
            >
              {message.split(' • ').map((text, idx) => (
                <span key={idx} className="flex items-center gap-8">
                  {text}
                  {idx < message.split(' • ').length - 1 && (
                    <span className="w-1 h-1 rounded-full bg-primary/40" />
                  )}
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default DemoBanner;
