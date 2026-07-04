'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, MapPin, Calendar, Users } from 'lucide-react';

// Animated counter component
function AnimatedCounter({ target, duration = 2, suffix = '' }: { target: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = Date.now();
          const animate = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// Floating particles
function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 1,
            height: Math.random() * 4 + 1,
            background: i % 3 === 0 ? 'rgba(212, 168, 67, 0.4)' : i % 3 === 1 ? 'rgba(0, 212, 255, 0.3)' : 'rgba(255, 255, 255, 0.15)',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -(Math.random() * 200 + 100)],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 6 + 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

import dynamic from 'next/dynamic';

const Globe3D = dynamic(() => import('./Globe3D'), { ssr: false });

export default function HeroSection() {
  const scrollToScores = () => {
    const el = document.getElementById('live-scores');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden">
      <Globe3D />

      {/* Radial glow behind title */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 section-container text-center py-32">
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-accent-green pulse-live" />
          <span className="text-sm text-text-secondary font-medium">TOURNAMENT LIVE — Round of 16</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-6xl md:text-8xl lg:text-9xl font-black tracking-tight mb-4"
        >
          <span className="gradient-text">FIFA</span>
          <br />
          <span className="text-white">WORLD CUP</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-display text-4xl md:text-6xl font-bold gradient-text-cyan mb-8"
        >
          2026
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-12"
        >
          USA · Mexico · Canada — The biggest World Cup in history.
          <br />
          48 nations. 104 matches. One champion.
        </motion.p>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-wrap justify-center gap-6 md:gap-12 mb-16"
        >
          <div className="glass rounded-2xl px-6 py-4 min-w-[140px]">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Users className="w-4 h-4 text-accent-gold" />
              <span className="text-text-secondary text-xs uppercase tracking-wider">Teams</span>
            </div>
            <p className="font-display text-3xl font-bold text-white">
              <AnimatedCounter target={48} />
            </p>
          </div>
          <div className="glass rounded-2xl px-6 py-4 min-w-[140px]">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-accent-cyan" />
              <span className="text-text-secondary text-xs uppercase tracking-wider">Matches</span>
            </div>
            <p className="font-display text-3xl font-bold text-white">
              <AnimatedCounter target={104} />
            </p>
          </div>
          <div className="glass rounded-2xl px-6 py-4 min-w-[140px]">
            <div className="flex items-center justify-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-accent-magenta" />
              <span className="text-text-secondary text-xs uppercase tracking-wider">Venues</span>
            </div>
            <p className="font-display text-3xl font-bold text-white">
              <AnimatedCounter target={16} />
            </p>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          onClick={scrollToScores}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-display font-semibold text-lg overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Button gradient bg */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent-gold to-accent-cyan opacity-90 group-hover:opacity-100 transition-opacity" />
          <span className="relative text-bg-primary font-bold">Explore Scores</span>
          <ChevronDown className="relative w-5 h-5 text-bg-primary animate-bounce" />
        </motion.button>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg-primary to-transparent" />
    </section>
  );
}
