"use client";

import { motion } from 'framer-motion';
import { FeaturedSkills } from './featured-skills';
import { SkillsGrid } from './skills-grid';

/**
 * Skills Section - Main component
 * Comprehensive toolkit showcasing technical expertise
 */
export const SkillsSection = () => {
  return (
    <section className="py-20 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Skills & <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A comprehensive toolkit spanning low-level optimization, full-stack development,
            AI/ML, cybersecurity, and cloud technologies.
          </p>
        </motion.div>

        {/* Interactive Skill Constellation - Signature Feature */}
        <FeaturedSkills />

        {/* Skills Categories - Bento Grid Layout */}
        <SkillsGrid />

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
          viewport={{ once: false, amount: 0.3 }}
          className="mt-16 glass-effect p-8 rounded-2xl text-center"
        >
          <h3 className="text-2xl font-bold mb-4 text-gradient">Performance & Innovation Focus</h3>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Specialized in high-performance computing, low-level optimization, and cutting-edge AI/ML technologies.
            Experienced in building scalable systems from embedded firmware to cloud-native microservices,
            with a strong foundation in cybersecurity and data engineering.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
