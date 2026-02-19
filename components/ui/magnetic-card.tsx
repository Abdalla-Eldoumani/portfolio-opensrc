"use client";

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode, useRef, useState, useEffect } from 'react';

interface MagneticCardProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export const MagneticCard = ({ children, className = '', strength = 0.15 }: MagneticCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hasHover, setHasHover] = useState(true);

  useEffect(() => {
    setHasHover(window.matchMedia('(hover: hover)').matches);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-100, 100], [8, -8]);
  const rotateY = useTransform(springX, [-100, 100], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !hasHover) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // On touch devices, render without magnetic effects
  if (!hasHover) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
