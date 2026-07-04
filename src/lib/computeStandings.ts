// Compute group standings from match data

import { Match, getMatchResult } from './fetchMatchData';

export interface TeamStanding {
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: string[]; // W, D, L for last matches
}

export function computeGroupStandings(groupMatches: Match[]): TeamStanding[] {
  const standings: Record<string, TeamStanding> = {};

  for (const match of groupMatches) {
    if (!match.score?.ft) continue;

    // Initialize teams
    for (const team of [match.team1, match.team2]) {
      if (!standings[team]) {
        standings[team] = {
          team,
          played: 0, won: 0, drawn: 0, lost: 0,
          goalsFor: 0, goalsAgainst: 0, goalDifference: 0,
          points: 0, form: []
        };
      }
    }

    const [g1, g2] = match.score.ft;
    const result = getMatchResult(match);

    // Team 1
    standings[match.team1].played++;
    standings[match.team1].goalsFor += g1;
    standings[match.team1].goalsAgainst += g2;

    // Team 2
    standings[match.team2].played++;
    standings[match.team2].goalsFor += g2;
    standings[match.team2].goalsAgainst += g1;

    if (result.draw) {
      standings[match.team1].drawn++;
      standings[match.team1].points += 1;
      standings[match.team1].form.push("D");
      standings[match.team2].drawn++;
      standings[match.team2].points += 1;
      standings[match.team2].form.push("D");
    } else if (result.winner === match.team1) {
      standings[match.team1].won++;
      standings[match.team1].points += 3;
      standings[match.team1].form.push("W");
      standings[match.team2].lost++;
      standings[match.team2].form.push("L");
    } else {
      standings[match.team2].won++;
      standings[match.team2].points += 3;
      standings[match.team2].form.push("W");
      standings[match.team1].lost++;
      standings[match.team1].form.push("L");
    }
  }

  // Calculate GD and sort
  const sorted = Object.values(standings).map(s => ({
    ...s,
    goalDifference: s.goalsFor - s.goalsAgainst
  }));

  sorted.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
    return a.team.localeCompare(b.team);
  });

  return sorted;
}

export function computeAllGroupStandings(matches: Match[]): Record<string, TeamStanding[]> {
  const groups: Record<string, Match[]> = {};
  
  for (const match of matches) {
    if (match.group) {
      if (!groups[match.group]) groups[match.group] = [];
      groups[match.group].push(match);
    }
  }

  const standings: Record<string, TeamStanding[]> = {};
  for (const [group, groupMatches] of Object.entries(groups)) {
    standings[group] = computeGroupStandings(groupMatches);
  }

  return standings;
}
