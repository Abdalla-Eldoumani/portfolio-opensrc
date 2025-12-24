import { Experience, Education } from '@/lib/types/portfolio';
import { FaGraduationCap, FaCode, FaRocket } from 'react-icons/fa';

/**
 * Professional experience and education data
 * All information is factual and sourced from resume (public/my-resume.pdf)
 */

export const experiences: Experience[] = [
  {
    role: "Teaching Assistant",
    company: "University of Calgary",
    location: "Calgary, Alberta",
    duration: "September 2025 – Present",
    type: "Academic",
    description: "Facilitating hands-on learning in computer architecture and low-level programming for undergraduate students in CPSC 355.",
    achievements: [
      "Guide 20 students through 13-week CPSC 355 curriculum covering computer architecture, C, and ARMv8 assembly.",
      "Conduct hands-on lab sessions demonstrating memory management, register allocation, and instruction set architecture.",
      "Debug low-level code issues and explain complex concepts through practical examples and step-by-step walkthroughs.",
      "Evaluate assembly programs and C implementations for correctness, efficiency, and architectural best practices."
    ],
    skills: ["Computer Architecture", "C Programming", "ARMv8 Assembly", "Teaching", "Debugging", "Code Review", "Mentorship"],
    icon: FaGraduationCap,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20"
  },
  {
    role: "AI Training Specialist",
    company: "Outlier",
    location: "Remote",
    duration: "October 2024 - September 2025",
    type: "Remote",
    description: "Evaluating and improving AI model performance through systematic analysis of code generation quality and algorithmic solutions.",
    achievements: [
      "Evaluated AI-generated Python code across 500+ dual-response scenarios, analyzing algorithm efficiency and optimization.",
      "Tested AI solutions for functional correctness and performance, documenting comparative analysis with technical feedback.",
      "Identified bugs and optimization opportunities in diverse programming tasks including data structures and algorithms.",
      "Contributed to large-scale AI training by assessing model responses across Python development patterns and best practices."
    ],
    skills: ["Python", "AI Evaluation", "Algorithm Analysis", "Code Review", "Performance Testing", "Technical Documentation", "Quality Assurance"],
    icon: FaCode,
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20"
  },
  {
    role: "Software Engineering Fellow",
    company: "Headstarter AI",
    location: "Calgary, Alberta",
    duration: "July 2024 – September 2024",
    type: "Fellowship",
    description: "Intensive software engineering fellowship focusing on AI projects, hackathons, and scalable platform development.",
    achievements: [
      "Built and deployed 5 AI-powered applications using Python and Docker, completing intensive hackathons with teams.",
      "Developed capstone project serving 1,000+ users using React.js, TypeScript, and modern web frameworks.",
      "Collaborated on real-world challenges requiring rapid prototyping, testing, and deployment under tight deadlines."
    ],
    skills: ["Python", "Docker", "React.js", "TypeScript", "Machine Learning", "Team Leadership", "Agile Development", "Rapid Prototyping"],
    icon: FaRocket,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20"
  },
  {
    role: "Python Mentor",
    company: "Al Oruba International School",
    location: "Riyadh, Saudi Arabia",
    duration: "July 2021 – July 2022",
    type: "Mentorship",
    description: "Led comprehensive Python programming mentorship program for high school students, focusing on practical application and collaborative learning.",
    achievements: [
      "Led programming workshops for 30+ high school students, teaching Python fundamentals and algorithm implementation.",
      "Designed hands-on coding exercises and project-based assignments improving student programming confidence.",
      "Facilitated collaborative learning environment where students supported each other in overcoming coding challenges."
    ],
    skills: ["Python", "Teaching", "Curriculum Development", "Workshop Facilitation", "Mentorship", "Algorithm Design"],
    icon: FaGraduationCap,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20"
  }
];

export const education: Education = {
  degree: "B.Sc. Computer Science",
  minor: "Minor in Philosophy",
  institution: "University of Calgary",
  location: "Calgary, Alberta",
  duration: "Sep 2022 – Jun 2027",
  gpa: "3.6/4.0",
  honors: "Dean's List (2023-2024, 2024-2025)",
  description: "Comprehensive computer science education with philosophical foundations, focusing on low-level systems, algorithms, and software engineering principles.",
  highlights: [
    "Computing Machinery I & II (C, ARMv8 Assembly, Computer Architecture, Embedded Systems)",
    "Principles of Operating Systems, Data Structures & Algorithms, Computer Networks",
    "Database Management Systems, Artificial Intelligence, Principles of Computer Security",
    "Web-Based Systems, Software Engineering, Reverse Engineering"
  ]
};

// Helper functions
export const getExperienceByType = (type: Experience['type']) =>
  experiences.filter(exp => exp.type === type);

export const getCurrentExperience = () =>
  experiences.find(exp => exp.duration.includes('Present'));

export const getExperienceByCompany = (company: string) =>
  experiences.find(exp => exp.company === company);
