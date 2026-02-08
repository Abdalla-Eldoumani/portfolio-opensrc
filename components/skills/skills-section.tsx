"use client";

import { motion } from 'framer-motion';
import { SkillsGrid } from './skills-grid';

export const SkillsSection = () => {
  return (
    <section className="py-28" style={{ backgroundColor: 'var(--primary-bg)', color: 'var(--text-primary)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-display text-4xl sm:text-5xl mb-4">
            Skills & <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            A toolkit spanning low-level systems, full-stack development, AI/ML, and cloud technologies.
          </p>
        </motion.div>

        <SkillsGrid />
      </div>
    </section>
  );
};
