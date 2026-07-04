// World Cup history data 1930-2022

export interface WorldCupEdition {
  year: number;
  host: string;
  winner: string;
  runnerUp: string;
  finalScore: string;
  teams: number;
  emoji: string;
}

export const WORLD_CUP_HISTORY: WorldCupEdition[] = [
  { year: 1930, host: "Uruguay", winner: "Uruguay", runnerUp: "Argentina", finalScore: "4-2", teams: 13, emoji: "🇺🇾" },
  { year: 1934, host: "Italy", winner: "Italy", runnerUp: "Czechoslovakia", finalScore: "2-1 (aet)", teams: 16, emoji: "🇮🇹" },
  { year: 1938, host: "France", winner: "Italy", runnerUp: "Hungary", finalScore: "4-2", teams: 15, emoji: "🇮🇹" },
  { year: 1950, host: "Brazil", winner: "Uruguay", runnerUp: "Brazil", finalScore: "2-1", teams: 13, emoji: "🇺🇾" },
  { year: 1954, host: "Switzerland", winner: "West Germany", runnerUp: "Hungary", finalScore: "3-2", teams: 16, emoji: "🇩🇪" },
  { year: 1958, host: "Sweden", winner: "Brazil", runnerUp: "Sweden", finalScore: "5-2", teams: 16, emoji: "🇧🇷" },
  { year: 1962, host: "Chile", winner: "Brazil", runnerUp: "Czechoslovakia", finalScore: "3-1", teams: 16, emoji: "🇧🇷" },
  { year: 1966, host: "England", winner: "England", runnerUp: "West Germany", finalScore: "4-2 (aet)", teams: 16, emoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { year: 1970, host: "Mexico", winner: "Brazil", runnerUp: "Italy", finalScore: "4-1", teams: 16, emoji: "🇧🇷" },
  { year: 1974, host: "West Germany", winner: "West Germany", runnerUp: "Netherlands", finalScore: "2-1", teams: 16, emoji: "🇩🇪" },
  { year: 1978, host: "Argentina", winner: "Argentina", runnerUp: "Netherlands", finalScore: "3-1 (aet)", teams: 16, emoji: "🇦🇷" },
  { year: 1982, host: "Spain", winner: "Italy", runnerUp: "West Germany", finalScore: "3-1", teams: 24, emoji: "🇮🇹" },
  { year: 1986, host: "Mexico", winner: "Argentina", runnerUp: "West Germany", finalScore: "3-2", teams: 24, emoji: "🇦🇷" },
  { year: 1990, host: "Italy", winner: "West Germany", runnerUp: "Argentina", finalScore: "1-0", teams: 24, emoji: "🇩🇪" },
  { year: 1994, host: "USA", winner: "Brazil", runnerUp: "Italy", finalScore: "0-0 (3-2 p)", teams: 24, emoji: "🇧🇷" },
  { year: 1998, host: "France", winner: "France", runnerUp: "Brazil", finalScore: "3-0", teams: 32, emoji: "🇫🇷" },
  { year: 2002, host: "South Korea / Japan", winner: "Brazil", runnerUp: "Germany", finalScore: "2-0", teams: 32, emoji: "🇧🇷" },
  { year: 2006, host: "Germany", winner: "Italy", runnerUp: "France", finalScore: "1-1 (5-3 p)", teams: 32, emoji: "🇮🇹" },
  { year: 2010, host: "South Africa", winner: "Spain", runnerUp: "Netherlands", finalScore: "1-0 (aet)", teams: 32, emoji: "🇪🇸" },
  { year: 2014, host: "Brazil", winner: "Germany", runnerUp: "Argentina", finalScore: "1-0 (aet)", teams: 32, emoji: "🇩🇪" },
  { year: 2018, host: "Russia", winner: "France", runnerUp: "Croatia", finalScore: "4-2", teams: 32, emoji: "🇫🇷" },
  { year: 2022, host: "Qatar", winner: "Argentina", runnerUp: "France", finalScore: "3-3 (4-2 p)", teams: 32, emoji: "🇦🇷" },
  { year: 2026, host: "USA / Mexico / Canada", winner: "TBD", runnerUp: "TBD", finalScore: "—", teams: 48, emoji: "🏆" },
];
