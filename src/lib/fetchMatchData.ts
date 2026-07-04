// Fetch and parse match data from openfootball/worldcup.json

export interface Goal {
  name: string;
  minute: string;
  penalty?: boolean;
  owngoal?: boolean;
}

export interface MatchScore {
  ft?: [number, number];
  ht?: [number, number];
  et?: [number, number];
  p?: [number, number];
}

export interface Match {
  round: string;
  num?: number;
  date: string;
  time: string;
  team1: string;
  team2: string;
  score?: MatchScore;
  goals1?: Goal[];
  goals2?: Goal[];
  group?: string;
  ground: string;
}

export interface MatchData {
  name: string;
  matches: Match[];
}

const DATA_URL = "https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json";

let cachedData: MatchData | null = null;

export async function fetchMatchData(): Promise<MatchData> {
  if (cachedData) return cachedData;
  
  try {
    const res = await fetch(DATA_URL, { next: { revalidate: 300 } }); // cache 5 min
    const data: MatchData = await res.json();
    cachedData = data;
    return data;
  } catch (error) {
    console.error("Failed to fetch match data:", error);
    // Return empty dataset on failure
    return { name: "World Cup 2026", matches: [] };
  }
}

export function getMatchesByRound(matches: Match[]): Record<string, Match[]> {
  const rounds: Record<string, Match[]> = {};
  for (const m of matches) {
    if (!rounds[m.round]) rounds[m.round] = [];
    rounds[m.round].push(m);
  }
  return rounds;
}

export function getMatchesByGroup(matches: Match[]): Record<string, Match[]> {
  const groups: Record<string, Match[]> = {};
  for (const m of matches) {
    if (m.group) {
      if (!groups[m.group]) groups[m.group] = [];
      groups[m.group].push(m);
    }
  }
  return groups;
}

export function getCompletedMatches(matches: Match[]): Match[] {
  return matches.filter(m => m.score?.ft);
}

export function getUpcomingMatches(matches: Match[]): Match[] {
  return matches.filter(m => !m.score?.ft);
}

export function getKnockoutMatches(matches: Match[]): Match[] {
  return matches.filter(m => !m.group);
}

export function isMatchLive(match: Match): boolean {
  // Simple heuristic: if today's date matches and no final score
  const today = new Date().toISOString().split('T')[0];
  return match.date === today && !match.score?.ft;
}

export function getMatchResult(match: Match): { winner: string | null; draw: boolean } {
  if (!match.score?.ft) return { winner: null, draw: false };
  
  const [s1, s2] = match.score.ft;
  
  // Check penalties for knockout
  if (match.score.p) {
    const [p1, p2] = match.score.p;
    return { winner: p1 > p2 ? match.team1 : match.team2, draw: false };
  }
  
  // Check extra time
  if (match.score.et) {
    const [e1, e2] = match.score.et;
    if (e1 !== e2) return { winner: e1 > e2 ? match.team1 : match.team2, draw: false };
  }
  
  if (s1 > s2) return { winner: match.team1, draw: false };
  if (s2 > s1) return { winner: match.team2, draw: false };
  return { winner: null, draw: true };
}

export function getRecentMatches(matches: Match[], count: number = 8): Match[] {
  const completed = getCompletedMatches(matches);
  return completed.sort((a, b) => b.date.localeCompare(a.date)).slice(0, count);
}
