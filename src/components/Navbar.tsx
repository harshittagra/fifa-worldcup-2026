'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'live-scores', label: 'Scores' },
  { id: 'groups', label: 'Groups' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'teams', label: 'Teams' },
  { id: 'bracket', label: 'Bracket' },
  { id: 'predictions', label: 'Predictions' },
  { id: 'history', label: 'History' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section
      const sections = NAV_LINKS.map(l => document.getElementById(l.id)).filter(Boolean);
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.getBoundingClientRect().top <= 120) {
          setActiveSection(NAV_LINKS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass-strong shadow-2xl shadow-black/30'
            : 'bg-transparent'
        }`}
      >
        <div className="section-container flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <motion.button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Trophy className="w-6 h-6 text-accent-gold" />
            <span className="font-display font-bold text-lg gradient-text tracking-wider">
              FIFA 2026
            </span>
          </motion.button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <motion.button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeSection === link.id
                    ? 'text-accent-gold bg-accent-gold/10'
                    : 'text-text-secondary hover:text-white hover:bg-white/5'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.label}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            className="md:hidden p-2 text-text-secondary hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 glass-strong pt-20 px-6"
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(link.id)}
                  className={`text-left px-4 py-3 rounded-xl text-lg font-medium transition-all ${
                    activeSection === link.id
                      ? 'text-accent-gold bg-accent-gold/10'
                      : 'text-text-secondary hover:text-white'
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
