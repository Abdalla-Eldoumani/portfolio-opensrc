"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, TrendingUp, Code, ChevronDown } from 'lucide-react';
import { FaGraduationCap, FaAward, FaChevronRight } from 'react-icons/fa';
import type { Education } from '@/lib/types/portfolio';

interface EducationCardProps {
  education: Education;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

/**
 * Education Card Component
 * Displays educational background with expandable coursework
 */
export const EducationCard = ({ education, isExpanded, onToggleExpand }: EducationCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
      viewport={{ once: false, amount: 0.2 }}
      className="glass-effect p-8 rounded-2xl border border-purple-500/20"
    >
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-full flex items-center justify-center mr-4">
          <FaGraduationCap className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">Education</h3>
          <p className="text-gray-400">Academic Foundation</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <h4 className="text-xl font-semibold text-white mb-2">
              {education.degree}
              <span className="text-lg text-gray-400 block">{education.minor}</span>
            </h4>
            <h5 className="text-lg font-medium text-gray-300 mb-4">{education.institution}</h5>
          </div>

          <div className="space-y-2 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{education.duration}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>{education.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>GPA: {education.gpa}</span>
            </div>
            {education.honors && (
              <div className="flex items-center space-x-2">
                <FaAward className="w-4 h-4" />
                <span>{education.honors}</span>
              </div>
            )}
          </div>

          <p className="text-gray-300 leading-relaxed">
            {education.description}
          </p>
        </div>

        <div>
          <button
            onClick={onToggleExpand}
            className="w-full flex items-center justify-between text-lg font-semibold text-white mb-4 hover:text-gray-200 transition-colors group"
            aria-expanded={isExpanded}
            aria-controls="education-coursework"
            aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${education.highlights.length} relevant courses`}
          >
            <div className="flex items-center">
              <Code className="w-5 h-5 mr-2 text-purple-400" />
              Relevant Coursework
              <span className="ml-2 text-sm text-gray-400">
                ({education.highlights.length} courses)
              </span>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                id="education-coursework"
                role="region"
                aria-label="Relevant coursework"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="space-y-3 pb-4">
                  {education.highlights.map((highlight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="flex items-start space-x-3 group"
                    >
                      <FaChevronRight className="w-3 h-3 text-purple-400 mt-2 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                      <p className="text-gray-300 leading-relaxed">{highlight}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Collapsed preview - show first 2 courses */}
          {!isExpanded && (
            <div className="space-y-2">
              {education.highlights.slice(0, 2).map((highlight, index) => (
                <div key={index} className="flex items-start space-x-3 text-gray-400 italic">
                  <FaChevronRight className="w-3 h-3 mt-2 flex-shrink-0 opacity-50" />
                  <p className="leading-relaxed text-sm">{highlight}</p>
                </div>
              ))}
              {education.highlights.length > 2 && (
                <p className="ml-6 text-sm text-purple-400">
                  +{education.highlights.length - 2} more courses
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
