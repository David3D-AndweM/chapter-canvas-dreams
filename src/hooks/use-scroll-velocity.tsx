import { useEffect, useState, useRef } from 'react';
import { useScroll, useSpring, useTransform } from 'framer-motion';

export const useScrollVelocity = () => {
  const [velocity, setVelocity] = useState(0);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      const now = Date.now();
      const timeDiff = now - lastTime.current;
      const scrollDiff = latest - lastScrollY.current;
      
      if (timeDiff > 0) {
        const newVelocity = Math.abs(scrollDiff / timeDiff);
        setVelocity(newVelocity);
      }
      
      lastScrollY.current = latest;
      lastTime.current = now;
    });

    return () => unsubscribe();
  }, [scrollY]);

  return velocity;
};

export const useVelocityScale = () => {
  const velocity = useScrollVelocity();
  const { scrollY } = useScroll();
  
  const scale = useTransform(
    scrollY,
    [0, 100],
    [1, 1 + (velocity * 0.1)]
  );
  
  const smoothScale = useSpring(scale, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return { scale: smoothScale, velocity };
};
