import { SpringConfig, MotionVariant, AnimationConfig } from '@/lib/types/portfolio';

/**
 * Centralized animation configurations for consistent motion design
 * Swiss design principle: purposeful, refined motion with consistent timing
 */

// Spring physics presets
export const springPresets: Record<string, SpringConfig> = {
  // Default spring for smooth, natural motion
  default: {
    damping: 20,
    stiffness: 300,
    mass: 0.5
  },

  // Magnetic effects (buttons, cards)
  magnetic: {
    damping: 20,
    stiffness: 300,
    mass: 0.5
  },

  // Gentle, smooth animations
  gentle: {
    damping: 25,
    stiffness: 200,
    mass: 0.8
  },

  // Snappy, responsive feedback
  snappy: {
    damping: 15,
    stiffness: 400,
    mass: 0.3
  },

  // Bouncy, playful effect (use sparingly)
  bouncy: {
    damping: 10,
    stiffness: 300,
    mass: 0.5
  }
};

// Easing curves for cubic-bezier transitions
export const easingCurves = {
  // Default ease in-out (smooth, natural)
  easeInOut: [0.4, 0, 0.2, 1] as [number, number, number, number],

  // Bouncy effect for hover states
  bounce: [0.34, 1.56, 0.64, 1] as [number, number, number, number],

  // Ease out (deceleration)
  easeOut: [0, 0, 0.2, 1] as [number, number, number, number],

  // Ease in (acceleration)
  easeIn: [0.4, 0, 1, 1] as [number, number, number, number],

  // Smooth, precise (Swiss-inspired)
  smooth: [0.25, 0.1, 0.25, 1] as [number, number, number, number],

  // Smooth deceleration for entrances
  smoothDecel: [0.16, 1, 0.3, 1] as [number, number, number, number],

  // Snappy, immediate response
  snappy: [0.5, 0.01, 0, 1] as [number, number, number, number]
};

// Duration constants (in seconds)
export const durations = {
  instant: 0.1,
  fast: 0.2,
  base: 0.3,
  moderate: 0.5,
  slow: 0.8,
  slower: 1.2,
  ambient: 12 // For background animations
};

// Common motion variants
export const motionVariants: Record<string, { hidden: Record<string, unknown>; visible: Record<string, unknown> }> = {
  // Fade in from transparent
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },

  // Slide up with fade
  slideUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  },

  // Slide down with fade
  slideDown: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 }
  },

  // Slide from left
  slideLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  },

  // Slide from right
  slideRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  },

  // Scale in
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  },

  // Swiss entrance (rotation + scale + blur)
  swissEntrance: {
    hidden: {
      opacity: 0,
      y: 20,
      rotate: -1,
      scale: 0.98
    },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      scale: 1
    }
  }
};

// Stagger configurations for list animations
export const staggerConfigs = {
  // Quick stagger for skill badges
  quick: {
    staggerChildren: 0.05,
    delayChildren: 0
  },

  // Medium stagger for cards
  medium: {
    staggerChildren: 0.1,
    delayChildren: 0.1
  },

  // Slow stagger for sections
  slow: {
    staggerChildren: 0.2,
    delayChildren: 0.2
  }
};

// Animation configuration presets
export const animationConfigs: Record<string, AnimationConfig> = {
  // Quick micro-interaction
  microInteraction: {
    duration: durations.fast,
    ease: easingCurves.snappy
  },

  // Standard transition
  standard: {
    duration: durations.base,
    ease: easingCurves.easeInOut
  },

  // Smooth entrance
  entrance: {
    duration: durations.moderate,
    ease: easingCurves.easeOut
  },

  // Bouncy hover
  hover: {
    duration: durations.base,
    ease: easingCurves.bounce
  },

  // Slow, deliberate motion
  deliberate: {
    duration: durations.slow,
    ease: easingCurves.smooth
  }
};

// Scroll reveal configuration
export const scrollRevealConfig = {
  viewport: {
    once: true, // Changed from false for better performance
    amount: 0.2 // Trigger when 20% visible
  },
  transition: {
    duration: durations.moderate,
    ease: easingCurves.easeOut
  }
};

// Hover lift effect (cards, buttons)
export const hoverLift = {
  scale: 1.02,
  y: -4,
  transition: {
    duration: durations.base,
    ease: easingCurves.easeOut
  }
};

// Press effect (buttons)
export const pressEffect = {
  scale: 0.98,
  transition: {
    duration: durations.instant,
    ease: easingCurves.snappy
  }
};

// Magnetic pull parameters
export const magneticParams = {
  strength: 0.3, // Default magnetic strength
  maxDistance: 100, // Maximum distance for magnetic effect
  damping: 20,
  stiffness: 300
};

// Helper function to create staggered children animation
export const createStaggerVariant = (staggerDelay: number = 0.05) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.1
    }
  }
});

// Helper function for scroll-triggered animation
export const createScrollAnimation = (
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  distance: number = 30
) => {
  const getOffset = () => {
    switch (direction) {
      case 'up': return { y: distance };
      case 'down': return { y: -distance };
      case 'left': return { x: distance };
      case 'right': return { x: -distance };
    }
  };

  return {
    initial: { opacity: 0, ...getOffset() },
    whileInView: { opacity: 1, y: 0, x: 0 },
    viewport: scrollRevealConfig.viewport,
    transition: scrollRevealConfig.transition
  };
};
