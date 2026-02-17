"use client";

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Elegant scroll progress indicator
 * Shows reading progress with smooth physics-based animation
 * Fixed to top of viewport, doesn't interfere with navigation
 */
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-[9999] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))',
        boxShadow: '0 0 12px rgba(201, 169, 110, 0.4)',
      }}
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={Math.round(scrollYProgress.get() * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
};

/**
 * Circular scroll progress indicator
 * Alternative design for bottom-right corner
 */
export const CircularScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const size = 60;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50 hidden lg:flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      role="progressbar"
      aria-label={`Page scroll progress: ${Math.round(scrollYProgress.get() * 100)}%`}
      aria-valuenow={Math.round(scrollYProgress.get() * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg width={size} height={size} className="transform -rotate-90" aria-hidden="true">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--border-primary)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{
            strokeDashoffset: pathLength.get() === 0 ? circumference : 0,
            pathLength,
          }}
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent-primary)" />
            <stop offset="100%" stopColor="var(--accent-secondary)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Percentage text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: useSpring(scrollYProgress, { stiffness: 100, damping: 30 }) }}
      >
        <span className="text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
          {Math.round(scrollYProgress.get() * 100)}%
        </span>
      </motion.div>
    </motion.div>
  );
};

/**
 * Section progress indicator with labels
 * Shows which section user is currently reading
 */
interface SectionProgressProps {
  sections: Array<{ id: string; label: string }>;
}

export const SectionProgress = ({ sections }: SectionProgressProps) => {
  const { scrollYProgress } = useScroll();

  return (
    <nav
      className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden xl:block"
      aria-label="Section navigation"
    >
      <div className="relative flex flex-col gap-4">
        {sections.map((section, index) => {
          const sectionProgress = index / (sections.length - 1);
          const isActive = scrollYProgress.get() >= sectionProgress - 0.1 &&
                          scrollYProgress.get() < sectionProgress + 0.1;

          return (
            <motion.a
              key={section.id}
              href={`#${section.id}`}
              className="group flex items-center gap-3"
              whileHover={{ x: 4 }}
              aria-label={`Navigate to ${section.label} section`}
              aria-current={isActive ? 'location' : undefined}
            >
              <motion.div
                className="w-2 h-2 rounded-full border-2"
                style={{
                  borderColor: 'var(--accent-primary)',
                  backgroundColor: isActive ? 'var(--accent-primary)' : 'transparent',
                }}
                animate={{
                  scale: isActive ? 1.5 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="text-sm font-medium text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors whitespace-nowrap"
                initial={{ opacity: 0, x: -10 }}
                animate={{
                  opacity: isActive ? 1 : 0.5,
                  x: 0,
                }}
              >
                {section.label}
              </motion.span>
            </motion.a>
          );
        })}
      </div>
    </nav>
  );
};
