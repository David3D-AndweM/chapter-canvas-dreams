import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Blob configuration
    const blobs = [
      { 
        x: 0.2, 
        y: 0.3, 
        radius: 300, 
        color: 'hsla(0, 79%, 60%, 0.15)',
        speedX: 0.0003,
        speedY: 0.0002,
        phase: 0
      },
      { 
        x: 0.7, 
        y: 0.6, 
        radius: 350, 
        color: 'hsla(186, 63%, 78%, 0.12)',
        speedX: -0.0002,
        speedY: 0.0003,
        phase: Math.PI
      },
      { 
        x: 0.5, 
        y: 0.5, 
        radius: 400, 
        color: 'hsla(330, 100%, 93%, 0.1)',
        speedX: 0.0002,
        speedY: -0.0002,
        phase: Math.PI / 2
      }
    ];

    let time = 0;
    let heartbeatPhase = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;
      heartbeatPhase += 0.05;

      // Heartbeat effect: double pulse pattern
      const heartbeat = 
        Math.max(0, Math.sin(heartbeatPhase) * 0.3) + 
        Math.max(0, Math.sin(heartbeatPhase * 2) * 0.15) + 
        0.85;

      blobs.forEach((blob, index) => {
        // Liquid movement
        const newX = blob.x + Math.sin(time * blob.speedX * 100 + blob.phase) * 0.0005;
        const newY = blob.y + Math.cos(time * blob.speedY * 100 + blob.phase) * 0.0005;
        
        blob.x = newX;
        blob.y = newY;

        const x = blob.x * canvas.width;
        const y = blob.y * canvas.height;
        const radius = blob.radius * heartbeat;

        // Create radial gradient for each blob
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <>
      {/* Static gradient base */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-muted/20 pointer-events-none z-0" />
      
      {/* Animated liquid blobs */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ mixBlendMode: 'normal' }}
      />

      {/* Subtle animated gradient overlays */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 30% 50%, hsl(var(--primary) / 0.03) 0%, transparent 50%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 70% 50%, hsl(var(--accent) / 0.03) 0%, transparent 50%)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.8, 0.5, 0.8],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </>
  );
};

export default AnimatedBackground;
