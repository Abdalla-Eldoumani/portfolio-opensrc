"use client";

import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useMousePosition, useMouseVelocity } from '@/hooks/use-mouse-position';

/**
 * Custom cursor component
 * Swiss precision aesthetic with subtle interactions
 * Desktop only - respects (hover: hover) media query
 *
 * Features:
 * - Context-aware cursor states (default, link, button, interactive)
 * - Subtle magnetic pull to interactive elements
 * - Particle trail on movement
 * - Smooth spring physics
 *
 * Usage: Add <CustomCursor /> to root layout
 */

interface Particle {
  id: number;
  x: number;
  y: number;
  opacity: number;
}

export const CustomCursor = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [cursorState, setCursorState] = useState<'default' | 'link' | 'button' | 'interactive'>('default');
  const [particles, setParticles] = useState<Particle[]>([]);
  const mousePosition = useMousePosition();
  const velocity = useMouseVelocity();

  // Spring physics for smooth cursor movement - faster, more responsive
  const cursorX = useSpring(useMotionValue(0), {
    damping: 15,
    stiffness: 500,
    mass: 0.2,
  });

  const cursorY = useSpring(useMotionValue(0), {
    damping: 15,
    stiffness: 500,
    mass: 0.2,
  });

  // Check if device supports hover (desktop)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkDesktop = () => {
      setIsDesktop(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Update cursor position
  useEffect(() => {
    cursorX.set(mousePosition.x);
    cursorY.set(mousePosition.y);
  }, [mousePosition, cursorX, cursorY]);

  // Detect hover states for context-aware cursor
  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check element type
      if (target.tagName === 'A') {
        setCursorState('link');
      } else if (target.tagName === 'BUTTON' || target.closest('button')) {
        setCursorState('button');
      } else if (
        target.classList.contains('interactive') ||
        target.classList.contains('hover-lift') ||
        target.classList.contains('magnetic-button')
      ) {
        setCursorState('interactive');
      } else {
        setCursorState('default');
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isDesktop]);

  // Particle trail effect (very subtle)
  useEffect(() => {
    if (!isDesktop || velocity.speed < 0.3) return;

    const interval = setInterval(() => {
      const newParticle: Particle = {
        id: Date.now(),
        x: mousePosition.x,
        y: mousePosition.y,
        opacity: 1,
      };

      setParticles((prev) => [...prev.slice(-8), newParticle]); // Keep last 8 particles
    }, 50); // Create particle every 50ms when moving

    return () => clearInterval(interval);
  }, [mousePosition, velocity, isDesktop]);

  // Fade out particles
  useEffect(() => {
    const fadeInterval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({ ...p, opacity: p.opacity - 0.1 }))
          .filter((p) => p.opacity > 0)
      );
    }, 50);

    return () => clearInterval(fadeInterval);
  }, []);

  // Don't render on touch devices
  if (!isDesktop) return null;

  // Cursor size based on state
  const cursorSize = {
    default: 12,
    link: 16,
    button: 20,
    interactive: 24,
  }[cursorState];

  const ringSize = {
    default: 36,
    link: 48,
    button: 56,
    interactive: 64,
  }[cursorState];

  return (
    <>
      {/* Hide default cursor */}
      <style jsx global>{`
        @media (hover: hover) and (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Particle trail */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
          style={{
            width: '4px',
            height: '4px',
            x: particle.x - 2,
            y: particle.y - 2,
            backgroundColor: 'var(--accent-primary)',
          }}
          initial={{ opacity: particle.opacity, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      ))}

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border-2 mix-blend-difference"
        style={{
          width: ringSize,
          height: ringSize,
          x: cursorX,
          y: cursorY,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
          borderColor: cursorState === 'default' ? 'rgba(255, 255, 255, 0.5)' : 'var(--accent-primary)',
        }}
        animate={{
          scale: cursorState === 'default' ? 1 : 1.1,
        }}
        transition={{
          type: 'spring',
          damping: 15,
          stiffness: 150,
        }}
      />

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          width: cursorSize,
          height: cursorSize,
          x: cursorX,
          y: cursorY,
          marginLeft: -cursorSize / 2,
          marginTop: -cursorSize / 2,
          backgroundColor: cursorState === 'default' ? 'rgba(255, 255, 255, 0.8)' : 'var(--accent-primary)',
        }}
        animate={{
          scale: cursorState === 'default' ? 1 : 0.8,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 300,
        }}
      />

      {/* Cursor label for buttons/links */}
      {cursorState !== 'default' && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999] text-xs font-medium px-2 py-1 rounded-full glass-effect"
          style={{
            x: cursorX,
            y: cursorY,
            marginLeft: 32,
            marginTop: -12,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          {cursorState === 'link' && 'View'}
          {cursorState === 'button' && 'Click'}
          {cursorState === 'interactive' && 'Explore'}
        </motion.div>
      )}
    </>
  );
};

/**
 * Lightweight cursor variant
 * Just the cursor without particle trail
 */
export const SimpleCursor = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const mousePosition = useMousePosition();

  const cursorX = useSpring(useMotionValue(0), {
    damping: 15,
    stiffness: 500,
    mass: 0.2,
  });

  const cursorY = useSpring(useMotionValue(0), {
    damping: 15,
    stiffness: 500,
    mass: 0.2,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setIsDesktop(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);

  useEffect(() => {
    cursorX.set(mousePosition.x);
    cursorY.set(mousePosition.y);
  }, [mousePosition, cursorX, cursorY]);

  if (!isDesktop) return null;

  return (
    <>
      <style jsx global>{`
        @media (hover: hover) and (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-3 h-3 rounded-full mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          marginLeft: -6,
          marginTop: -6,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
        }}
      />
    </>
  );
};
