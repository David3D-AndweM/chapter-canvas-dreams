import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

const ParticleSystem = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      // Create particles on mouse move
      const colors = ['hsl(0 79% 60%)', 'hsl(186 63% 78%)', 'hsl(330 100% 93%)'];
      for (let i = 0; i < 2; i++) {
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 1,
          maxLife: Math.random() * 60 + 40,
          size: Math.random() * 4 + 2,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
      
      // Start animation if not running
      startAnimation();
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop with throttling
    const animate = (currentTime: number) => {
      // Throttle to ~30fps
      const deltaTime = currentTime - lastTimeRef.current;
      if (deltaTime < 33) {
        if (particlesRef.current.length > 0) {
          animationRef.current = requestAnimationFrame(animate);
        }
        return;
      }
      lastTimeRef.current = currentTime;

      // Stop if no particles
      if (particlesRef.current.length === 0) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = undefined;
        }
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;
        
        const alpha = 1 - (particle.life / particle.maxLife);
        
        if (alpha > 0) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = particle.color.replace(')', ` / ${alpha})`);
          ctx.fill();
          return true;
        }
        return false;
      });

      // Limit particle count
      if (particlesRef.current.length > 200) {
        particlesRef.current = particlesRef.current.slice(-200);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation only when particles are created
    const startAnimation = () => {
      if (!animationRef.current && particlesRef.current.length > 0) {
        lastTimeRef.current = performance.now();
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default ParticleSystem;
