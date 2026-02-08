import { SkillCategory } from '@/lib/types/portfolio';
import { FaReact, FaNodeJs, FaDocker, FaGitAlt, FaPython, FaJava, FaAws } from 'react-icons/fa';
import { SiTypescript, SiCplusplus, SiGnubash, SiNextdotjs, SiTailwindcss, SiMongodb, SiPostgresql, SiJunit5, SiAssemblyscript, SiPytest, SiJupyter, SiOpenai, SiTensorflow, SiPytorch, SiPostman, SiJira, SiKotlin, SiGo, SiRust, SiVercel, SiLinux } from 'react-icons/si';

/**
 * Portfolio skills data organized by domain
 * Used for reference; the SkillsGrid component renders from its own inline data
 */

export const skillCategories: SkillCategory[] = [
  {
    category: "Systems & Low-Level",
    skills: [
      { name: "C/C++", icon: SiCplusplus, color: "var(--text-secondary)" },
      { name: "Rust", icon: SiRust, color: "var(--text-secondary)" },
      { name: "Assembly", icon: SiAssemblyscript, color: "var(--text-secondary)" },
      { name: "Go", icon: SiGo, color: "var(--text-secondary)" },
      { name: "Bash", icon: SiGnubash, color: "var(--text-secondary)" },
      { name: "Linux", icon: SiLinux, color: "var(--text-secondary)" },
    ],
  },
  {
    category: "Web & Cloud",
    skills: [
      { name: "TypeScript", icon: SiTypescript, color: "var(--text-secondary)" },
      { name: "React", icon: FaReact, color: "var(--text-secondary)" },
      { name: "Next.js", icon: SiNextdotjs, color: "var(--text-secondary)" },
      { name: "Node.js", icon: FaNodeJs, color: "var(--text-secondary)" },
      { name: "TailwindCSS", icon: SiTailwindcss, color: "var(--text-secondary)" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "var(--text-secondary)" },
      { name: "MongoDB", icon: SiMongodb, color: "var(--text-secondary)" },
      { name: "Docker", icon: FaDocker, color: "var(--text-secondary)" },
      { name: "AWS", icon: FaAws, color: "var(--text-secondary)" },
      { name: "Vercel", icon: SiVercel, color: "var(--text-secondary)" },
    ],
  },
  {
    category: "Data & AI",
    skills: [
      { name: "Python", icon: FaPython, color: "var(--text-secondary)" },
      { name: "TensorFlow", icon: SiTensorflow, color: "var(--text-secondary)" },
      { name: "PyTorch", icon: SiPytorch, color: "var(--text-secondary)" },
      { name: "Jupyter", icon: SiJupyter, color: "var(--text-secondary)" },
      { name: "OpenAI API", icon: SiOpenai, color: "var(--text-secondary)" },
    ],
  },
  {
    category: "Tools & Methods",
    skills: [
      { name: "Java", icon: FaJava, color: "var(--text-secondary)" },
      { name: "Git", icon: FaGitAlt, color: "var(--text-secondary)" },
      { name: "JUnit", icon: SiJunit5, color: "var(--text-secondary)" },
      { name: "pytest", icon: SiPytest, color: "var(--text-secondary)" },
      { name: "Postman", icon: SiPostman, color: "var(--text-secondary)" },
      { name: "Jira", icon: SiJira, color: "var(--text-secondary)" },
      { name: "Kotlin", icon: SiKotlin, color: "var(--text-secondary)" },
    ],
  },
];

export const getSkillsByCategory = (category: string) =>
  skillCategories.find(cat => cat.category === category)?.skills || [];
