"use client";

import { motion } from 'framer-motion';
import { TimelineVisual } from '@/components/ui/timeline-visual';
import { ExperienceCard } from './experience-card';
import { experiences } from '@/lib/data/experience';
import { useState } from 'react';
import { motionVariants, animationConfigs } from '@/lib/constants/animations';

/**
 * Experience Section - Main component
 * Professional journey through work experience and education
 */
export const ExperienceSection = () => {
  const [expandedExperience, setExpandedExperience] = useState<number | null>(null);

  const toggleExperience = (index: number) => {
    setExpandedExperience(expandedExperience === index ? null : index);
  };

  // Create timeline events from experience data
  const timelineEvents = experiences.map((exp) => ({
    date: exp.duration.split(' – ')[0] || exp.duration,
    label: exp.role,
    color: exp.color.replace('text-', ''),
    icon: exp.icon,
  }));

  return (
    <section className="py-20" style={{ backgroundColor: 'var(--primary-bg)', color: 'var(--text-primary)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={motionVariants.slideLeft.hidden}
          whileInView={motionVariants.slideLeft.visible}
          transition={{ duration: 0.6, ease: animationConfigs.entrance.ease }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-display text-4xl sm:text-5xl mb-4 font-serif">
            Professional <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-body text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            A journey through impactful roles in software engineering, AI development,
            and technical mentorship across diverse environments.
          </p>
        </motion.div>

        {/* Visual Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16 hidden lg:block"
        >
          <TimelineVisual events={timelineEvents} orientation="horizontal" />
        </motion.div>

        {/* Experience Timeline */}
        <div className="space-y-12 mb-20">
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={index}
              experience={exp}
              index={index}
              isExpanded={expandedExperience === index}
              onToggleExpand={toggleExperience}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="glass-effect p-8 rounded-2xl max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-gradient">
              Ready for New Challenges
            </h3>
            <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
              With a strong foundation in software engineering, AI development, and technical leadership,
              I&apos;m excited to tackle complex problems and drive innovation in my next role.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="mailto:aamsdoumani@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-effect px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Get In Touch
              </motion.a>
              <motion.a
                href="/my-resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-white/5"
                style={{ border: '1px solid var(--border-primary)' }}
              >
                Download Resume
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
