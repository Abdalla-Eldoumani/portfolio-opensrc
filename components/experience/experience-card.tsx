"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, TrendingUp, Code, ChevronDown } from 'lucide-react';
import { FaChevronRight } from 'react-icons/fa';
import type { Experience } from '@/lib/types/portfolio';

interface ExperienceCardProps {
  experience: Experience;
  index: number;
  isExpanded: boolean;
  onToggleExpand: (index: number) => void;
}

/**
 * Experience Card Component
 * Displays work experience with expandable achievements
 */
export const ExperienceCard = ({ experience, index, isExpanded, onToggleExpand }: ExperienceCardProps) => {
  const IconComponent = experience.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: "easeInOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="relative"
    >
      {/* Timeline Line */}
      <div className="absolute left-8 top-16 bottom-0 w-px bg-gradient-to-b to-transparent hidden lg:block" style={{ backgroundImage: 'linear-gradient(to bottom, var(--border-primary), transparent)' }}></div>

      <div className={`glass-effect p-8 rounded-2xl hover-lift border ${experience.borderColor} relative`}>
        {/* Timeline Dot */}
        <div className={`absolute -left-4 top-8 w-8 h-8 ${experience.bgColor} ${experience.borderColor} border-2 rounded-full items-center justify-center hidden lg:flex`}>
          <IconComponent className={`w-4 h-4 ${experience.color}`} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Role Info */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center space-x-2 lg:hidden">
              <IconComponent className={`w-5 h-5 ${experience.color}`} />
              <span className={`px-3 py-1 text-xs font-semibold ${experience.color} ${experience.bgColor} rounded-full border ${experience.borderColor}`}>
                {experience.type}
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-bold font-serif mb-2" style={{ color: 'var(--text-primary)' }}>{experience.role}</h3>
              <h4 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-secondary)' }}>{experience.company}</h4>
            </div>

            <div className="space-y-2 text-sm" style={{ color: 'var(--text-muted)' }}>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{experience.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{experience.location}</span>
              </div>
            </div>

            <div className="hidden lg:block">
              <span className={`px-3 py-1 text-xs font-semibold ${experience.color} ${experience.bgColor} rounded-full border ${experience.borderColor}`}>
                {experience.type}
              </span>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {experience.description}
            </p>

            {/* Key Achievements - Expandable */}
            <div>
              <button
                onClick={() => onToggleExpand(index)}
                className="w-full flex items-center justify-between text-lg font-semibold mb-4 transition-colors group"
                style={{ color: 'var(--text-primary)' }}
                aria-expanded={isExpanded}
                aria-controls={`achievements-${index}`}
                aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${experience.achievements.length} key achievements for ${experience.role} at ${experience.company}`}
              >
                <div className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" style={{ color: 'var(--accent-primary)' }} />
                  Key Achievements
                  <span className="ml-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                    ({experience.achievements.length})
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 transition-colors" style={{ color: 'var(--text-muted)' }} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    id={`achievements-${index}`}
                    role="region"
                    aria-label={`Key achievements for ${experience.role}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-3 pb-4">
                      {experience.achievements.map((achievement, achIndex) => (
                        <motion.div
                          key={achIndex}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: achIndex * 0.05 }}
                          className="flex items-start space-x-3 group"
                        >
                          <FaChevronRight className="w-3 h-3 mt-2 flex-shrink-0 group-hover:translate-x-1 transition-transform" style={{ color: 'var(--accent-primary)' }} />
                          <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{achievement}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Collapsed preview - show first achievement */}
              {!isExpanded && (
                <div className="flex items-start space-x-3 italic" style={{ color: 'var(--text-muted)' }}>
                  <FaChevronRight className="w-3 h-3 mt-2 flex-shrink-0 opacity-50" />
                  <p className="leading-relaxed">
                    {experience.achievements[0]}
                    {experience.achievements.length > 1 && (
                      <span className="ml-2 text-sm" style={{ color: 'var(--accent-primary)' }}>
                        +{experience.achievements.length - 1} more
                      </span>
                    )}
                  </p>
                </div>
              )}
            </div>

            {/* Skills Used */}
            <div>
              <h5 className="text-lg font-semibold mb-4 flex items-center" style={{ color: 'var(--text-primary)' }}>
                <Code className="w-5 h-5 mr-2" style={{ color: 'var(--accent-secondary)' }} />
                Technologies & Skills
              </h5>
              <div className="flex flex-wrap gap-2">
                {experience.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: skillIndex * 0.05, ease: "easeInOut" }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="px-3 py-1 text-sm font-medium rounded-full transition-all"
                    style={{
                      color: 'var(--text-secondary)',
                      backgroundColor: 'var(--tertiary-bg)',
                      border: '1px solid var(--border-primary)'
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
