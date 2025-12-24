"use client";

import { motion } from 'framer-motion';
import { SkillConstellation } from '@/components/ui/skill-constellation';
import { FaReact, FaNodeJs, FaDocker, FaPython, FaJava, FaAws } from 'react-icons/fa';
import { SiTypescript, SiCplusplus, SiNextdotjs, SiPostgresql, SiTensorflow, SiRust } from 'react-icons/si';

const featuredSkills = [
  { name: "C/C++", icon: SiCplusplus, level: "Proficient", proficiency: 85, color: "text-blue-600", category: "Languages" },
  { name: "TypeScript", icon: SiTypescript, level: "Proficient", proficiency: 80, color: "text-blue-400", category: "Languages" },
  { name: "Python", icon: FaPython, level: "Proficient", proficiency: 82, color: "text-yellow-400", category: "Languages" },
  { name: "Java", icon: FaJava, level: "Proficient", proficiency: 75, color: "text-red-500", category: "Languages" },
  { name: "Rust", icon: SiRust, level: "Advanced", proficiency: 78, color: "text-orange-500", category: "Languages" },
  { name: "React.js", icon: FaReact, level: "Proficient", proficiency: 83, color: "text-cyan-400", category: "Frontend" },
  { name: "Next.js", icon: SiNextdotjs, level: "Proficient", proficiency: 81, color: "text-white", category: "Frontend" },
  { name: "Node.js", icon: FaNodeJs, level: "Proficient", proficiency: 79, color: "text-green-500", category: "Backend" },
  { name: "PostgreSQL", icon: SiPostgresql, level: "Proficient", proficiency: 77, color: "text-blue-600", category: "Database" },
  { name: "Docker", icon: FaDocker, level: "Intermediate", proficiency: 72, color: "text-blue-500", category: "DevOps" },
  { name: "AWS", icon: FaAws, level: "Intermediate", proficiency: 70, color: "text-orange-400", category: "Cloud" },
  { name: "TensorFlow", icon: SiTensorflow, level: "Intermediate", proficiency: 68, color: "text-orange-500", category: "AI/ML" },
];

/**
 * Featured Skills - Interactive Skill Constellation
 * Signature feature showcasing primary technical skills
 */
export const FeaturedSkills = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
      viewport={{ once: false, amount: 0.2 }}
      className="mb-16"
    >
      <div className="mb-8 text-center">
        <h3 className="text-2xl font-semibold mb-3" style={{ color: 'var(--text-secondary)', letterSpacing: '-0.02em' }}>
          Interactive Skills Ecosystem
        </h3>
        <p className="text-sm text-gray-400 max-w-2xl mx-auto">
          Hover over skills to explore connections. Size reflects proficiency level. Use Ctrl/Cmd + scroll to zoom, click & drag to pan.
        </p>
      </div>
      <SkillConstellation skills={featuredSkills} />
    </motion.div>
  );
};
