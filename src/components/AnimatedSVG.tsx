import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const AnimatedSVG = () => {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true });
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    const path = ref.current?.querySelector('path');
    if (path) {
      const length = path.getTotalLength();
      setPathLength(length);
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
    }
  }, []);

  useEffect(() => {
    if (isInView && pathLength > 0) {
      const path = ref.current?.querySelector('path');
      if (path) {
        path.style.transition = 'stroke-dashoffset 3s ease-in-out';
        path.style.strokeDashoffset = '0';
      }
    }
  }, [isInView, pathLength]);

  return (
    <svg
      ref={ref}
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto"
    >
      <path
        d="M100 20 L180 60 L180 140 L100 180 L20 140 L20 60 Z"
        stroke="url(#gradient)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(0 79% 60%)" />
          <stop offset="50%" stopColor="hsl(186 63% 78%)" />
          <stop offset="100%" stopColor="hsl(330 100% 93%)" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default AnimatedSVG;
