"use client";

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';

/**
 * Depth indicator - Visual cue showing page scroll depth
 * Creates sense of progression through content
 * Appears alongside scroll progress bar
 */
export const DepthIndicator = () => {
  const { scrollYProgress } = useScroll();

  // Create depth layers that activate at different scroll points
  const depths = [
    { threshold: 0, label: 'Start', color: 'from-cyan-500 to-blue-500' },
    { threshold: 0.25, label: 'About', color: 'from-blue-500 to-purple-500' },
    { threshold: 0.5, label: 'Skills', color: 'from-purple-500 to-pink-500' },
    { threshold: 0.75, label: 'Projects', color: 'from-pink-500 to-orange-500' },
    { threshold: 1, label: 'Contact', color: 'from-orange-500 to-red-500' },
  ];

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-3" aria-hidden="true">
      {depths.map((depth, index) => (
        <DepthDot
          key={depth.label}
          depth={depth}
          index={index}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
};

// Separate component to properly use hooks
const DepthDot = ({
  depth,
  index,
  scrollYProgress,
}: {
  depth: { threshold: number; label: string; color: string };
  index: number;
  scrollYProgress: MotionValue<number>;
}) => {
  const isActive = useTransform(
    scrollYProgress,
    (value: number) => value >= depth.threshold
  );

  return (
    <motion.div
      className="flex items-center gap-3 group"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      {/* Depth dot */}
      <motion.div
        className="relative w-3 h-3"
        whileHover={{ scale: 1.5 }}
      >
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2"
          style={{
            borderColor: 'var(--accent-primary)',
            opacity: isActive.get() ? 1 : 0.3,
          }}
          animate={{
            scale: isActive.get() ? [1, 1.2, 1] : 1,
          }}
          transition={{
            duration: 2,
            repeat: isActive.get() ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />

        {/* Inner dot */}
        <motion.div
          className={`absolute inset-0.5 rounded-full bg-gradient-to-r ${depth.color}`}
          style={{
            opacity: isActive.get() ? 1 : 0,
            scale: isActive.get() ? 1 : 0.5,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Label */}
      <motion.span
        className="text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          color: isActive.get() ? 'var(--text-primary)' : 'var(--text-muted)',
        }}
      >
        {depth.label}
      </motion.span>
    </motion.div>
  );
};

interface SectionDepthProps {
  sectionName: string;
  children: React.ReactNode;
}

/**
 * Wrapper for sections to add depth-aware animations
 * Fades and scales sections as they enter/exit viewport
 */
export const SectionDepth = ({ sectionName, children }: SectionDepthProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Subtle scale effect for depth
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.95, 1, 1, 0.95]
  );

  // Opacity fade at edges
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className="relative"
      data-section={sectionName}
    >
      {children}
    </motion.div>
  );
};

/**
 * Floating elements that respond to scroll
 * Creates atmospheric depth in backgrounds
 */
export const FloatingElement = ({
  children,
  speed = 0.5,
  rotate = true,
}: {
  children: React.ReactNode;
  speed?: number;
  rotate?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, speed * 200]
  );

  const rotation = useTransform(
    scrollYProgress,
    [0, 1],
    [0, rotate ? 360 * speed : 0]
  );

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        rotate: rotation,
      }}
      className="absolute"
    >
      {children}
    </motion.div>
  );
};
