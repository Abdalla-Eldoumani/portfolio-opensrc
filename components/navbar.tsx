// components/navbar.tsx
"use client";

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { Menu, X, FileText, User, Code, Briefcase, Mail, Home, GraduationCap, FolderKanban } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navigationItems = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'About', href: '#about', icon: User },
  { name: 'Experience', href: '#experience', icon: Briefcase },
  { name: 'Projects', href: '#projects', icon: FolderKanban },
  { name: 'Skills', href: '#skills', icon: Code },
  { name: 'Education', href: '#education', icon: GraduationCap },
  { name: 'Contact', href: '#contact', icon: Mail },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  // Track scroll position for navbar background (RAF-throttled)
  useEffect(() => {
    let rafId = 0;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);
        rafId = 0;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Use Intersection Observer for accurate active section detection
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = navigationItems.map(item => item.href.replace('#', ''));
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Focus trap for mobile menu (WCAG compliance)
  useEffect(() => {
    if (!isOpen) return;

    const menu = document.getElementById('mobile-menu');
    if (!menu) return;

    const focusableElements = menu.querySelectorAll<HTMLElement>(
      'button, [href], input, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusableElements.length) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    firstElement.focus();
    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    closeNavbar();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-effect backdrop-blur-xl shadow-lg'
          : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0"
          >
            <Link href="/" className="text-2xl font-serif font-bold" aria-label="Abdalla Eldoumani - Home"
              style={{ color: 'var(--accent-primary)' }}
            >
              AE
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-6">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.href.replace('#', '');

                return (
                  <motion.button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 focus-visible"
                    style={{
                      color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                      backgroundColor: isActive ? 'var(--accent-primary-10)' : 'transparent',
                    }}
                    aria-label={`Navigate to ${item.name} section`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon size={16} aria-hidden="true" />
                    <span>{item.name}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* CTA - Desktop */}
          <div className="hidden lg:flex items-center">
            <Link href="mailto:aamsdoumani@gmail.com">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-effect px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 focus-visible"
              style={{ color: 'var(--text-primary)' }}
              aria-label="Send email to get in touch"
            >
              Get In Touch
            </motion.button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleNavbar}
              className="inline-flex items-center justify-center p-2.5 rounded-full focus-visible transition-all duration-300"
              style={{ color: 'var(--text-secondary)' }}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-controls="mobile-menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 lg:hidden"
              style={{ backgroundColor: 'rgba(12, 12, 14, 0.5)' }}
              onClick={closeNavbar}
              aria-hidden="true"
            />

            {/* Menu */}
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden glass-effect backdrop-blur-xl relative z-50"
              role="menu"
              aria-label="Mobile navigation menu"
            >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navigationItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeSection === item.href.replace('#', '');

                return (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={() => handleNavClick(item.href)}
                    className="flex items-center space-x-3 w-full px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-300 focus-visible"
                    style={{
                      color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                      backgroundColor: isActive ? 'var(--accent-primary-10)' : 'transparent',
                    }}
                    aria-label={`Navigate to ${item.name} section`}
                    aria-current={isActive ? 'page' : undefined}
                    role="menuitem"
                  >
                    <Icon size={20} aria-hidden="true" />
                    <span>{item.name}</span>
                  </motion.button>
                );
              })}

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: navigationItems.length * 0.1 }}
                className="pt-4"
              >
                <Link href="mailto:aamsdoumani@gmail.com">
                  <button
                    className="w-full glass-effect px-4 py-3 rounded-xl font-semibold text-base transition-all duration-300 focus-visible"
                    style={{ color: 'var(--text-primary)' }}
                    aria-label="Send email to get in touch"
                  >
                    Get In Touch
                  </button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
