// components/about.tsx
"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Download, MapPin, GraduationCap, Briefcase, Languages, Terminal } from 'lucide-react';
import { MagneticCard } from '@/components/ui/magnetic-card';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { motionVariants, animationConfigs } from '@/lib/constants/animations';

const highlights = [
  {
    icon: Terminal,
    title: "Systems Programmer",
    subtitle: "C/C++, Rust, ARMv8 Assembly",
    colorVar: '--highlight-1'
  },
  {
    icon: Briefcase,
    title: "Full-Stack Developer",
    subtitle: "TypeScript, React, Next.js, Node.js",
    colorVar: '--highlight-2'
  },
  {
    icon: GraduationCap,
    title: "Teaching Assistant",
    subtitle: "Computer Architecture @ UCalgary",
    colorVar: '--highlight-3'
  },
  {
    icon: Languages,
    title: "Multilingual",
    subtitle: "Fluent in Arabic & English",
    colorVar: '--highlight-4'
  }
];

export const About = () => {
  return (
    <section className="py-28" style={{ backgroundColor: 'var(--primary-bg)', color: 'var(--text-primary)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={motionVariants.scaleIn.hidden}
          whileInView={motionVariants.scaleIn.visible}
          transition={{ duration: 0.6, ease: animationConfigs.entrance.ease }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-display text-4xl sm:text-5xl mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-body text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Systems thinker turned web builder, teaching the next generation along the way.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-2" style={{ color: 'var(--text-secondary)' }}>
                <MapPin size={20} />
                <span>Calgary, Alberta, Canada</span>
              </div>

              <div className="space-y-4">
                <p className="text-body text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  I&apos;m <strong style={{ color: 'var(--text-primary)' }}>Abdalla Eldoumani</strong>, a Computer Science student at the University of Calgary with a minor in Philosophy. I moved from Saudi Arabia to Calgary to pursue a deeper understanding of how computers work — from transistors to distributed systems.
                </p>

                <p className="text-body text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  My work spans the full stack: I build high-performance servers in <strong style={{ color: 'var(--accent-primary)' }}>Rust</strong>, optimize matrix math in <strong style={{ color: 'var(--accent-primary)' }}>C++</strong>, and ship modern web apps with <strong style={{ color: 'var(--accent-primary)' }}>TypeScript</strong> and <strong style={{ color: 'var(--accent-primary)' }}>React</strong>. As a TA for CPSC 355, I teach assembly language and computer architecture — explaining how the abstractions we rely on actually work.
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 pt-6"
            >
              <Link target="_blank" href="/resume">
                <MagneticButton
                  strength={0.2}
                  className="inline-flex items-center justify-center space-x-2 glass-effect hover-lift px-6 py-3 rounded-full font-semibold transition-all duration-300 w-full sm:w-auto"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <Download size={20} />
                  <span>Download Resume</span>
                </MagneticButton>
              </Link>

              <Link target="_blank" href="https://www.linkedin.com/in/abdallaeldoumani/">
                <MagneticButton
                  strength={0.2}
                  className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 w-full sm:w-auto"
                  style={{ border: '1px solid var(--border-primary)', color: 'var(--text-secondary)' }}
                >
                  <span>Let&apos;s Connect</span>
                </MagneticButton>
              </Link>
            </motion.div>
          </motion.div>

          {/* Highlights Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <MagneticCard key={item.title} strength={0.1}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: "easeInOut" }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="bento-card hover-lift group"
                  >
                  <div className="flex items-start space-x-4">
                    <div
                      className="p-3 rounded-xl group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: 'var(--tertiary-bg)', color: `var(${item.colorVar})` }}
                    >
                      <Icon size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                        {item.title}
                      </h3>
                      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                </motion.div>
                </MagneticCard>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
