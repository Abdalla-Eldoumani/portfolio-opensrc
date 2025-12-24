"use client";

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface SectionTransitionProps {
  children: ReactNode;
  className?: string;
  transitionType?: 'fade' | 'slide' | 'scale' | 'reveal';
}

/**
 * Smooth section transitions as user scrolls
 * Creates cinematic progression through portfolio
 */
export const SectionTransition = ({
  children,
  className = '',
  transitionType = 'fade',
}: SectionTransitionProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Hooks must be called unconditionally at the component level
  const fadeOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const slideOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const slideY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);

  const scaleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scaleValue = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.3],
    ['inset(0 0 100% 0)', 'inset(0 0 0% 0)']
  );

  // Select appropriate style based on transition type
  const getTransitionStyles = () => {
    switch (transitionType) {
      case 'fade':
        return { opacity: fadeOpacity };
      case 'slide':
        return { opacity: slideOpacity, y: slideY };
      case 'scale':
        return { opacity: scaleOpacity, scale: scaleValue };
      case 'reveal':
        return { clipPath };
      default:
        return {};
    }
  };

  return (
    <motion.div
      ref={ref}
      style={getTransitionStyles()}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Staggered reveal for child elements
 * Animates children sequentially as section enters viewport
 */
export const StaggeredReveal = ({
  children,
  className = '',
  staggerDelay = 0.1,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children) ? (
        children.map((child, index) => {
          // Create individual child component to properly use hooks
          return (
            <StaggeredChild
              key={index}
              scrollYProgress={scrollYProgress}
              index={index}
              staggerDelay={staggerDelay}
            >
              {child}
            </StaggeredChild>
          );
        })
      ) : (
        <SingleChild scrollYProgress={scrollYProgress}>
          {children}
        </SingleChild>
      )}
    </div>
  );
};

// Helper component for staggered children
const StaggeredChild = ({
  children,
  scrollYProgress,
  index,
  staggerDelay,
}: {
  children: ReactNode;
  scrollYProgress: MotionValue<number>;
  index: number;
  staggerDelay: number;
}) => {
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5 + (index * staggerDelay)],
    [0, 1]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.5 + (index * staggerDelay)],
    [20, 0]
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} style={{ opacity, y }}>
      {children}
    </motion.div>
  );
};

// Helper component for single child
const SingleChild = ({
  children,
  scrollYProgress,
}: {
  children: ReactNode;
  scrollYProgress: MotionValue<number>;
}) => {
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [20, 0]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} style={{ opacity, y }}>
      {children}
    </motion.div>
  );
};

/**
 * Pinned section - stays in place while content scrolls over it
 * Creates dramatic "scene change" effect
 */
export const PinnedSection = ({
  children,
  className = '',
  pinDuration = 1,
}: {
  children: ReactNode;
  className?: string;
  pinDuration?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, pinDuration - 0.1, pinDuration],
    [0, 1, 1, 0]
  );

  return (
    <div ref={ref} style={{ height: `${pinDuration * 100}vh` }}>
      <motion.div
        className={`sticky top-0 ${className}`}
        style={{ opacity }}
      >
        {children}
      </motion.div>
    </div>
  );
};

/**
 * Horizontal scroll section
 * Scrolls content horizontally as user scrolls vertically
 */
export const HorizontalScroll = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-100%']);

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        style={{ x }}
        className={`flex gap-8 ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
};

/**
 * Background blur transition
 * Blurs background as section enters viewport
 */
export const BlurTransition = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const blur = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [10, 0, 0, 10]
  );

  return (
    <motion.div
      ref={ref}
      style={{
        filter: blur.get() > 0 ? `blur(${blur}px)` : 'none',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
