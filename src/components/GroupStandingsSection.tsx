'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Match } from '@/lib/fetchMatchData';
import { computeAllGroupStandings, TeamStanding } from '@/lib/computeStandings';
import { getTeamFlagEmoji, GROUP_NAMES } from '@/lib/teamData';

function FormBadge({ result }: { result: string }) {
  return (
    <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold form-${result}`}>
      {result}
    </span>
  );
}

function StandingsTable({ standings, groupName }: { standings: TeamStanding[]; groupName: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="glass rounded-2xl overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-text-secondary font-medium text-xs uppercase tracking-wider">#</th>
              <th className="text-left py-3 px-4 text-text-secondary font-medium text-xs uppercase tracking-wider">Team</th>
              <th className="text-center py-3 px-2 text-text-secondary font-medium text-xs">P</th>
              <th className="text-center py-3 px-2 text-text-secondary font-medium text-xs">W</th>
              <th className="text-center py-3 px-2 text-text-secondary font-medium text-xs">D</th>
              <th className="text-center py-3 px-2 text-text-secondary font-medium text-xs">L</th>
              <th className="text-center py-3 px-2 text-text-secondary font-medium text-xs">GF</th>
              <th className="text-center py-3 px-2 text-text-secondary font-medium text-xs">GA</th>
              <th className="text-center py-3 px-2 text-text-secondary font-medium text-xs">GD</th>
              <th className="text-center py-3 px-2 text-accent-gold font-bold text-xs">PTS</th>
              <th className="text-center py-3 px-4 text-text-secondary font-medium text-xs">Form</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team, idx) => (
              <motion.tr
                key={team.team}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 }}
                className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                  idx < 2 ? 'bg-accent-green/5' : idx === 2 ? 'bg-accent-gold/5' : ''
                }`}
              >
                <td className="py-3 px-4">
                  <span className={`text-xs font-bold ${
                    idx < 2 ? 'text-accent-green' : idx === 2 ? 'text-accent-gold' : 'text-text-secondary'
                  }`}>
                    {idx + 1}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getTeamFlagEmoji(team.team)}</span>
                    <span className="font-semibold text-white text-sm">{team.team}</span>
                  </div>
                </td>
                <td className="text-center py-3 px-2 text-text-secondary">{team.played}</td>
                <td className="text-center py-3 px-2 text-white font-medium">{team.won}</td>
                <td className="text-center py-3 px-2 text-text-secondary">{team.drawn}</td>
                <td className="text-center py-3 px-2 text-text-secondary">{team.lost}</td>
                <td className="text-center py-3 px-2 text-white">{team.goalsFor}</td>
                <td className="text-center py-3 px-2 text-text-secondary">{team.goalsAgainst}</td>
                <td className="text-center py-3 px-2">
                  <span className={team.goalDifference > 0 ? 'text-accent-green' : team.goalDifference < 0 ? 'text-red-400' : 'text-text-secondary'}>
                    {team.goalDifference > 0 ? '+' : ''}{team.goalDifference}
                  </span>
                </td>
                <td className="text-center py-3 px-2">
                  <span className="font-display text-lg font-black text-accent-gold">{team.points}</span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-1 justify-center">
                    {team.form.map((f, i) => (
                      <FormBadge key={i} result={f} />
                    ))}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 px-4 py-2 border-t border-white/5 text-[10px] text-text-secondary">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent-green" /> Qualified</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent-gold" /> Best 3rd</span>
      </div>
    </motion.div>
  );
}

export default function GroupStandingsSection({ matches }: { matches: Match[] }) {
  const [activeGroup, setActiveGroup] = useState('A');
  const allStandings = computeAllGroupStandings(matches);

  return (
    <section id="groups" className="py-20 md:py-28 bg-bg-secondary/30">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-accent-gold text-sm font-semibold uppercase tracking-[0.2em]">Group Stage</span>
          <h2 className="font-display text-4xl md:text-5xl font-black mt-3 gradient-text">
            Standings
          </h2>
          <p className="text-text-secondary mt-3">
            12 groups · 48 teams · Computed live from match results
          </p>
        </motion.div>

        {/* Group Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {GROUP_NAMES.map(group => (
            <motion.button
              key={group}
              onClick={() => setActiveGroup(group)}
              className={`px-4 py-2 rounded-xl font-display font-bold text-sm transition-all duration-300 ${
                activeGroup === group
                  ? 'bg-accent-gold text-bg-primary glow-gold'
                  : 'glass text-text-secondary hover:text-white hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Group {group}
            </motion.button>
          ))}
        </div>

        {/* Table */}
        <AnimatePresence mode="wait">
          <StandingsTable
            key={activeGroup}
            standings={allStandings[`Group ${activeGroup}`] || []}
            groupName={activeGroup}
          />
        </AnimatePresence>
      </div>
    </section>
  );
}
