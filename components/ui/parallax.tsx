"use client";

import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ParallaxProps {
  children: ReactNode;
  speed?: number; // -1 to 1, negative = faster, positive = slower
  className?: string;
  direction?: 'vertical' | 'horizontal' | 'both';
}

/**
 * Parallax wrapper component
 * Creates smooth depth effect by moving elements at different speeds
 * Uses Framer Motion for optimized transforms
 *
 * @param speed - Parallax intensity (-1 to 1)
 *   - Negative values: Element moves faster than scroll (background effect)
 *   - Positive values: Element moves slower than scroll (foreground effect)
 *   - 0: No parallax
 */
export const Parallax = ({
  children,
  speed = -0.5,
  className = '',
  direction = 'vertical',
}: ParallaxProps) => {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Smooth spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Calculate transform values
  const y = useTransform(smoothProgress, [0, 1], ['0%', `${speed * 100}%`]);
  const x = useTransform(smoothProgress, [0, 1], ['0%', `${speed * 100}%`]);

  // Skip parallax for reduced motion
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const transform = direction === 'vertical'
    ? { y }
    : direction === 'horizontal'
    ? { x }
    : { x, y };

  return (
    <motion.div
      ref={ref}
      style={transform}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface ParallaxLayerProps {
  children: ReactNode;
  depth: number; // 0-1, where 0 is background and 1 is foreground
  className?: string;
}

/**
 * Layered parallax component for multi-depth effects
 * Automatically calculates speed based on depth
 */
export const ParallaxLayer = ({
  children,
  depth,
  className = '',
}: ParallaxLayerProps) => {
  // Convert depth (0-1) to speed (-1 to 0)
  // Background layers (depth=0) move faster, foreground (depth=1) barely moves
  const speed = -(1 - depth) * 0.5;

  return (
    <Parallax speed={speed} className={className}>
      {children}
    </Parallax>
  );
};

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  offset?: number; // Offset in pixels for fine-tuning
}

/**
 * Section with built-in parallax effect
 * Great for creating depth in hero sections
 */
export const ParallaxSection = ({
  children,
  className = '',
  offset = 0,
}: ParallaxSectionProps) => {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [offset, offset + 200]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 0.8, 0]
  );

  if (prefersReducedMotion) {
    return <section className={className}>{children}</section>;
  }

  return (
    <motion.section
      ref={ref}
      style={{ y, opacity }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  once?: boolean;
}

/**
 * Reveal element on scroll into view
 * Combines with parallax for sophisticated animations
 */
export const ScrollReveal = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  once = true,
}: ScrollRevealProps) => {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: 50, x: 0 };
      case 'down':
        return { y: -50, x: 0 };
      case 'left':
        return { y: 0, x: 50 };
      case 'right':
        return { y: 0, x: -50 };
    }
  };

  const initial = getInitialPosition();

  const y = useTransform(scrollYProgress, [0, 1], [initial.y, 0]);
  const x = useTransform(scrollYProgress, [0, 1], [initial.x, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ y, x, opacity }}
      transition={{
        delay,
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
