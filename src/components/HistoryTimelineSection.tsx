'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { WORLD_CUP_HISTORY } from '@/lib/historyData';
import { Trophy, Globe, Calendar } from 'lucide-react';

function TimelineCard({ edition, index }: { edition: typeof WORLD_CUP_HISTORY[0]; index: number }) {
  const isCurrent = edition.year === 2026;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className={`flex-shrink-0 w-[260px] md:w-[300px] glass rounded-2xl overflow-hidden ${
        isCurrent ? 'border border-accent-gold/30 glow-gold' : ''
      }`}
    >
      <div className={`h-1 ${
        isCurrent
          ? 'bg-gradient-to-r from-accent-gold via-accent-cyan to-accent-magenta'
          : 'bg-gradient-to-r from-white/10 to-white/5'
      }`} />

      <div className="p-5">
        {/* Year */}
        <div className="flex items-center justify-between mb-3">
          <span className={`font-display text-3xl font-black ${
            isCurrent ? 'gradient-text' : 'text-white'
          }`}>
            {edition.year}
          </span>
          <span className="text-3xl">{edition.emoji}</span>
        </div>

        {/* Host */}
        <div className="flex items-center gap-1.5 mb-3">
          <Globe className="w-3 h-3 text-text-secondary" />
          <span className="text-xs text-text-secondary">{edition.host}</span>
        </div>

        {/* Winner */}
        <div className={`rounded-xl p-3 mb-2 ${
          isCurrent ? 'bg-accent-gold/10' : 'bg-white/5'
        }`}>
          <div className="flex items-center gap-2">
            <Trophy className={`w-4 h-4 ${isCurrent ? 'text-accent-gold' : 'text-accent-gold/60'}`} />
            <span className={`font-display font-bold text-sm ${
              isCurrent ? 'text-accent-gold' : 'text-white'
            }`}>
              {edition.winner}
            </span>
          </div>
        </div>

        {/* Runner-up & Score */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-text-secondary">
            vs {edition.runnerUp}
          </span>
          <span className="text-white font-mono font-medium">
            {edition.finalScore}
          </span>
        </div>

        {/* Teams count */}
        <div className="mt-2 flex items-center gap-1">
          <span className="text-[10px] text-text-secondary">{edition.teams} teams</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function HistoryTimelineSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="history" className="py-20 md:py-28">
      <div className="section-container mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-accent-gold text-sm font-semibold uppercase tracking-[0.2em]">Since 1930</span>
          <h2 className="font-display text-4xl md:text-5xl font-black mt-3 gradient-text">
            World Cup Heritage
          </h2>
          <p className="text-text-secondary mt-3">96 years of football history — scroll through every tournament</p>
        </motion.div>
      </div>

      {/* Horizontal scrollable timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 pointer-events-none z-0" />

        <div
          ref={scrollRef}
          className="overflow-x-auto pb-6 px-6 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-4 min-w-max py-4">
            {WORLD_CUP_HISTORY.map((edition, i) => (
              <TimelineCard key={edition.year} edition={edition} index={i} />
            ))}
          </div>
        </div>

        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-bg-primary to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-bg-primary to-transparent pointer-events-none z-10" />
      </div>

      {/* Fun stats */}
      <div className="section-container mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Tournaments', value: '23', icon: Calendar, color: 'text-accent-gold' },
            { label: 'Brazil Titles', value: '5', icon: Trophy, color: 'text-accent-green' },
            { label: 'Most Hosts', value: '3', icon: Globe, color: 'text-accent-cyan' },
            { label: 'Teams in 2026', value: '48', icon: Trophy, color: 'text-accent-magenta' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl p-4 text-center"
            >
              <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-2`} />
              <p className="font-display text-2xl font-black text-white">{stat.value}</p>
              <p className="text-[10px] text-text-secondary uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
