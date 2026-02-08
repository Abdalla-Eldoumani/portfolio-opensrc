"use client";

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';
import { MagneticIconButton } from '@/components/ui/magnetic-button';

export const HeroSection = () => {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--primary-bg)' }}
    >
      {/* Subtle radial gradient for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 40%, rgba(201, 169, 110, 0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif font-bold mb-6"
          style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            color: 'var(--text-primary)',
          }}
        >
          Abdalla Eldoumani
          {/* Blinking cursor */}
          <motion.span
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ repeat: Infinity, duration: 1, times: [0, 0.5, 0.5, 1], ease: 'linear' }}
            className="inline-block ml-1"
            style={{ color: 'var(--accent-primary)' }}
            aria-hidden="true"
          >
            |
          </motion.span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-body text-xl sm:text-2xl max-w-2xl mx-auto mb-10"
          style={{ color: 'var(--text-secondary)', fontWeight: 300 }}
        >
          From registers to React. Building at every layer of the stack.
        </motion.p>

        {/* Status indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-3 mb-12"
        >
          {/* Primary status */}
          <div className="flex items-center gap-2">
            <span
              className="relative flex h-2.5 w-2.5"
            >
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: 'var(--accent-primary)' }}
              />
              <span
                className="relative inline-flex rounded-full h-2.5 w-2.5"
                style={{ backgroundColor: 'var(--accent-primary)' }}
              />
            </span>
            <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              Teaching Assistant @ University of Calgary
            </span>
          </div>

          {/* Secondary status */}
          <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Open to Summer 2026 Internships
          </span>
        </motion.div>

        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center space-x-6"
        >
          <MagneticIconButton
            icon={<Github size={24} />}
            ariaLabel="GitHub Profile"
            href="https://github.com/Abdalla-Eldoumani"
            target="_blank"
            strength={0.3}
            className="transition-colors duration-300"
            style={{ color: 'var(--text-muted)' }}
          />
          <MagneticIconButton
            icon={<Linkedin size={24} />}
            ariaLabel="LinkedIn Profile"
            href="https://www.linkedin.com/in/abdallaeldoumani/"
            target="_blank"
            strength={0.3}
            className="transition-colors duration-300"
            style={{ color: 'var(--text-muted)' }}
          />
          <MagneticIconButton
            icon={<Mail size={24} />}
            ariaLabel="Email Contact"
            href="mailto:aamsdoumani@gmail.com"
            target="_blank"
            strength={0.3}
            className="transition-colors duration-300"
            style={{ color: 'var(--text-muted)' }}
          />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center space-y-2" style={{ color: 'var(--text-muted)' }}>
          <span className="text-sm font-medium">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowDown size={20} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
