// Prediction Engine — ELO + tournament form heuristic for match prediction

import { Match, getCompletedMatches, getMatchResult } from './fetchMatchData';
import { TEAMS } from './teamData';

export interface PredictionReason {
  emoji: string;
  text: string;
  advantage: 'team1' | 'team2' | 'neutral';
}

export interface MatchPrediction {
  team1: string;
  team2: string;
  team1WinProbability: number;
  team2WinProbability: number;
  drawProbability: number;
  confidence: 'LOW' | 'MEDIUM' | 'HIGH';
  predictedWinner: string;
  reasons: PredictionReason[];
  team1Stats: TeamTournamentStats;
  team2Stats: TeamTournamentStats;
}

export interface TeamTournamentStats {
  matchesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  goalsScored: number;
  goalsConceded: number;
  cleanSheets: number;
  goalsPerGame: number;
  topScorer: { name: string; goals: number } | null;
  form: string[];
  elo: number;
  knockoutWins: number;
  penaltyShootouts: number;
}

function getTeamTournamentStats(teamName: string, matches: Match[]): TeamTournamentStats {
  const completed = getCompletedMatches(matches);
  const teamMatches = completed.filter(m => m.team1 === teamName || m.team2 === teamName);
  
  let wins = 0, draws = 0, losses = 0, goalsScored = 0, goalsConceded = 0, cleanSheets = 0;
  let knockoutWins = 0, penaltyShootouts = 0;
  const scorerMap: Record<string, number> = {};
  const form: string[] = [];

  for (const m of teamMatches) {
    const isTeam1 = m.team1 === teamName;
    const score = m.score!;
    
    // Use ET score if available, otherwise FT
    const finalScore = score.et || score.ft!;
    const gs = isTeam1 ? finalScore[0] : finalScore[1];
    const gc = isTeam1 ? finalScore[1] : finalScore[0];
    
    goalsScored += gs;
    goalsConceded += gc;
    if (gc === 0) cleanSheets++;

    const result = getMatchResult(m);
    
    if (score.p) penaltyShootouts++;
    
    if (result.winner === teamName) {
      wins++;
      form.push('W');
      if (!m.group) knockoutWins++;
    } else if (result.draw) {
      draws++;
      form.push('D');
    } else {
      losses++;
      form.push('L');
    }

    // Track scorers
    const goals = isTeam1 ? (m.goals1 || []) : (m.goals2 || []);
    for (const g of goals) {
      if (!g.owngoal) {
        scorerMap[g.name] = (scorerMap[g.name] || 0) + 1;
      }
    }
  }

  const topScorer = Object.entries(scorerMap).sort((a, b) => b[1] - a[1])[0];
  const elo = TEAMS[teamName]?.elo || 1500;

  return {
    matchesPlayed: teamMatches.length,
    wins, draws, losses,
    goalsScored, goalsConceded,
    cleanSheets,
    goalsPerGame: teamMatches.length > 0 ? goalsScored / teamMatches.length : 0,
    topScorer: topScorer ? { name: topScorer[0], goals: topScorer[1] } : null,
    form,
    elo,
    knockoutWins,
    penaltyShootouts
  };
}

export function predictMatch(team1: string, team2: string, allMatches: Match[]): MatchPrediction {
  const stats1 = getTeamTournamentStats(team1, allMatches);
  const stats2 = getTeamTournamentStats(team2, allMatches);
  const reasons: PredictionReason[] = [];

  // 1. ELO-based win expectancy (Elo formula)
  const eloDiff = stats1.elo - stats2.elo;
  const eloExpectancy1 = 1 / (1 + Math.pow(10, -eloDiff / 400));
  
  // 2. Tournament form score
  const formScore1 = (stats1.wins * 3 + stats1.draws) / Math.max(stats1.matchesPlayed, 1);
  const formScore2 = (stats2.wins * 3 + stats2.draws) / Math.max(stats2.matchesPlayed, 1);
  const formDiff = formScore1 - formScore2;
  
  // 3. Goal scoring prowess
  const goalDiff = stats1.goalsPerGame - stats2.goalsPerGame;
  
  // 4. Defensive strength
  const concededPerGame1 = stats1.matchesPlayed > 0 ? stats1.goalsConceded / stats1.matchesPlayed : 1;
  const concededPerGame2 = stats2.matchesPlayed > 0 ? stats2.goalsConceded / stats2.matchesPlayed : 1;
  const defenseDiff = concededPerGame2 - concededPerGame1; // positive = team1 better defense
  
  // 5. Knockout experience
  const koBonus1 = stats1.knockoutWins * 0.03;
  const koBonus2 = stats2.knockoutWins * 0.03;

  // Combine factors
  let rawProb1 = eloExpectancy1 * 0.35 + 
    (0.5 + formDiff * 0.1) * 0.25 + 
    (0.5 + goalDiff * 0.08) * 0.15 + 
    (0.5 + defenseDiff * 0.1) * 0.15 +
    (0.5 + (koBonus1 - koBonus2)) * 0.10;

  // Clamp
  rawProb1 = Math.max(0.08, Math.min(0.92, rawProb1));

  // Draw probability (higher in closer matches)
  const closeness = 1 - Math.abs(rawProb1 - 0.5) * 2;
  const drawProb = closeness * 0.20 + 0.05; // 5% to 25%

  // Adjust win probs
  const remaining = 1 - drawProb;
  const team1Win = rawProb1 * remaining;
  const team2Win = (1 - rawProb1) * remaining;

  // Generate reasons
  // ELO comparison
  if (Math.abs(eloDiff) > 50) {
    const stronger = eloDiff > 0 ? team1 : team2;
    const weaker = eloDiff > 0 ? team2 : team1;
    reasons.push({
      emoji: "📊",
      text: `${stronger} has a higher FIFA rating (ELO ${eloDiff > 0 ? stats1.elo : stats2.elo} vs ${eloDiff > 0 ? stats2.elo : stats1.elo})`,
      advantage: eloDiff > 0 ? 'team1' : 'team2'
    });
  }

  // Tournament form
  if (stats1.matchesPlayed > 0 && stats2.matchesPlayed > 0) {
    const better = formScore1 > formScore2 ? team1 : team2;
    const betterStats = formScore1 > formScore2 ? stats1 : stats2;
    reasons.push({
      emoji: "🔥",
      text: `${better} has won ${betterStats.wins} of ${betterStats.matchesPlayed} matches in the tournament`,
      advantage: formScore1 > formScore2 ? 'team1' : 'team2'
    });
  }

  // Goal scoring
  if (stats1.goalsPerGame > 0 || stats2.goalsPerGame > 0) {
    const betterAttack = stats1.goalsPerGame > stats2.goalsPerGame ? team1 : team2;
    const gpg = Math.max(stats1.goalsPerGame, stats2.goalsPerGame);
    reasons.push({
      emoji: "⚽",
      text: `${betterAttack} averages ${gpg.toFixed(1)} goals per game`,
      advantage: stats1.goalsPerGame > stats2.goalsPerGame ? 'team1' : 'team2'
    });
  }

  // Top scorers
  if (stats1.topScorer && stats1.topScorer.goals >= 2) {
    reasons.push({
      emoji: "⭐",
      text: `${stats1.topScorer.name} has scored ${stats1.topScorer.goals} goals for ${team1}`,
      advantage: 'team1'
    });
  }
  if (stats2.topScorer && stats2.topScorer.goals >= 2) {
    reasons.push({
      emoji: "⭐",
      text: `${stats2.topScorer.name} has scored ${stats2.topScorer.goals} goals for ${team2}`,
      advantage: 'team2'
    });
  }

  // Defense
  if (stats1.cleanSheets > 0 || stats2.cleanSheets > 0) {
    const betterDef = stats1.cleanSheets > stats2.cleanSheets ? team1 : team2;
    const cs = Math.max(stats1.cleanSheets, stats2.cleanSheets);
    reasons.push({
      emoji: "🛡️",
      text: `${betterDef} has kept ${cs} clean sheet${cs > 1 ? 's' : ''} in the tournament`,
      advantage: stats1.cleanSheets > stats2.cleanSheets ? 'team1' : 'team2'
    });
  }

  // Penalty shootout warning
  if (stats1.penaltyShootouts > 0) {
    reasons.push({
      emoji: "🎯",
      text: `${team1} survived a penalty shootout — they're battle-tested but may be lucky`,
      advantage: 'neutral'
    });
  }
  if (stats2.penaltyShootouts > 0) {
    reasons.push({
      emoji: "🎯",
      text: `${team2} survived a penalty shootout — they're battle-tested but may be lucky`,
      advantage: 'neutral'
    });
  }

  // Confidence
  const probSpread = Math.abs(team1Win - team2Win);
  let confidence: 'LOW' | 'MEDIUM' | 'HIGH' = 'MEDIUM';
  if (probSpread > 0.30) confidence = 'HIGH';
  else if (probSpread < 0.10) confidence = 'LOW';

  const predictedWinner = team1Win > team2Win ? team1 : team2;

  return {
    team1, team2,
    team1WinProbability: Math.round(team1Win * 100) / 100,
    team2WinProbability: Math.round(team2Win * 100) / 100,
    drawProbability: Math.round(drawProb * 100) / 100,
    confidence,
    predictedWinner,
    reasons: reasons.slice(0, 7),
    team1Stats: stats1,
    team2Stats: stats2
  };
}
