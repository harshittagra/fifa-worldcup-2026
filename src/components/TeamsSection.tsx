'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Match, getCompletedMatches, getMatchResult } from '@/lib/fetchMatchData';
import { TEAMS, getTeamFlagEmoji, GROUP_NAMES } from '@/lib/teamData';
import { Users, Target, Shield, TrendingUp } from 'lucide-react';

interface TeamStats {
  name: string;
  group: string;
  matches: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  topScorer: { name: string; goals: number } | null;
  elo: number;
  bestFinish: string;
}

function computeTeamStats(teamName: string, allMatches: Match[]): TeamStats {
  const completed = getCompletedMatches(allMatches);
  const teamMatches = completed.filter(m => m.team1 === teamName || m.team2 === teamName);
  const team = TEAMS[teamName];

  let wins = 0, draws = 0, losses = 0, goalsFor = 0, goalsAgainst = 0;
  const scorerMap: Record<string, number> = {};

  for (const m of teamMatches) {
    const isTeam1 = m.team1 === teamName;
    const [s1, s2] = m.score!.ft!;
    const gs = isTeam1 ? s1 : s2;
    const gc = isTeam1 ? s2 : s1;
    goalsFor += gs;
    goalsAgainst += gc;

    const result = getMatchResult(m);
    if (result.winner === teamName) wins++;
    else if (result.draw) draws++;
    else losses++;

    const goals = isTeam1 ? (m.goals1 || []) : (m.goals2 || []);
    for (const g of goals) {
      if (!g.owngoal) {
        scorerMap[g.name] = (scorerMap[g.name] || 0) + 1;
      }
    }
  }

  const topScorer = Object.entries(scorerMap).sort((a, b) => b[1] - a[1])[0];

  return {
    name: teamName,
    group: team?.group || '?',
    matches: teamMatches.length,
    wins, draws, losses,
    goalsFor, goalsAgainst,
    topScorer: topScorer ? { name: topScorer[0], goals: topScorer[1] } : null,
    elo: team?.elo || 1500,
    bestFinish: team?.bestFinish || 'N/A'
  };
}

function TeamCard({ stats, index }: { stats: TeamStats; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const team = TEAMS[stats.name];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      layout
      className="match-card glass rounded-2xl overflow-hidden cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="p-4">
        {/* Team header */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{getTeamFlagEmoji(stats.name)}</span>
          <div className="flex-1">
            <h3 className="font-display font-bold text-white text-sm">{stats.name}</h3>
            <p className="text-[11px] text-text-secondary">Group {stats.group} · ELO {stats.elo}</p>
          </div>
          <div className="text-right">
            <span className="font-display text-xl font-black text-accent-gold">{stats.wins * 3 + stats.draws}</span>
            <p className="text-[10px] text-text-secondary">pts</p>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-4 gap-2">
          <div className="text-center">
            <p className="text-lg font-bold text-white">{stats.matches}</p>
            <p className="text-[9px] text-text-secondary uppercase">Played</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-accent-green">{stats.wins}</p>
            <p className="text-[9px] text-text-secondary uppercase">Won</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-white">{stats.goalsFor}</p>
            <p className="text-[9px] text-text-secondary uppercase">GF</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-text-secondary">{stats.goalsAgainst}</p>
            <p className="text-[9px] text-text-secondary uppercase">GA</p>
          </div>
        </div>

        {/* Expanded details */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
                {stats.topScorer && (
                  <div className="flex items-center gap-2 text-xs">
                    <Target className="w-3 h-3 text-accent-gold" />
                    <span className="text-text-secondary">Top Scorer:</span>
                    <span className="text-white font-medium">{stats.topScorer.name} ({stats.topScorer.goals} goals)</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-xs">
                  <Shield className="w-3 h-3 text-accent-cyan" />
                  <span className="text-text-secondary">Best WC Finish:</span>
                  <span className="text-white font-medium">{stats.bestFinish}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <TrendingUp className="w-3 h-3 text-accent-magenta" />
                  <span className="text-text-secondary">Goal Diff:</span>
                  <span className={`font-medium ${stats.goalsFor - stats.goalsAgainst > 0 ? 'text-accent-green' : stats.goalsFor - stats.goalsAgainst < 0 ? 'text-red-400' : 'text-text-secondary'}`}>
                    {stats.goalsFor - stats.goalsAgainst > 0 ? '+' : ''}{stats.goalsFor - stats.goalsAgainst}
                  </span>
                </div>
                {team?.starPlayers && team.starPlayers.length > 0 && (
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-accent-gold">⭐</span>
                    <span className="text-text-secondary">Stars:</span>
                    <span className="text-white font-medium truncate">{team.starPlayers.slice(0, 3).join(', ')}</span>
                  </div>
                )}
                
                <div className="pt-2">
                  <a href={`/teams/${encodeURIComponent(stats.name)}`} className="block w-full py-2 text-center text-xs font-bold text-bg-primary bg-accent-gold rounded-lg hover:bg-white transition-colors">
                    View Full Profile & History
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function TeamsSection({ matches }: { matches: Match[] }) {
  const [filterGroup, setFilterGroup] = useState<string | null>(null);

  const teamNames = Object.keys(TEAMS);
  const allStats = teamNames.map(name => computeTeamStats(name, matches));

  const filtered = filterGroup
    ? allStats.filter(s => s.group === filterGroup)
    : allStats;

  // Sort by points then GD
  filtered.sort((a, b) => {
    const ptsA = a.wins * 3 + a.draws;
    const ptsB = b.wins * 3 + b.draws;
    if (ptsB !== ptsA) return ptsB - ptsA;
    return (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst);
  });

  return (
    <section id="teams" className="py-20 md:py-28 bg-bg-secondary/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-accent-green text-sm font-semibold uppercase tracking-[0.2em]">All Nations</span>
          <h2 className="font-display text-4xl md:text-5xl font-black mt-3 gradient-text">
            48 Teams
          </h2>
          <p className="text-text-secondary mt-3">Click any team for detailed stats and star players</p>
        </motion.div>

        {/* Group filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <motion.button
            onClick={() => setFilterGroup(null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              !filterGroup ? 'bg-accent-green text-bg-primary' : 'glass text-text-secondary hover:text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All
          </motion.button>
          {GROUP_NAMES.map(g => (
            <motion.button
              key={g}
              onClick={() => setFilterGroup(g)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterGroup === g ? 'bg-accent-green text-bg-primary' : 'glass text-text-secondary hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {g}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((stats, i) => (
            <TeamCard key={stats.name} stats={stats} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
