"use client";

import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaDocker, FaGitAlt, FaPython, FaJava, FaAws } from 'react-icons/fa';
import { SiTypescript, SiCplusplus, SiGnubash, SiNextdotjs, SiTailwindcss, SiMongodb, SiPostgresql, SiJunit5, SiAssemblyscript, SiPytest, SiJupyter, SiOpenai, SiTensorflow, SiPytorch, SiPostman, SiJira, SiKotlin, SiGo, SiRust, SiVercel, SiLinux } from 'react-icons/si';

const domains = [
  {
    name: "Systems & Low-Level",
    skills: [
      { name: "C/C++", icon: SiCplusplus },
      { name: "Rust", icon: SiRust },
      { name: "Assembly", icon: SiAssemblyscript },
      { name: "Go", icon: SiGo },
      { name: "Bash", icon: SiGnubash },
      { name: "Linux", icon: SiLinux },
    ],
  },
  {
    name: "Web & Cloud",
    skills: [
      { name: "TypeScript", icon: SiTypescript },
      { name: "React", icon: FaReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Node.js", icon: FaNodeJs },
      { name: "TailwindCSS", icon: SiTailwindcss },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Docker", icon: FaDocker },
      { name: "AWS", icon: FaAws },
      { name: "Vercel", icon: SiVercel },
    ],
  },
  {
    name: "Data & AI",
    skills: [
      { name: "Python", icon: FaPython },
      { name: "TensorFlow", icon: SiTensorflow },
      { name: "PyTorch", icon: SiPytorch },
      { name: "Jupyter", icon: SiJupyter },
      { name: "OpenAI API", icon: SiOpenai },
    ],
  },
  {
    name: "Tools & Methods",
    skills: [
      { name: "Java", icon: FaJava },
      { name: "Git", icon: FaGitAlt },
      { name: "JUnit", icon: SiJunit5 },
      { name: "pytest", icon: SiPytest },
      { name: "Postman", icon: SiPostman },
      { name: "Jira", icon: SiJira },
      { name: "Kotlin", icon: SiKotlin },
    ],
  },
];

export const SkillsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {domains.map((domain, domainIndex) => (
        <motion.div
          key={domain.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: domainIndex * 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.3 }}
          className="bento-card hover-lift"
        >
          <h3 className="font-serif text-xl font-semibold mb-6" style={{ color: 'var(--accent-primary)' }}>
            {domain.name}
          </h3>

          <div className="flex flex-wrap gap-3">
            {domain.skills.map((skill) => (
              <div
                key={skill.name}
                className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200"
                style={{
                  backgroundColor: 'var(--tertiary-bg)',
                  color: 'var(--text-secondary)',
                }}
              >
                <skill.icon className="text-lg" style={{ color: 'var(--text-muted)' }} />
                <span className="text-sm font-medium">{skill.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
