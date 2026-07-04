'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Match } from '@/lib/fetchMatchData';
import { getTeamFlagEmoji } from '@/lib/teamData';
import { Filter, ChevronDown, MapPin, Calendar } from 'lucide-react';

const ROUNDS = [
  'All Rounds',
  'Matchday 1', 'Matchday 2', 'Matchday 3', 'Matchday 4', 'Matchday 5',
  'Matchday 6', 'Matchday 7', 'Matchday 8', 'Matchday 9', 'Matchday 10',
  'Matchday 11', 'Matchday 12', 'Matchday 13', 'Matchday 14', 'Matchday 15',
  'Matchday 16', 'Matchday 17',
  'Round of 32', 'Round of 16', 'Quarter-final', 'Semi-final', 'Final'
];

const ROUND_CATEGORIES = ['All Rounds', 'Group Stage', 'Round of 32', 'Round of 16', 'Quarter-final', 'Semi-final', 'Final'];

export default function ScheduleSection({ matches }: { matches: Match[] }) {
  const [activeRound, setActiveRound] = useState('All Rounds');
  const [showGoals, setShowGoals] = useState<Record<number, boolean>>({});

  const toggleGoals = (idx: number) => {
    setShowGoals(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const filtered = activeRound === 'All Rounds'
    ? matches
    : activeRound === 'Group Stage'
    ? matches.filter(m => m.round.startsWith('Matchday'))
    : matches.filter(m => m.round === activeRound);

  // Sort by date then match number
  const sorted = [...filtered].sort((a, b) => {
    const dateComp = a.date.localeCompare(b.date);
    if (dateComp !== 0) return dateComp;
    return (a.num || 0) - (b.num || 0);
  });

  // Group by date
  const byDate: Record<string, Match[]> = {};
  for (const m of sorted) {
    if (!byDate[m.date]) byDate[m.date] = [];
    byDate[m.date].push(m);
  }

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <section id="schedule" className="py-20 md:py-28">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-accent-magenta text-sm font-semibold uppercase tracking-[0.2em]">Full Schedule</span>
          <h2 className="font-display text-4xl md:text-5xl font-black mt-3 gradient-text">
            Match Schedule
          </h2>
          <p className="text-text-secondary mt-3">All 104 matches with detailed goal scorers</p>
        </motion.div>

        {/* Round filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {ROUND_CATEGORIES.map(round => (
            <motion.button
              key={round}
              onClick={() => setActiveRound(round)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeRound === round
                  ? 'bg-accent-magenta text-white glow-magenta'
                  : 'glass text-text-secondary hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {round}
            </motion.button>
          ))}
        </div>

        {/* Match list by date */}
        <div className="space-y-8 max-w-4xl mx-auto">
          {Object.entries(byDate).map(([date, dateMatches]) => (
            <div key={date}>
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="w-4 h-4 text-accent-gold" />
                <h3 className="font-display font-bold text-sm text-accent-gold uppercase tracking-wider">
                  {formatDate(date)}
                </h3>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              <div className="space-y-2">
                {dateMatches.map((match, i) => {
                  const globalIdx = sorted.indexOf(match);
                  const hasScore = match.score?.ft;
                  const hasGoals = (match.goals1?.length || 0) + (match.goals2?.length || 0) > 0;

                  return (
                    <motion.div
                      key={globalIdx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04 }}
                      className="glass rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => hasGoals && toggleGoals(globalIdx)}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/5 transition-colors"
                      >
                        {/* Round label */}
                        <span className="text-[10px] text-text-secondary font-medium min-w-[80px] text-left truncate">
                          {match.group || match.round}
                        </span>

                        {/* Team 1 */}
                        <div className="flex-1 flex items-center justify-end gap-1.5">
                          <span className="text-sm font-semibold text-white truncate">{match.team1}</span>
                          <span className="text-base">{getTeamFlagEmoji(match.team1)}</span>
                        </div>

                        {/* Score */}
                        <div className="min-w-[60px] text-center">
                          {hasScore ? (
                            <span className="font-display font-black text-white">
                              {match.score!.ft![0]} - {match.score!.ft![1]}
                            </span>
                          ) : (
                            <span className="text-xs text-text-secondary">{match.time?.split(' ')[0] || 'TBD'}</span>
                          )}
                        </div>

                        {/* Team 2 */}
                        <div className="flex-1 flex items-center gap-1.5">
                          <span className="text-base">{getTeamFlagEmoji(match.team2)}</span>
                          <span className="text-sm font-semibold text-white truncate">{match.team2}</span>
                        </div>

                        {/* Expand indicator */}
                        {hasGoals && (
                          <ChevronDown
                            className={`w-4 h-4 text-text-secondary transition-transform ${showGoals[globalIdx] ? 'rotate-180' : ''}`}
                          />
                        )}
                      </button>

                      {/* Expanded goal details */}
                      <AnimatePresence>
                        {showGoals[globalIdx] && hasGoals && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-3 flex gap-4 border-t border-white/5 pt-2">
                              <div className="flex-1 text-right space-y-0.5">
                                {match.goals1?.map((g, gi) => (
                                  <p key={gi} className="text-[11px] text-text-secondary">
                                    ⚽ {g.name} {g.minute}&apos;{g.penalty ? ' 🎯' : ''}{g.owngoal ? ' 🔴OG' : ''}
                                  </p>
                                ))}
                              </div>
                              <div className="flex-1 text-left space-y-0.5">
                                {match.goals2?.map((g, gi) => (
                                  <p key={gi} className="text-[11px] text-text-secondary">
                                    ⚽ {g.name} {g.minute}&apos;{g.penalty ? ' 🎯' : ''}{g.owngoal ? ' 🔴OG' : ''}
                                  </p>
                                ))}
                              </div>
                            </div>
                            <div className="px-4 pb-2 text-center">
                              <span className="text-[10px] text-text-secondary flex items-center justify-center gap-1">
                                <MapPin className="w-3 h-3" /> {match.ground}
                                {match.score?.et && ` · AET ${match.score.et[0]}-${match.score.et[1]}`}
                                {match.score?.p && ` · PEN ${match.score.p[0]}-${match.score.p[1]}`}
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
