import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

const VideoSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest > 0.3 && latest < 0.7 && !isPlaying) {
        video.play().catch(() => {});
        setIsPlaying(true);
      } else if ((latest <= 0.3 || latest >= 0.7) && isPlaying) {
        video.pause();
        setIsPlaying(false);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, isPlaying]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
  };

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-6">
        <motion.div 
          style={{ scale, opacity }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <div className="inline-block px-6 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-6">
              <span className="text-primary font-semibold text-sm">Our Facilities</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Experience <span className="text-gradient">Dream Path</span>
            </h2>
            
            <p className="text-xl text-foreground/80 leading-relaxed max-w-3xl mx-auto">
              Take a virtual tour of our therapeutic residential care homes
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
            {/* Video Element */}
            <video
              ref={videoRef}
              className="w-full aspect-video object-cover"
              loop
              muted
              playsInline
              poster="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&h=675&fit=crop"
            >
              <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
            </video>

            {/* Play/Pause Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer transition-opacity"
              onClick={togglePlay}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-primary" fill="currentColor" />
                ) : (
                  <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
                )}
              </motion.button>
            </motion.div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-center">
              <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                <p className="text-white text-sm">
                  {isPlaying ? '▶ Playing on scroll' : '⏸ Paused'}
                </p>
              </div>
            </div>
          </div>

          {/* Stats Below Video */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { label: 'Care Homes', value: '15+' },
              { label: 'Staff Members', value: '200+' },
              { label: 'Young People Supported', value: '500+' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center shadow-lg border border-primary/10"
              >
                <div className="text-4xl font-display font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-foreground/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;
