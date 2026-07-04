'use client';

import { motion } from 'framer-motion';
import { Match, getUpcomingMatches } from '@/lib/fetchMatchData';
import { predictMatch, MatchPrediction } from '@/lib/predictionEngine';
import { getTeamFlagEmoji, TEAMS } from '@/lib/teamData';
import { Brain, TrendingUp, Target, Shield, Zap, ChevronRight } from 'lucide-react';

function ProbabilityBar({ team1: t1, team2: t2, prediction }: { team1: string; team2: string; prediction: MatchPrediction }) {
  const w1 = Math.round(prediction.team1WinProbability * 100);
  const w2 = Math.round(prediction.team2WinProbability * 100);
  const draw = Math.round(prediction.drawProbability * 100);

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs mb-1">
        <span className="font-bold text-accent-cyan">{w1}%</span>
        <span className="text-text-secondary">{draw}% draw</span>
        <span className="font-bold text-accent-magenta">{w2}%</span>
      </div>
      <div className="flex h-3 rounded-full overflow-hidden bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${w1}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          className="bg-gradient-to-r from-accent-cyan to-accent-cyan/60"
        />
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${draw}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          className="bg-white/20"
        />
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${w2}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.7, ease: 'easeOut' }}
          className="bg-gradient-to-r from-accent-magenta/60 to-accent-magenta"
        />
      </div>
    </div>
  );
}

function PredictionCard({ match, allMatches, index }: { match: Match; allMatches: Match[]; index: number }) {
  // Skip placeholder matches
  if (match.team1.startsWith('W') || match.team1.startsWith('L')) return null;

  const prediction = predictMatch(match.team1, match.team2, allMatches);

  const confidenceColor = prediction.confidence === 'HIGH'
    ? 'text-accent-green'
    : prediction.confidence === 'MEDIUM'
    ? 'text-accent-gold'
    : 'text-accent-magenta';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="glass rounded-2xl overflow-hidden border-gradient"
    >
      <div className="p-6">
        {/* Match header */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-accent-gold uppercase tracking-wider">
            {match.round}
          </span>
          <span className={`text-xs font-bold ${confidenceColor} flex items-center gap-1`}>
            <Brain className="w-3 h-3" />
            {prediction.confidence} CONFIDENCE
          </span>
        </div>

        <div className="text-[10px] text-text-secondary mb-4">
          {match.date} · {match.ground.split('(')[0].trim()}
        </div>

        {/* Teams face-off */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex-1 text-center">
            <span className="text-4xl block mb-2">{getTeamFlagEmoji(match.team1)}</span>
            <h4 className="font-display font-bold text-white text-sm">{match.team1}</h4>
            <p className="text-[10px] text-text-secondary">ELO {prediction.team1Stats.elo}</p>
          </div>

          <div className="flex flex-col items-center">
            <span className="font-display text-2xl font-black gradient-text">VS</span>
            <span className="text-[10px] text-text-secondary mt-1">
              Predicted: <span className="text-accent-gold font-bold">{prediction.predictedWinner}</span>
            </span>
          </div>

          <div className="flex-1 text-center">
            <span className="text-4xl block mb-2">{getTeamFlagEmoji(match.team2)}</span>
            <h4 className="font-display font-bold text-white text-sm">{match.team2}</h4>
            <p className="text-[10px] text-text-secondary">ELO {prediction.team2Stats.elo}</p>
          </div>
        </div>

        {/* Probability bar */}
        <ProbabilityBar team1={match.team1} team2={match.team2} prediction={prediction} />

        {/* Stats comparison */}
        <div className="grid grid-cols-3 gap-2 mt-4 text-center">
          <div className="glass rounded-lg p-2">
            <p className="font-display font-bold text-white">{prediction.team1Stats.goalsScored}</p>
            <p className="text-[9px] text-text-secondary">Goals</p>
          </div>
          <div className="glass rounded-lg p-2">
            <p className="font-display font-bold text-accent-gold">{prediction.team1Stats.matchesPlayed}</p>
            <p className="text-[9px] text-text-secondary">Matches</p>
          </div>
          <div className="glass rounded-lg p-2">
            <p className="font-display font-bold text-white">{prediction.team2Stats.goalsScored}</p>
            <p className="text-[9px] text-text-secondary">Goals</p>
          </div>
        </div>

        {/* Detailed reasons */}
        <div className="mt-5 pt-4 border-t border-white/10">
          <h5 className="text-xs font-bold text-white mb-3 flex items-center gap-1.5">
            <Brain className="w-3.5 h-3.5 text-accent-gold" />
            Analysis & Reasoning
          </h5>
          <div className="space-y-2">
            {prediction.reasons.map((reason, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="flex items-start gap-2"
              >
                <span className="text-sm mt-0.5">{reason.emoji}</span>
                <p className={`text-[11px] leading-relaxed ${
                  reason.advantage === 'team1' ? 'text-accent-cyan' :
                  reason.advantage === 'team2' ? 'text-accent-magenta' :
                  'text-text-secondary'
                }`}>
                  {reason.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function PredictionsSection({ matches }: { matches: Match[] }) {
  const upcoming = getUpcomingMatches(matches).filter(
    m => !m.team1.startsWith('W') && !m.team1.startsWith('L')
  );

  if (upcoming.length === 0) {
    return (
      <section id="predictions" className="py-20 md:py-28 bg-bg-secondary/30">
        <div className="section-container text-center">
          <span className="text-accent-gold text-sm font-semibold uppercase tracking-[0.2em]">AI Predictions</span>
          <h2 className="font-display text-4xl md:text-5xl font-black mt-3 gradient-text">
            Match Predictions
          </h2>
          <p className="text-text-secondary mt-6">All scheduled matches have been played. Check back for new fixtures!</p>
        </div>
      </section>
    );
  }

  return (
    <section id="predictions" className="py-20 md:py-28 bg-bg-secondary/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-accent-gold text-sm font-semibold uppercase tracking-[0.2em]">🔮 AI Predictions</span>
          <h2 className="font-display text-4xl md:text-5xl font-black mt-3 gradient-text">
            Who Will Win?
          </h2>
          <p className="text-text-secondary mt-3 max-w-2xl mx-auto">
            Our heuristic prediction engine analyzes ELO ratings, tournament form, goal-scoring records,
            and defensive strength to predict upcoming match outcomes with detailed reasoning.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {upcoming.slice(0, 8).map((match, i) => (
            <PredictionCard key={i} match={match} allMatches={matches} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
