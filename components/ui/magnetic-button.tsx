"use client";

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, ReactNode, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface MagneticButtonProps {
  children: ReactNode;
  strength?: number;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  hapticFeedback?: boolean;
}

interface Ripple {
  x: number;
  y: number;
  id: number;
}

/**
 * Magnetic button with sophisticated physics-based attraction
 * Creates premium, playful interaction that feels intentional
 * Strength controls magnetic pull (0.1 = subtle, 0.5 = strong)
 *
 * Features:
 * - Click ripple effect (Swiss-inspired, minimal)
 * - Haptic feedback on mobile devices
 * - Loading state with spinner
 * - Enhanced focus states
 */
export const MagneticButton = ({
  children,
  strength = 0.3,
  className = '',
  onClick,
  disabled = false,
  loading = false,
  hapticFeedback = true,
}: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Calculate magnetic pull based on distance
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    const maxDistance = Math.max(rect.width, rect.height) * 2;

    if (distance < maxDistance) {
      const pullStrength = 1 - distance / maxDistance;
      x.set(distanceX * strength * pullStrength);
      y.set(distanceY * strength * pullStrength);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current || disabled || loading) return;

    const rect = ref.current.getBoundingClientRect();
    const rippleX = e.clientX - rect.left;
    const rippleY = e.clientY - rect.top;

    const newRipple: Ripple = {
      x: rippleX,
      y: rippleY,
      id: Date.now(),
    };

    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  const triggerHapticFeedback = () => {
    if (!hapticFeedback) return;

    // Check if vibration API is supported
    if ('vibrate' in navigator) {
      // Subtle single tap - 10ms
      navigator.vibrate(10);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;

    createRipple(e);
    triggerHapticFeedback();

    if (onClick) {
      onClick();
    }
  };

  const isDisabled = disabled || loading;

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      disabled={isDisabled}
      aria-busy={loading}
      aria-disabled={isDisabled}
      style={{
        x: springX,
        y: springY,
      }}
      whileHover={{ scale: isDisabled ? 1 : 1.02 }}
      whileTap={{ scale: isDisabled ? 1 : 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`relative overflow-hidden hover-glow ${className} ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
    >
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
          initial={{ width: 0, height: 0, opacity: 0.3, x: '-50%', y: '-50%' }}
          animate={{
            width: 200,
            height: 200,
            opacity: 0,
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}

      {/* Content with loading state */}
      <span className={`flex items-center justify-center gap-2 ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}>
        {children}
      </span>

      {/* Loading spinner */}
      {loading && (
        <motion.span
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Loader2 className="w-5 h-5 animate-spin" />
        </motion.span>
      )}

      {/* Enhanced focus ring */}
      <span className="absolute inset-0 rounded-[inherit] opacity-0 focus-visible:opacity-100 transition-opacity pointer-events-none ring-2 ring-offset-2 ring-cyan-500 ring-offset-gray-900" />
    </motion.button>
  );
};

/**
 * Magnetic icon button - perfect for social links and action buttons
 * Includes haptic feedback and enhanced focus states
 */
interface MagneticIconButtonProps {
  icon: ReactNode;
  ariaLabel: string;
  href?: string;
  target?: string;
  strength?: number;
  className?: string;
  onClick?: () => void;
  hapticFeedback?: boolean;
}

export const MagneticIconButton = ({
  icon,
  ariaLabel,
  strength = 0.4,
  className = '',
  href,
  target,
  onClick,
  hapticFeedback = true,
}: MagneticIconButtonProps) => {
  const ref = useRef<HTMLAnchorElement | HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotate = useTransform([x, y], ([latestX, latestY]) => {
    const rotateX = (latestY as number) * -0.05;
    const rotateY = (latestX as number) * 0.05;
    return `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  const triggerHapticFeedback = () => {
    if (!hapticFeedback) return;
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = (e: React.MouseEvent) => {
    triggerHapticFeedback();
    if (onClick) {
      onClick();
    }
  };

  const Component = href ? motion.a : motion.div;

  return (
    <Component
      ref={ref as React.Ref<HTMLAnchorElement & HTMLDivElement>}
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={ariaLabel}
      style={{
        x: springX,
        y: springY,
        transform: rotate,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`relative inline-flex items-center justify-center min-w-[44px] min-h-[44px] transition-colors ${className}`}
    >
      {icon}

      {/* Enhanced focus ring */}
      <span className="absolute inset-0 rounded-[inherit] opacity-0 focus-visible:opacity-100 transition-opacity pointer-events-none ring-2 ring-offset-2 ring-cyan-500 ring-offset-gray-900" />
    </Component>
  );
};
