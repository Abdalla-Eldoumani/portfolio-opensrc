"use client";

import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, MapPin, ArrowUpRight } from 'lucide-react';
import { motionVariants, animationConfigs } from '@/lib/constants/animations';

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: 'aamsdoumani@gmail.com',
    href: 'mailto:aamsdoumani@gmail.com',
    colorVar: '--highlight-1'
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'AbdallaEldoumani',
    href: 'https://www.linkedin.com/in/abdallaeldoumani/',
    colorVar: '--highlight-2'
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'Abdalla-Eldoumani',
    href: 'https://github.com/Abdalla-Eldoumani',
    colorVar: '--highlight-3'
  }
];

export const Contact = () => {
  return (
    <section className="py-28" style={{ backgroundColor: 'var(--primary-bg)', color: 'var(--text-primary)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={motionVariants.slideUp.hidden}
          whileInView={motionVariants.slideUp.visible}
          transition={{ duration: 0.6, ease: animationConfigs.entrance.ease }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-display text-4xl sm:text-5xl mb-4">
            Let&apos;s <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-xl text-body max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Open to new opportunities, collaborations, and conversations about technology and building exceptional products.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: animationConfigs.entrance.ease }}
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            const getEntryDirection = () => {
              if (index === 0) return { x: -50, y: 0 };
              if (index === 2) return { x: 50, y: 0 };
              return { x: 0, y: 30 };
            };
            return (
              <motion.a
                key={method.label}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, ...getEntryDirection() }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: animationConfigs.entrance.ease }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ y: -4 }}
                className="glass-effect-static p-6 rounded-xl hover-lift group"
                aria-label={`Open ${method.label}: ${method.value} in new tab`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: 'var(--tertiary-bg)', color: `var(${method.colorVar})` }}
                  >
                    <Icon size={24} />
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                    style={{ color: 'var(--text-muted)' }}
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                  {method.label}
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  {method.value}
                </p>
              </motion.a>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="glass-effect-static p-8 md:p-12 rounded-2xl text-center"
        >
          <div className="flex items-center justify-center mb-6">
            <MapPin size={20} style={{ color: 'var(--accent-primary)' }} className="mr-2" />
            <span style={{ color: 'var(--text-secondary)' }}>Based in Calgary, Alberta, Canada</span>
          </div>

          <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4" style={{ letterSpacing: '-0.025em', color: 'var(--text-primary)' }}>
            Ready to build something exceptional?
          </h3>
          <p className="text-lg text-body mb-8 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Whether you&apos;re looking for a developer, have a project in mind, or just want to chat about technology — I&apos;d love to hear from you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="mailto:aamsdoumani@gmail.com"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 glass-effect-static px-8 py-4 rounded-full font-semibold hover-lift interactive-element"
              style={{ color: 'var(--text-primary)' }}
            >
              <Mail size={20} />
              Send a Message
            </motion.a>
            <motion.a
              href="/resume"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold interactive-element"
              style={{
                border: '1px solid var(--border-primary)',
                color: 'var(--text-secondary)'
              }}
            >
              Download Resume
              <ArrowUpRight size={18} />
            </motion.a>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          role="contentinfo"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mt-16 pt-8 text-center"
          style={{
            borderTop: '1px solid var(--border-primary)',
            color: 'var(--text-muted)'
          }}
        >
          <p className="text-sm text-center mx-auto">
            &copy; {new Date().getFullYear()} Designed & Built by Abdalla Eldoumani.
          </p>
        </motion.footer>
      </div>
    </section>
  );
};
