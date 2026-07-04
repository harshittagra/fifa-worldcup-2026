'use client';

import { motion } from 'framer-motion';
import { Match } from '@/lib/fetchMatchData';
import { getTeamFlagEmoji } from '@/lib/teamData';
import { Clock, MapPin, Zap, Calendar } from 'lucide-react';

function MatchCard({ match, index }: { match: Match; index: number }) {
  const hasScore = match.score?.ft;
  const hasPenalties = match.score?.p;
  const hasExtraTime = match.score?.et;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="match-card glass rounded-2xl p-5 relative overflow-hidden group"
    >
      {/* Accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-gold via-accent-cyan to-accent-magenta opacity-60 group-hover:opacity-100 transition-opacity" />

      {/* Round badge */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-accent-gold uppercase tracking-wider">
          {match.round}
        </span>
        {!hasScore && (
          <span className="flex items-center gap-1 text-xs text-accent-green">
            <Zap className="w-3 h-3" />
            UPCOMING
          </span>
        )}
        {hasScore && (
          <span className="text-xs text-text-secondary">FT</span>
        )}
      </div>

      {/* Teams & Score */}
      <div className="flex items-center justify-between gap-3">
        {/* Team 1 */}
        <div className="flex-1 text-right">
          <div className="flex items-center justify-end gap-2">
            <span className="font-display font-bold text-sm md:text-base text-white truncate">
              {match.team1}
            </span>
            <span className="text-xl md:text-2xl">{getTeamFlagEmoji(match.team1)}</span>
          </div>
        </div>

        {/* Score */}
        <div className="flex flex-col items-center min-w-[80px]">
          {hasScore ? (
            <>
              <div className="flex items-center gap-2">
                <span className="font-display text-2xl md:text-3xl font-black text-white">
                  {match.score!.ft![0]}
                </span>
                <span className="text-text-secondary text-lg">-</span>
                <span className="font-display text-2xl md:text-3xl font-black text-white">
                  {match.score!.ft![1]}
                </span>
              </div>
              {hasExtraTime && (
                <span className="text-[10px] text-accent-cyan font-medium mt-0.5">
                  AET {match.score!.et![0]}-{match.score!.et![1]}
                </span>
              )}
              {hasPenalties && (
                <span className="text-[10px] text-accent-magenta font-medium">
                  PEN {match.score!.p![0]}-{match.score!.p![1]}
                </span>
              )}
            </>
          ) : (
            <span className="font-display text-lg font-bold text-text-secondary">VS</span>
          )}
        </div>

        {/* Team 2 */}
        <div className="flex-1 text-left">
          <div className="flex items-center gap-2">
            <span className="text-xl md:text-2xl">{getTeamFlagEmoji(match.team2)}</span>
            <span className="font-display font-bold text-sm md:text-base text-white truncate">
              {match.team2}
            </span>
          </div>
        </div>
      </div>

      {/* Goal scorers */}
      {hasScore && (match.goals1?.length || match.goals2?.length) ? (
        <div className="flex justify-between mt-3 pt-3 border-t border-white/5">
          <div className="flex-1 text-right">
            {match.goals1?.map((g, i) => (
              <p key={i} className="text-[11px] text-text-secondary">
                {g.name} {g.minute}&apos;{g.penalty ? ' (P)' : ''}{g.owngoal ? ' (OG)' : ''}
              </p>
            ))}
          </div>
          <div className="w-12 flex items-center justify-center">
            <span className="text-[10px] text-text-secondary">⚽</span>
          </div>
          <div className="flex-1 text-left">
            {match.goals2?.map((g, i) => (
              <p key={i} className="text-[11px] text-text-secondary">
                {g.name} {g.minute}&apos;{g.penalty ? ' (P)' : ''}{g.owngoal ? ' (OG)' : ''}
              </p>
            ))}
          </div>
        </div>
      ) : null}

      {/* Meta info */}
      <div className="flex items-center justify-center gap-4 mt-3 text-[11px] text-text-secondary">
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {match.date}
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {match.ground.split('(')[0].trim()}
        </span>
      </div>
    </motion.div>
  );
}

export default function LiveScoresSection({ matches }: { matches: Match[] }) {
  // Get most recent completed + upcoming
  const completed = matches.filter(m => m.score?.ft).sort((a, b) => {
    const dateComp = b.date.localeCompare(a.date);
    if (dateComp !== 0) return dateComp;
    return (b.num || 0) - (a.num || 0);
  });
  const upcoming = matches.filter(m => !m.score?.ft).sort((a, b) => {
    const dateComp = a.date.localeCompare(b.date);
    if (dateComp !== 0) return dateComp;
    return (a.num || 0) - (b.num || 0);
  });

  const recentResults = completed.slice(0, 8);
  const nextMatches = upcoming.slice(0, 4);

  return (
    <section id="live-scores" className="py-20 md:py-28 relative">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-accent-cyan text-sm font-semibold uppercase tracking-[0.2em]">Live Dashboard</span>
          <h2 className="font-display text-4xl md:text-5xl font-black mt-3 gradient-text">
            Scores & Results
          </h2>
          <p className="text-text-secondary mt-3 max-w-xl mx-auto">
            Latest results from the FIFA World Cup 2026. All scores update automatically.
          </p>
        </motion.div>

        {/* Upcoming Matches */}
        {nextMatches.length > 0 && (
          <>
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-5 h-5 text-accent-green" />
              <h3 className="font-display text-xl font-bold text-white">Upcoming Matches</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
              {nextMatches.map((match, i) => (
                <MatchCard key={`upcoming-${i}`} match={match} index={i} />
              ))}
            </div>
          </>
        )}

        {/* Recent Results */}
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-5 h-5 text-accent-gold" />
          <h3 className="font-display text-xl font-bold text-white">Recent Results</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentResults.map((match, i) => (
            <MatchCard key={`recent-${i}`} match={match} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
