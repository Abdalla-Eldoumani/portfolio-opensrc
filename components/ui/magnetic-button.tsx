"use client";

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  strength?: number;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

/**
 * Magnetic button with sophisticated physics-based attraction
 * Creates premium, playful interaction that feels intentional
 * Strength controls magnetic pull (0.1 = subtle, 0.5 = strong)
 */
export const MagneticButton = ({
  children,
  strength = 0.3,
  className = '',
  onClick,
  disabled = false,
}: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);

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

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
      style={{
        x: springX,
        y: springY,
      }}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`relative ${className} ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
    >
      {children}
    </motion.button>
  );
};

/**
 * Magnetic icon button - perfect for social links and action buttons
 */
interface MagneticIconButtonProps {
  icon: ReactNode;
  ariaLabel: string;
  href?: string;
  target?: string;
  strength?: number;
  className?: string;
  onClick?: () => void;
}

export const MagneticIconButton = ({
  icon,
  ariaLabel,
  strength = 0.4,
  className = '',
  href,
  target,
  onClick,
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

  const Component = href ? motion.a : motion.div;

  return (
    <Component
      ref={ref as any}
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      onClick={onClick}
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
      className={`inline-flex items-center justify-center min-w-[44px] min-h-[44px] transition-colors ${className}`}
    >
      {icon}
    </Component>
  );
};
