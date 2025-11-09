"use client";

import { motion } from 'framer-motion';
import { FaGraduationCap, FaCode, FaUsers, FaRocket, FaAward, FaChevronRight } from 'react-icons/fa';
import { Calendar, MapPin, TrendingUp, Users, Code, Zap } from 'lucide-react';

const experienceData = [
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

const educationData = {
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

export const Experience = () => {
  return (
    <section className="py-20 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Professional <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A journey through impactful roles in software engineering, AI development, 
            and technical mentorship across diverse environments.
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="space-y-12 mb-20">
          {experienceData.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeInOut" }}
              viewport={{ once: false, amount: 0.2 }}
              className="relative"
            >
              {/* Timeline Line */}
              <div className="absolute left-8 top-16 bottom-0 w-px bg-gradient-to-b from-gray-600 to-transparent hidden lg:block"></div>
              
              <div className={`glass-effect p-8 rounded-2xl hover-lift border ${exp.borderColor} relative`}>
                {/* Timeline Dot */}
                <div className={`absolute -left-4 top-8 w-8 h-8 ${exp.bgColor} ${exp.borderColor} border-2 rounded-full items-center justify-center hidden lg:flex`}>
                  <exp.icon className={`w-4 h-4 ${exp.color}`} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column - Role Info */}
                  <div className="lg:col-span-1 space-y-4">
                    <div className="flex items-center space-x-2 lg:hidden">
                      <exp.icon className={`w-5 h-5 ${exp.color}`} />
                      <span className={`px-3 py-1 text-xs font-semibold ${exp.color} ${exp.bgColor} rounded-full border ${exp.borderColor}`}>
                        {exp.type}
                      </span>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{exp.role}</h3>
                      <h4 className="text-xl font-semibold text-gray-300 mb-4">{exp.company}</h4>
                    </div>

                    <div className="space-y-2 text-sm text-gray-400">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    <div className="hidden lg:block">
                      <span className={`px-3 py-1 text-xs font-semibold ${exp.color} ${exp.bgColor} rounded-full border ${exp.borderColor}`}>
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  {/* Right Column - Details */}
                  <div className="lg:col-span-2 space-y-6">
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Key Achievements */}
                    <div>
                      <h5 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2 text-emerald-400" />
                        Key Achievements
                      </h5>
                      <div className="space-y-3">
                        {exp.achievements.map((achievement, achIndex) => (
                          <motion.div
                            key={achIndex}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: achIndex * 0.1, ease: "easeInOut" }}
                            viewport={{ once: false, amount: 0.3 }}
                            className="flex items-start space-x-3 group"
                          >
                            <FaChevronRight className="w-3 h-3 text-emerald-400 mt-2 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                            <p className="text-gray-300 leading-relaxed">{achievement}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Skills Used */}
                    <div>
                      <h5 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <Code className="w-5 h-5 mr-2 text-blue-400" />
                        Technologies & Skills
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, skillIndex) => (
                          <motion.span
                            key={skillIndex}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: skillIndex * 0.05, ease: "easeInOut" }}
                            viewport={{ once: false, amount: 0.3 }}
                            className="px-3 py-1 text-sm font-medium text-gray-300 bg-gray-800/50 rounded-full border border-gray-700 hover:border-gray-600 hover:bg-gray-800/70 transition-all"
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
          ))}
        </div>

        {/* Education Section */}
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
                  {educationData.degree}
                  <span className="text-lg text-gray-400 block">{educationData.minor}</span>
                </h4>
                <h5 className="text-lg font-medium text-gray-300 mb-4">{educationData.institution}</h5>
              </div>

              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{educationData.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{educationData.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>GPA: {educationData.gpa}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaAward className="w-4 h-4" />
                  <span>{educationData.honors}</span>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed">
                {educationData.description}
              </p>
            </div>

            <div>
              <h5 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Code className="w-5 h-5 mr-2 text-purple-400" />
                Relevant Coursework
              </h5>
              <div className="space-y-3">
                {educationData.highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: "easeInOut" }}
                    viewport={{ once: false, amount: 0.3 }}
                    className="flex items-start space-x-3 group"
                  >
                    <FaChevronRight className="w-3 h-3 text-purple-400 mt-2 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                    <p className="text-gray-300 leading-relaxed">{highlight}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
          viewport={{ once: false, amount: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="glass-effect p-8 rounded-2xl max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-gradient">
              Ready for New Challenges
            </h3>
            <p className="text-gray-300 mb-6">
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
                className="border border-gray-600 hover:border-gray-400 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-white/5"
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