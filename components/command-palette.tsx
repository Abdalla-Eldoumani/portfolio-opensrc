"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Home, User, Code, Briefcase, Mail, FileText, Github, Linkedin, Command, GraduationCap } from 'lucide-react';

interface CommandItem {
  id: string;
  label: string;
  icon: React.ElementType;
  action: () => void;
  keywords: string[];
  shortcut?: string;
}

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
    setSearch('');
  }, []);

  const commands: CommandItem[] = useMemo(() => [
    {
      id: 'home',
      label: 'Go to Home',
      icon: Home,
      action: () => scrollToSection('home'),
      keywords: ['home', 'start', 'top', 'hero'],
      shortcut: '1'
    },
    {
      id: 'about',
      label: 'View About Section',
      icon: User,
      action: () => scrollToSection('about'),
      keywords: ['about', 'bio', 'information', 'me'],
      shortcut: '2'
    },
    {
      id: 'experience',
      label: 'View Experience',
      icon: Briefcase,
      action: () => scrollToSection('experience'),
      keywords: ['experience', 'work', 'jobs', 'career'],
      shortcut: '3'
    },
    {
      id: 'projects',
      label: 'Browse Projects',
      icon: FileText,
      action: () => scrollToSection('projects'),
      keywords: ['projects', 'portfolio', 'work', 'code'],
      shortcut: '4'
    },
    {
      id: 'skills',
      label: 'See Skills & Expertise',
      icon: Code,
      action: () => scrollToSection('skills'),
      keywords: ['skills', 'technologies', 'expertise', 'stack'],
      shortcut: '5'
    },
    {
      id: 'education',
      label: 'View Education',
      icon: GraduationCap,
      action: () => scrollToSection('education'),
      keywords: ['education', 'university', 'degree', 'coursework', 'academic'],
      shortcut: '6'
    },
    {
      id: 'contact',
      label: 'Get in Touch',
      icon: Mail,
      action: () => scrollToSection('contact'),
      keywords: ['contact', 'email', 'reach', 'message'],
      shortcut: '7'
    },
    {
      id: 'github',
      label: 'Open GitHub Profile',
      icon: Github,
      action: () => window.open('https://github.com/Abdalla-Eldoumani', '_blank'),
      keywords: ['github', 'code', 'repository', 'git'],
      shortcut: 'g'
    },
    {
      id: 'linkedin',
      label: 'Open LinkedIn Profile',
      icon: Linkedin,
      action: () => window.open('https://www.linkedin.com/in/abdallaeldoumani/', '_blank'),
      keywords: ['linkedin', 'professional', 'network'],
      shortcut: 'l'
    },
    {
      id: 'resume',
      label: 'Download Resume',
      icon: FileText,
      action: () => window.open('/resume', '_blank'),
      keywords: ['resume', 'cv', 'download', 'pdf'],
      shortcut: 'r'
    },
  ], [scrollToSection]);

  const filteredCommands = useMemo(() => commands.filter(command => {
    const searchLower = search.toLowerCase();
    return (
      command.label.toLowerCase().includes(searchLower) ||
      command.keywords.some(keyword => keyword.toLowerCase().includes(searchLower))
    );
  }), [search, commands]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Cmd/Ctrl + K to open
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setIsOpen(prev => !prev);
      return;
    }

    // Escape to close
    if (e.key === 'Escape') {
      setIsOpen(false);
      setSearch('');
      return;
    }

    if (!isOpen) return;

    // Arrow navigation
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev =>
        prev < filteredCommands.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev =>
        prev > 0 ? prev - 1 : filteredCommands.length - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    }
  }, [isOpen, filteredCommands, selectedIndex]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Prevent body scroll when palette is open
  useEffect(() => {
    if (isOpen) {
      // Calculate scrollbar width to prevent layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  // Keep hint button always visible
  const [showHint] = useState(true);

  return (
    <>
      {/* Hint Badge - Always visible */}
      <AnimatePresence>
        {showHint && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
          >
            <button
              onClick={() => setIsOpen(true)}
              className="glass-effect px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 hover-lift shadow-lg"
              style={{ color: 'var(--text-secondary)' }}
              aria-label="Open command palette"
              aria-haspopup="dialog"
              aria-expanded={isOpen}
            >
              <Command size={14} className="flex-shrink-0" aria-hidden="true" />
              <span className="hidden sm:inline">Press</span>
              <kbd className="command-kbd text-xs" aria-label="Command K">⌘K</kbd>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Command Palette */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="command-palette-overlay"
              onClick={() => {
                setIsOpen(false);
                setSearch('');
              }}
              aria-hidden="true"
            />

            {/* Palette */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="command-palette"
              role="dialog"
              aria-label="Command palette"
              aria-modal="true"
            >
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 pointer-events-none" size={20} aria-hidden="true" style={{ color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  className="command-input"
                  placeholder="Type a command or search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoFocus
                  role="combobox"
                  aria-autocomplete="list"
                  aria-controls="command-list"
                  aria-expanded={filteredCommands.length > 0}
                  aria-activedescendant={filteredCommands[selectedIndex] ? `command-${filteredCommands[selectedIndex].id}` : undefined}
                  aria-label="Search commands"
                />
              </div>

              {/* Commands List */}
              <div
                className="command-list"
                id="command-list"
                role="listbox"
                aria-label="Available commands"
              >
                {filteredCommands.length === 0 ? (
                  <div className="text-center py-8" style={{ color: 'var(--text-muted)' }}>
                    No commands found
                  </div>
                ) : (
                  filteredCommands.map((command, index) => {
                    const Icon = command.icon;
                    const isSelected = index === selectedIndex;
                    return (
                      <button
                        key={command.id}
                        id={`command-${command.id}`}
                        className={`command-item w-full ${
                          isSelected ? 'selected' : ''
                        }`}
                        onClick={command.action}
                        onMouseEnter={() => setSelectedIndex(index)}
                        role="option"
                        aria-selected={isSelected}
                        aria-label={`${command.label}${command.shortcut ? `, shortcut ${command.shortcut}` : ''}`}
                      >
                        <Icon size={18} aria-hidden="true" />
                        <span className="flex-1 text-left">{command.label}</span>
                        {command.shortcut && (
                          <kbd className="command-kbd" aria-label={`Shortcut ${command.shortcut}`}>{command.shortcut}</kbd>
                        )}
                      </button>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 flex items-center justify-between text-xs flex-shrink-0" style={{ borderTop: '1px solid var(--border-primary)', color: 'var(--text-muted)' }}>
                <div className="flex items-center gap-2 sm:gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="command-kbd text-xs">↑↓</kbd>
                    <span className="hidden sm:inline">Navigate</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="command-kbd text-xs">↵</kbd>
                    <span className="hidden sm:inline">Select</span>
                  </span>
                </div>
                <span className="flex items-center gap-1">
                  <kbd className="command-kbd text-xs">Esc</kbd>
                  <span className="hidden sm:inline">Close</span>
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};