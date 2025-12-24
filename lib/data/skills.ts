import { Skill, SkillCategory, SkillConnections } from '@/lib/types/portfolio';
import { FaReact, FaNodeJs, FaDocker, FaGitAlt, FaDatabase, FaPython, FaJava, FaCss3Alt, FaNpm, FaAws } from 'react-icons/fa';
import { SiTypescript, SiCplusplus, SiGnubash, SiNextdotjs, SiTailwindcss, SiMongodb, SiPostgresql, SiExpress, SiJunit5, SiAssemblyscript, SiPytest, SiSupabase, SiFirebase, SiVercel, SiSpring, SiFlask, SiDjango, SiKubernetes, SiMysql, SiOracle, SiPhp, SiCsharp, SiJupyter, SiPowerbi, SiMicrosoftazure, SiOpenai, SiTensorflow, SiPytorch, SiPostman, SiJira, SiKotlin, SiGo, SiApachekafka, SiJenkins, SiLinux, SiRust } from 'react-icons/si';
import { TbBrandDjango } from "react-icons/tb";

/**
 * Portfolio skills data
 * Featured skills appear in the interactive constellation
 * Skill categories organize abilities by domain
 * Connections map project-based relationships between skills
 */

// Featured skills for constellation visualization
// Proficiency scale: 0-100 (affects node size in constellation)
export const featuredSkills: Skill[] = [
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

// All skills organized by category for bento grid display
export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    skills: [
      { name: "C/C++", icon: SiCplusplus, color: "text-blue-600" },
      { name: "Rust", icon: SiRust, color: "text-orange-500" },
      { name: "Python", icon: FaPython, color: "text-yellow-400" },
      { name: "Java", icon: FaJava, color: "text-red-500" },
      { name: "TypeScript", icon: SiTypescript, color: "text-blue-400" },
      { name: "Assembly", icon: SiAssemblyscript, color: "text-gray-400" },
      { name: "PHP", icon: SiPhp, color: "text-indigo-500" },
      { name: "Bash", icon: SiGnubash, color: "text-green-400" },
      { name: "Go", icon: SiGo, color: "text-cyan-400" },
      { name: "Kotlin", icon: SiKotlin, color: "text-orange-500" },
    ],
  },
  {
    category: "Frontend & Frameworks",
    skills: [
      { name: "React.js", icon: FaReact, color: "text-cyan-400" },
      { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
      { name: "TailwindCSS", icon: SiTailwindcss, color: "text-teal-400" },
      { name: "CSS3", icon: FaCss3Alt, color: "text-blue-500" },
      { name: "Spring Boot", icon: SiSpring, color: "text-green-500" },
      { name: "Express.js", icon: SiExpress, color: "text-gray-300" },
    ],
  },
  {
    category: "Backend & Databases",
    skills: [
      { name: "Node.js", icon: FaNodeJs, color: "text-green-500" },
      { name: "Django", icon: TbBrandDjango, color: "text-green-600" },
      { name: "Flask", icon: SiFlask, color: "text-gray-300" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-600" },
      { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
      { name: "MySQL", icon: SiMysql, color: "text-blue-500" },
      { name: "Supabase", icon: SiSupabase, color: "text-green-400" },
      { name: "Firebase", icon: SiFirebase, color: "text-orange-400" },
      { name: "Oracle", icon: SiOracle, color: "text-red-500" },
    ],
  },
  {
    category: "Data Science & AI/ML",
    skills: [
      { name: "TensorFlow", icon: SiTensorflow, color: "text-orange-500" },
      { name: "PyTorch", icon: SiPytorch, color: "text-red-500" },
      { name: "Jupyter", icon: SiJupyter, color: "text-orange-400" },
      { name: "Power BI", icon: SiPowerbi, color: "text-yellow-500" },
      { name: "OpenAI API", icon: SiOpenai, color: "text-green-400" },
    ],
  },
  {
    category: "Cloud & DevOps",
    skills: [
      { name: "AWS", icon: FaAws, color: "text-orange-400" },
      { name: "Azure", icon: SiMicrosoftazure, color: "text-blue-500" },
      { name: "Docker", icon: FaDocker, color: "text-blue-500" },
      { name: "Kubernetes", icon: SiKubernetes, color: "text-blue-600" },
      { name: "Vercel", icon: SiVercel, color: "text-white" },
    ],
  },
  {
    category: "Testing & Tools",
    skills: [
      { name: "JUnit", icon: SiJunit5, color: "text-red-500" },
      { name: "pytest", icon: SiPytest, color: "text-yellow-400" },
      { name: "Git", icon: FaGitAlt, color: "text-orange-500" },
      { name: "Postman", icon: SiPostman, color: "text-orange-500" },
      { name: "Jira", icon: SiJira, color: "text-blue-500" },
    ],
  },
];

/**
 * Skill connections based on project collaborations
 * Defines which skills are used together in real projects
 * Powers the connection visualization in SkillConstellation
 */
export const skillConnections: SkillConnections = {
  'Next.js': ['TypeScript', 'React.js', 'TailwindCSS', 'Prisma', 'Vercel', 'Framer Motion'],
  'TypeScript': ['Next.js', 'React.js', 'Angular', 'Node.js', 'TailwindCSS'],
  'React.js': ['Next.js', 'TypeScript', 'Angular', 'TailwindCSS'],
  'TailwindCSS': ['Next.js', 'TypeScript', 'React.js', 'Framer Motion'],
  'Rust': ['SQLite', 'JWT', 'WebSocket'],
  'C++': ['Python', 'OpenMP'],
  'Python': ['Docker', 'TensorFlow', 'PyTorch', 'C++', 'TypeScript'],
  'Docker': ['Python', 'AWS'],
  'TensorFlow': ['Python', 'PyTorch'],
  'PyTorch': ['Python', 'TensorFlow'],
  'Angular': ['TypeScript', 'React.js'],
  'Node.js': ['TypeScript', 'Express.js', 'PostgreSQL', 'MongoDB'],
  'Express.js': ['Node.js'],
  'PostgreSQL': ['Node.js'],
  'MongoDB': ['Node.js'],
  'MySQL': ['Prisma'],
  'Prisma': ['Next.js', 'MySQL'],
  'Java': ['JUnit'],
  'JUnit': ['Java'],
  'AWS': ['Docker'],
  'Vercel': ['Next.js'],
  'Framer Motion': ['Next.js', 'TailwindCSS'],
  'Git': ['TypeScript', 'Python', 'JavaScript', 'Java', 'Rust', 'C++'],
  'JavaScript': ['HTML5', 'CSS3', 'Git'],
  'HTML5': ['CSS3', 'JavaScript'],
  'CSS3': ['HTML5', 'JavaScript'],
  'SQLite': ['Rust'],
  'JWT': ['Rust'],
  'WebSocket': ['Rust'],
  'OpenMP': ['C++'],
};

// Helper functions
export const getSkillsByCategory = (category: string) =>
  skillCategories.find(cat => cat.category === category)?.skills || [];

export const getSkillConnections = (skillName: string): string[] =>
  skillConnections[skillName] || [];

export const getFeaturedSkillByName = (name: string) =>
  featuredSkills.find(skill => skill.name === name);
