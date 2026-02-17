import { Project } from '@/lib/types/portfolio';
import { Server, Zap, Calculator, Shield, ShoppingCart, Gamepad2, Cpu, Star } from 'lucide-react';

/**
 * Portfolio projects data
 * All factual project information extracted from resume and project files
 */

export const projects: Project[] = [
  {
    name: "Rust HTTP Server",
    description: "Production-ready HTTP server handling 10,000+ concurrent requests with <10ms response time using Rust and Axum framework. Features comprehensive JWT authentication, role-based access control, and intelligent caching achieving 60% reduction in database queries.",
    fullDescription: "Enterprise-grade HTTP server architected for high-performance concurrent processing with advanced search engine featuring full-text indexing and fuzzy matching. Includes asynchronous background job processing with retry mechanisms, WebSocket notifications, and comprehensive security features including rate limiting, CORS protection, and SQL injection prevention. Built with modular architecture featuring 15+ middleware components and real-time monitoring dashboards.",
    image: "/images/rust-server.svg",
    github: "https://github.com/Abdalla-Eldoumani/rust-http-server",
    githubRepo: {
      owner: "Abdalla-Eldoumani",
      repo: "rust-http-server"
    },
    live: "#",
    tech: ["Rust", "Axum", "SQLite", "WebSocket", "JWT", "RESTful API", "Caching", "Rate Limiting"],
    featured: true,
    icon: Server,
    category: 'performance',
    metrics: "10,000+ concurrent requests, <10ms response time",
    liveMetrics: { requests: 10000, responseTime: 10, cacheReduction: 60 }
  },
  {
    name: "FastMathExt",
    description: "High-performance C++ matrix multiplication library achieving 25-41% performance gains over NumPy through advanced optimization techniques including multi-level cache blocking, AVX2 SIMD instructions, and OpenMP parallelization.",
    fullDescription: "FastMathExt is a cutting-edge mathematical computation library that demonstrates mastery of low-level optimization. The project implements Strassen's algorithm with task-based concurrency, reducing computational complexity from O(n³) to O(n^2.807) for large-scale operations. Features comprehensive benchmarking framework with statistical analysis across 10,000+ iterations.",
    image: "/images/matrix-multiplication.svg",
    github: "https://github.com/Abdalla-Eldoumani/FastMathExt",
    githubRepo: {
      owner: "Abdalla-Eldoumani",
      repo: "FastMathExt"
    },
    live: "#",
    tech: ["C++", "Python", "OpenMP", "AVX2 SIMD", "Strassen's Algorithm", "Performance Optimization"],
    featured: true,
    icon: Zap,
    category: 'performance',
    metrics: "25-41% faster than NumPy",
    liveMetrics: { performanceGain: 41, iterations: 10000 }
  },
  {
    name: "Budget Buddy",
    description: "Full-stack financial management platform empowering young Canadians to make informed investment decisions. Features real-time stock data, projection tools, and comprehensive budget tracking with modern authentication.",
    fullDescription: "Budget Buddy addresses the critical issue that 70% of young Canadians avoid stock market investing. Built during CalgaryHacks24, this platform provides up-to-date financial information, real-time stock data across various sectors, and projection tools for investment planning.",
    image: "/images/budgetbuddy.png",
    github: "https://github.com/Abdalla-Eldoumani/CalgaryHacks24",
    githubRepo: {
      owner: "Abdalla-Eldoumani",
      repo: "CalgaryHacks24"
    },
    live: "https://calgary-hacks24-budget-buddy.vercel.app",
    tech: ["Next.js", "TypeScript", "TailwindCSS", "Clerk Auth", "Vercel", "Financial APIs"],
    featured: true,
    icon: Calculator,
    category: 'web',
    metrics: "Hackathon Winner"
  },
  {
    name: "Interactive Cybersecurity Site",
    description: "Educational platform combining theoretical cybersecurity lectures with interactive quizzes. Covers cryptography, hashing, malware, and privacy through detailed content and hands-on learning experiences.",
    fullDescription: "Comprehensive cybersecurity education platform targeting students, professionals, and enthusiasts. Features interactive quizzes on cryptography, hashing, malware, and privacy, complemented by detailed lectures on encryption methods, virus detection, and digital privacy protection.",
    image: "/images/cybersecurity-site.png",
    github: "https://github.com/Abdalla-Eldoumani/Interactive-Cybersecurity-Site",
    githubRepo: {
      owner: "Abdalla-Eldoumani",
      repo: "Interactive-Cybersecurity-Site"
    },
    live: "https://interactive-cybersecurity-site.vercel.app",
    tech: ["HTML5", "CSS3", "JavaScript", "Interactive Design", "Educational Content"],
    featured: true,
    icon: Shield,
    category: 'education',
    metrics: "91 commits, 3 contributors"
  },
  {
    name: "AI-Platform",
    description: "Comprehensive AI-driven service platform featuring conversation generation, image/video creation, music composition, and code generation. Built with modern tech stack including OpenAI API integration.",
    fullDescription: "Full-featured AI platform offering multiple AI tools from a centralized dashboard. Includes conversation AI, image/video generation, music creation, and code generation capabilities. Features secure authentication, API limit monitoring, and subscription management with Stripe integration.",
    image: "/images/ai-platform.png",
    github: "https://github.com/Abdalla-Eldoumani/AI-Platform",
    githubRepo: {
      owner: "Abdalla-Eldoumani",
      repo: "AI-Platform"
    },
    live: "#",
    tech: ["Next.js", "TypeScript", "OpenAI API", "Prisma", "MySQL", "Stripe"],
    featured: true,
    icon: Star,
    category: 'ai',
    metrics: "Multiple AI tools integrated"
  },
  {
    name: "DUST",
    description: "Web-based game where players become digital archaeologists exploring a decaying internet. Built at Calgary Hacks 2026 with real-time multiplayer featuring both competitive and cooperative modes.",
    fullDescription: "DUST is a web-based exploration game where players dig through layers of a fictional, crumbling internet to uncover lost data, forgotten websites, and digital artifacts. Features real-time multiplayer powered by Convex, secure authentication via Clerk, and an immersive atmosphere of digital decay and discovery.",
    image: "/images/DUST.png",
    github: "https://github.com/Abdalla-Eldoumani/DUST",
    githubRepo: {
      owner: "Abdalla-Eldoumani",
      repo: "DUST"
    },
    live: "https://dust-mu.vercel.app",
    tech: ["Next.js", "TypeScript", "Convex", "Clerk Auth", "Real-time Multiplayer"],
    featured: false,
    icon: Gamepad2,
    category: 'web',
    metrics: "Calgary Hacks 2026"
  },
  {
    name: "AEOS — Educational OS",
    description: "Monolithic kernel built from scratch targeting the QEMU virt board on ARM64. An educational exploration of fundamental operating system components including memory management and process scheduling.",
    fullDescription: "Abdalla's Educational OS (AEOS) is a ground-up operating system kernel written in C/C++ and ARMv8 Assembly. Targeting the QEMU virt board on ARM64, the project explores core OS concepts including bootloading, memory management, interrupt handling, and process scheduling. Built as a hands-on learning project to deepen systems-level understanding.",
    image: "/images/AEOS.png",
    github: "https://github.com/Abdalla-Eldoumani/aeos",
    githubRepo: {
      owner: "Abdalla-Eldoumani",
      repo: "aeos"
    },
    live: "#",
    tech: ["C/C++", "ARMv8 Assembly", "QEMU", "OS Development", "Kernel Programming"],
    featured: false,
    icon: Cpu,
    category: 'performance',
    metrics: "In Progress"
  },
  {
    name: "Self-Checkout Station Software",
    description: "Enterprise-grade software simulation for retail self-checkout systems built with Java. Developed in a 20-member team using object-oriented programming and comprehensive testing with JUnit.",
    fullDescription: "Large-scale software engineering project simulating a complete self-checkout station system. Features responsive touchscreen interface using Java's GUI libraries, comprehensive error handling, and robust testing suite achieving 100% usability. Demonstrates strong collaboration and version control practices.",
    image: "/images/self-checkout.svg",
    github: "#",
    live: "#",
    tech: ["Java", "JUnit", "GUI Libraries", "Git", "Object-Oriented Programming", "Team Collaboration"],
    featured: false,
    icon: ShoppingCart,
    category: 'education',
    metrics: "20-member team, 100% usability"
  },
];

// Helper functions for filtering projects
export const getFeaturedProjects = () => projects.filter(p => p.featured);

export const getProjectsByCategory = (category: Project['category']) =>
  projects.filter(p => p.category === category);

export const getProjectByName = (name: string) =>
  projects.find(p => p.name === name);
