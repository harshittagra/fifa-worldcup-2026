'use client';

import { motion } from 'framer-motion';
import { Match, getMatchResult } from '@/lib/fetchMatchData';
import { getTeamFlagEmoji } from '@/lib/teamData';

function BracketMatch({ match, delay = 0 }: { match: Match; delay?: number }) {
  const hasScore = match.score?.ft;
  const result = hasScore ? getMatchResult(match) : null;
  const isPlaceholder = match.team1.startsWith('W') || match.team1.startsWith('L');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className={`glass rounded-xl p-3 min-w-[200px] border ${
        hasScore ? 'border-accent-gold/20' : 'border-dashed border-white/10'
      }`}
    >
      {/* Match number */}
      {match.num && (
        <div className="text-[9px] text-text-secondary mb-1 text-center">
          Match {match.num}
        </div>
      )}

      {/* Team 1 */}
      <div className={`flex items-center justify-between py-1.5 px-2 rounded-lg mb-1 ${
        result?.winner === match.team1 ? 'bg-accent-gold/10' : ''
      }`}>
        <div className="flex items-center gap-2">
          {!isPlaceholder && <span className="text-sm">{getTeamFlagEmoji(match.team1)}</span>}
          <span className={`text-xs font-semibold ${
            result?.winner === match.team1 ? 'text-accent-gold' : 'text-white'
          } ${isPlaceholder ? 'text-text-secondary' : ''}`}>
            {match.team1}
          </span>
        </div>
        {hasScore && (
          <span className={`font-display font-bold text-sm ${
            result?.winner === match.team1 ? 'text-accent-gold' : 'text-text-secondary'
          }`}>
            {match.score!.ft![0]}
          </span>
        )}
      </div>

      {/* Team 2 */}
      <div className={`flex items-center justify-between py-1.5 px-2 rounded-lg ${
        result?.winner === match.team2 ? 'bg-accent-gold/10' : ''
      }`}>
        <div className="flex items-center gap-2">
          {!isPlaceholder && <span className="text-sm">{getTeamFlagEmoji(match.team2)}</span>}
          <span className={`text-xs font-semibold ${
            result?.winner === match.team2 ? 'text-accent-gold' : 'text-white'
          } ${isPlaceholder ? 'text-text-secondary' : ''}`}>
            {match.team2}
          </span>
        </div>
        {hasScore && (
          <span className={`font-display font-bold text-sm ${
            result?.winner === match.team2 ? 'text-accent-gold' : 'text-text-secondary'
          }`}>
            {match.score!.ft![1]}
          </span>
        )}
      </div>

      {/* Penalties / ET */}
      {match.score?.p && (
        <div className="text-center mt-1">
          <span className="text-[9px] text-accent-magenta font-medium">
            PEN {match.score.p[0]}-{match.score.p[1]}
          </span>
        </div>
      )}
      {match.score?.et && !match.score?.p && (
        <div className="text-center mt-1">
          <span className="text-[9px] text-accent-cyan font-medium">
            AET {match.score.et[0]}-{match.score.et[1]}
          </span>
        </div>
      )}

      {/* Venue */}
      <div className="text-center mt-1">
        <span className="text-[9px] text-text-secondary">{match.ground.split('(')[0].trim()}</span>
      </div>
    </motion.div>
  );
}

export default function KnockoutBracketSection({ matches }: { matches: Match[] }) {
  const knockoutMatches = matches.filter(m => !m.group);

  const r32 = knockoutMatches.filter(m => m.round === 'Round of 32');
  const r16 = knockoutMatches.filter(m => m.round === 'Round of 16');
  const qf = knockoutMatches.filter(m => m.round === 'Quarter-final');
  const sf = knockoutMatches.filter(m => m.round === 'Semi-final');
  const thirdPlace = knockoutMatches.filter(m => m.round === 'Match for third place');
  const final = knockoutMatches.filter(m => m.round === 'Final');

  const rounds = [
    { name: 'Round of 32', matches: r32, color: 'text-accent-cyan' },
    { name: 'Round of 16', matches: r16, color: 'text-accent-green' },
    { name: 'Quarter-finals', matches: qf, color: 'text-accent-magenta' },
    { name: 'Semi-finals', matches: sf, color: 'text-accent-gold' },
    { name: '3rd Place', matches: thirdPlace, color: 'text-accent-cyan' },
    { name: 'Final', matches: final, color: 'text-accent-gold' },
  ].filter(r => r.matches.length > 0);

  return (
    <section id="bracket" className="py-20 md:py-28">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-accent-cyan text-sm font-semibold uppercase tracking-[0.2em]">Knockout Stage</span>
          <h2 className="font-display text-4xl md:text-5xl font-black mt-3 gradient-text">
            Tournament Bracket
          </h2>
          <p className="text-text-secondary mt-3">From 32 to the Final — the road to glory</p>
        </motion.div>

        <div className="space-y-12">
          {rounds.map((round, ri) => (
            <div key={round.name}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-4"
              >
                <div className={`w-3 h-3 rounded-full ${
                  round.name === 'Final' ? 'bg-accent-gold glow-gold' : 'bg-white/20'
                }`} />
                <h3 className={`font-display text-xl font-bold ${round.color}`}>
                  {round.name}
                </h3>
                <span className="text-xs text-text-secondary">
                  {round.matches.length} match{round.matches.length > 1 ? 'es' : ''}
                </span>
                <div className="flex-1 h-px bg-white/10" />
              </motion.div>

              <div className={`grid gap-3 ${
                round.matches.length >= 8 ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' :
                round.matches.length >= 4 ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' :
                round.matches.length >= 2 ? 'grid-cols-1 sm:grid-cols-2' :
                'grid-cols-1 max-w-sm mx-auto'
              }`}>
                {round.matches.map((match, mi) => (
                  <BracketMatch
                    key={match.num || mi}
                    match={match}
                    delay={ri * 0.1 + mi * 0.05}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
