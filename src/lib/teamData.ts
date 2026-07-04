// Team metadata, ELO ratings, flag codes for all 48 FIFA World Cup 2026 teams

export interface TeamInfo {
  name: string;
  code: string; // ISO 3166-1 alpha-2 for flag
  fifaCode: string;
  confederation: string;
  elo: number;
  starPlayers: string[];
  group: string;
  worldCupAppearances: number;
  bestFinish: string;
}

export const TEAMS: Record<string, TeamInfo> = {
  "Mexico": { name: "Mexico", code: "mx", fifaCode: "MEX", confederation: "CONCACAF", elo: 1730, starPlayers: ["Julián Quiñones", "Raúl Jiménez", "Álvaro Fidalgo"], group: "A", worldCupAppearances: 18, bestFinish: "Quarter-finals" },
  "South Africa": { name: "South Africa", code: "za", fifaCode: "RSA", confederation: "CAF", elo: 1480, starPlayers: ["Teboho Mokoena", "Thapelo Maseko"], group: "A", worldCupAppearances: 4, bestFinish: "Group Stage" },
  "South Korea": { name: "South Korea", code: "kr", fifaCode: "KOR", confederation: "AFC", elo: 1620, starPlayers: ["Hwang In-Beom", "Oh Hyeon-Gyu"], group: "A", worldCupAppearances: 12, bestFinish: "4th Place (2002)" },
  "Czech Republic": { name: "Czech Republic", code: "cz", fifaCode: "CZE", confederation: "UEFA", elo: 1560, starPlayers: ["Ladislav Krejcí", "Michal Sadílek"], group: "A", worldCupAppearances: 2, bestFinish: "Runner-up (1934, 1962)" },
  "Canada": { name: "Canada", code: "ca", fifaCode: "CAN", confederation: "CONCACAF", elo: 1600, starPlayers: ["Jonathan David", "Cyle Larin", "Alphonso Davies"], group: "B", worldCupAppearances: 3, bestFinish: "Round of 16" },
  "Bosnia & Herzegovina": { name: "Bosnia & Herzegovina", code: "ba", fifaCode: "BIH", confederation: "UEFA", elo: 1520, starPlayers: ["Ermin Mahmic"], group: "B", worldCupAppearances: 2, bestFinish: "Group Stage" },
  "Qatar": { name: "Qatar", code: "qa", fifaCode: "QAT", confederation: "AFC", elo: 1440, starPlayers: ["Hassan Al-Haydos"], group: "B", worldCupAppearances: 3, bestFinish: "Group Stage" },
  "Switzerland": { name: "Switzerland", code: "ch", fifaCode: "SUI", confederation: "UEFA", elo: 1710, starPlayers: ["Granit Xhaka", "Johan Manzambi", "Breel Embolo"], group: "B", worldCupAppearances: 13, bestFinish: "Quarter-finals" },
  "Brazil": { name: "Brazil", code: "br", fifaCode: "BRA", confederation: "CONMEBOL", elo: 1840, starPlayers: ["Vinícius Júnior", "Matheus Cunha", "Casemiro"], group: "C", worldCupAppearances: 23, bestFinish: "Champions (5×)" },
  "Morocco": { name: "Morocco", code: "ma", fifaCode: "MAR", confederation: "CAF", elo: 1700, starPlayers: ["Achraf Hakimi", "Ismael Saibari"], group: "C", worldCupAppearances: 7, bestFinish: "Semi-finals (2022)" },
  "Haiti": { name: "Haiti", code: "ht", fifaCode: "HAI", confederation: "CONCACAF", elo: 1350, starPlayers: ["Wilson Isidor"], group: "C", worldCupAppearances: 2, bestFinish: "Group Stage" },
  "Scotland": { name: "Scotland", code: "gb-sct", fifaCode: "SCO", confederation: "UEFA", elo: 1540, starPlayers: ["John McGinn"], group: "C", worldCupAppearances: 9, bestFinish: "Group Stage" },
  "USA": { name: "USA", code: "us", fifaCode: "USA", confederation: "CONCACAF", elo: 1740, starPlayers: ["Folarin Balogun", "Giovanni Reyna", "Malik Tillman"], group: "D", worldCupAppearances: 12, bestFinish: "Semi-finals (1930)" },
  "Paraguay": { name: "Paraguay", code: "py", fifaCode: "PAR", confederation: "CONMEBOL", elo: 1570, starPlayers: ["Julio Enciso", "Matías Galarza"], group: "D", worldCupAppearances: 9, bestFinish: "Quarter-finals (2010)" },
  "Australia": { name: "Australia", code: "au", fifaCode: "AUS", confederation: "AFC", elo: 1560, starPlayers: ["Nestory Irankunda", "Connor Metcalfe"], group: "D", worldCupAppearances: 7, bestFinish: "Round of 16" },
  "Turkey": { name: "Turkey", code: "tr", fifaCode: "TUR", confederation: "UEFA", elo: 1630, starPlayers: ["Arda Güler", "Baris Alper Yilmaz"], group: "D", worldCupAppearances: 4, bestFinish: "3rd Place (2002)" },
  "Germany": { name: "Germany", code: "de", fifaCode: "GER", confederation: "UEFA", elo: 1750, starPlayers: ["Jamal Musiala", "Kai Havertz", "Leroy Sané"], group: "E", worldCupAppearances: 21, bestFinish: "Champions (4×)" },
  "Curaçao": { name: "Curaçao", code: "cw", fifaCode: "CUW", confederation: "CONCACAF", elo: 1300, starPlayers: ["Livano Comenencia"], group: "E", worldCupAppearances: 1, bestFinish: "Group Stage" },
  "Ivory Coast": { name: "Ivory Coast", code: "ci", fifaCode: "CIV", confederation: "CAF", elo: 1620, starPlayers: ["Amad Diallo", "Nicolas Pépé", "Franck Kessié"], group: "E", worldCupAppearances: 4, bestFinish: "Group Stage" },
  "Ecuador": { name: "Ecuador", code: "ec", fifaCode: "ECU", confederation: "CONMEBOL", elo: 1590, starPlayers: ["Gonzalo Plata", "Nilson Angulo"], group: "E", worldCupAppearances: 5, bestFinish: "Round of 16" },
  "Netherlands": { name: "Netherlands", code: "nl", fifaCode: "NED", confederation: "UEFA", elo: 1790, starPlayers: ["Virgil van Dijk", "Cody Gakpo", "Brian Brobbey"], group: "F", worldCupAppearances: 12, bestFinish: "Runner-up (3×)" },
  "Japan": { name: "Japan", code: "jp", fifaCode: "JPN", confederation: "AFC", elo: 1710, starPlayers: ["Daichi Kamada", "Ayase Ueda", "Junya Ito"], group: "F", worldCupAppearances: 8, bestFinish: "Round of 16" },
  "Sweden": { name: "Sweden", code: "se", fifaCode: "SWE", confederation: "UEFA", elo: 1620, starPlayers: ["Alexander Isak", "Viktor Gyökeres", "Anthony Elanga"], group: "F", worldCupAppearances: 13, bestFinish: "Runner-up (1958)" },
  "Tunisia": { name: "Tunisia", code: "tn", fifaCode: "TUN", confederation: "CAF", elo: 1480, starPlayers: ["Omar Rekik"], group: "F", worldCupAppearances: 7, bestFinish: "Group Stage" },
  "Belgium": { name: "Belgium", code: "be", fifaCode: "BEL", confederation: "UEFA", elo: 1760, starPlayers: ["Kevin De Bruyne", "Romelu Lukaku", "Leandro Trossard"], group: "G", worldCupAppearances: 15, bestFinish: "3rd Place (2018)" },
  "Egypt": { name: "Egypt", code: "eg", fifaCode: "EGY", confederation: "CAF", elo: 1550, starPlayers: ["Mohamed Salah", "Trézéguet", "Emam Ashour"], group: "G", worldCupAppearances: 4, bestFinish: "Group Stage" },
  "Iran": { name: "Iran", code: "ir", fifaCode: "IRN", confederation: "AFC", elo: 1540, starPlayers: ["Ramin Rezaeian", "Mohammad Mohebbi"], group: "G", worldCupAppearances: 7, bestFinish: "Group Stage" },
  "New Zealand": { name: "New Zealand", code: "nz", fifaCode: "NZL", confederation: "OFC", elo: 1400, starPlayers: ["Elijah Just", "Finn Surman"], group: "G", worldCupAppearances: 3, bestFinish: "Group Stage" },
  "Spain": { name: "Spain", code: "es", fifaCode: "ESP", confederation: "UEFA", elo: 1815, starPlayers: ["Lamine Yamal", "Mikel Oyarzabal", "Álex Baena"], group: "H", worldCupAppearances: 17, bestFinish: "Champions (2010)" },
  "Cape Verde": { name: "Cape Verde", code: "cv", fifaCode: "CPV", confederation: "CAF", elo: 1370, starPlayers: ["Kevin Pina", "Hélio Varela", "Deroy Duarte"], group: "H", worldCupAppearances: 1, bestFinish: "Round of 32" },
  "Saudi Arabia": { name: "Saudi Arabia", code: "sa", fifaCode: "KSA", confederation: "AFC", elo: 1490, starPlayers: ["Abdulelah Al-Amri"], group: "H", worldCupAppearances: 7, bestFinish: "Round of 16 (1994)" },
  "Uruguay": { name: "Uruguay", code: "uy", fifaCode: "URU", confederation: "CONMEBOL", elo: 1720, starPlayers: ["Maxi Araújo", "Agustín Cano"], group: "H", worldCupAppearances: 15, bestFinish: "Champions (2×)" },
  "France": { name: "France", code: "fr", fifaCode: "FRA", confederation: "UEFA", elo: 1860, starPlayers: ["Kylian Mbappé", "Ousmane Dembélé", "Bradley Barcola"], group: "I", worldCupAppearances: 17, bestFinish: "Champions (2×)" },
  "Senegal": { name: "Senegal", code: "sn", fifaCode: "SEN", confederation: "CAF", elo: 1580, starPlayers: ["Ismaïla Sarr", "Habib Diarra", "Pape Gueye"], group: "I", worldCupAppearances: 4, bestFinish: "Quarter-finals (2002)" },
  "Iraq": { name: "Iraq", code: "iq", fifaCode: "IRQ", confederation: "AFC", elo: 1440, starPlayers: ["Aymen Hussein"], group: "I", worldCupAppearances: 2, bestFinish: "Group Stage" },
  "Norway": { name: "Norway", code: "no", fifaCode: "NOR", confederation: "UEFA", elo: 1640, starPlayers: ["Erling Haaland", "Antonio Nusa"], group: "I", worldCupAppearances: 4, bestFinish: "Group Stage" },
  "Argentina": { name: "Argentina", code: "ar", fifaCode: "ARG", confederation: "CONMEBOL", elo: 1890, starPlayers: ["Lionel Messi", "Lautaro Martínez", "Giovani Lo Celso"], group: "J", worldCupAppearances: 19, bestFinish: "Champions (3×)" },
  "Algeria": { name: "Algeria", code: "dz", fifaCode: "ALG", confederation: "CAF", elo: 1530, starPlayers: ["Riyad Mahrez", "Amine Gouiri"], group: "J", worldCupAppearances: 5, bestFinish: "Round of 16 (2014)" },
  "Austria": { name: "Austria", code: "at", fifaCode: "AUT", confederation: "UEFA", elo: 1600, starPlayers: ["Marko Arnautovic", "Marcel Sabitzer"], group: "J", worldCupAppearances: 8, bestFinish: "3rd Place (1954)" },
  "Jordan": { name: "Jordan", code: "jo", fifaCode: "JOR", confederation: "AFC", elo: 1420, starPlayers: ["Mousa Al-Tamari", "Ali Olwan"], group: "J", worldCupAppearances: 1, bestFinish: "Group Stage" },
  "Portugal": { name: "Portugal", code: "pt", fifaCode: "POR", confederation: "UEFA", elo: 1800, starPlayers: ["Cristiano Ronaldo", "Rafael Leão", "João Neves"], group: "K", worldCupAppearances: 9, bestFinish: "3rd Place (1966)" },
  "DR Congo": { name: "DR Congo", code: "cd", fifaCode: "COD", confederation: "CAF", elo: 1460, starPlayers: ["Yoane Wissa", "Fiston Mayele"], group: "K", worldCupAppearances: 2, bestFinish: "Group Stage" },
  "Uzbekistan": { name: "Uzbekistan", code: "uz", fifaCode: "UZB", confederation: "AFC", elo: 1430, starPlayers: ["Abbosbek Fayzullaev", "Eldor Shomurodov"], group: "K", worldCupAppearances: 1, bestFinish: "Group Stage" },
  "Colombia": { name: "Colombia", code: "co", fifaCode: "COL", confederation: "CONMEBOL", elo: 1770, starPlayers: ["Luis Díaz", "Daniel Muñoz", "Jhon Arias"], group: "K", worldCupAppearances: 7, bestFinish: "Quarter-finals (2014)" },
  "England": { name: "England", code: "gb-eng", fifaCode: "ENG", confederation: "UEFA", elo: 1820, starPlayers: ["Harry Kane", "Jude Bellingham", "Marcus Rashford"], group: "L", worldCupAppearances: 17, bestFinish: "Champions (1966)" },
  "Croatia": { name: "Croatia", code: "hr", fifaCode: "CRO", confederation: "UEFA", elo: 1680, starPlayers: ["Martin Baturina", "Petar Musa", "Ivan Perisic"], group: "L", worldCupAppearances: 7, bestFinish: "Runner-up (2018)" },
  "Ghana": { name: "Ghana", code: "gh", fifaCode: "GHA", confederation: "CAF", elo: 1500, starPlayers: ["Caleb Yirenkyi"], group: "L", worldCupAppearances: 5, bestFinish: "Quarter-finals (2010)" },
  "Panama": { name: "Panama", code: "pa", fifaCode: "PAN", confederation: "CONCACAF", elo: 1420, starPlayers: [], group: "L", worldCupAppearances: 3, bestFinish: "Group Stage" },
};

export const GROUP_NAMES = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

export function getTeamFlag(teamName: string): string {
  const team = TEAMS[teamName];
  if (!team) return "";
  // Handle special codes for UK nations
  if (team.code === "gb-eng") return "https://flagcdn.com/w80/gb.png";
  if (team.code === "gb-sct") return "https://flagcdn.com/w80/gb.png";
  return `https://flagcdn.com/w80/${team.code}.png`;
}

export function getTeamFlagEmoji(teamName: string): string {
  const emojiMap: Record<string, string> = {
    "Mexico": "🇲🇽", "South Africa": "🇿🇦", "South Korea": "🇰🇷", "Czech Republic": "🇨🇿",
    "Canada": "🇨🇦", "Bosnia & Herzegovina": "🇧🇦", "Qatar": "🇶🇦", "Switzerland": "🇨🇭",
    "Brazil": "🇧🇷", "Morocco": "🇲🇦", "Haiti": "🇭🇹", "Scotland": "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    "USA": "🇺🇸", "Paraguay": "🇵🇾", "Australia": "🇦🇺", "Turkey": "🇹🇷",
    "Germany": "🇩🇪", "Curaçao": "🇨🇼", "Ivory Coast": "🇨🇮", "Ecuador": "🇪🇨",
    "Netherlands": "🇳🇱", "Japan": "🇯🇵", "Sweden": "🇸🇪", "Tunisia": "🇹🇳",
    "Belgium": "🇧🇪", "Egypt": "🇪🇬", "Iran": "🇮🇷", "New Zealand": "🇳🇿",
    "Spain": "🇪🇸", "Cape Verde": "🇨🇻", "Saudi Arabia": "🇸🇦", "Uruguay": "🇺🇾",
    "France": "🇫🇷", "Senegal": "🇸🇳", "Iraq": "🇮🇶", "Norway": "🇳🇴",
    "Argentina": "🇦🇷", "Algeria": "🇩🇿", "Austria": "🇦🇹", "Jordan": "🇯🇴",
    "Portugal": "🇵🇹", "DR Congo": "🇨🇩", "Uzbekistan": "🇺🇿", "Colombia": "🇨🇴",
    "England": "🏴󠁧󠁢󠁥󠁮󠁧󠁿", "Croatia": "🇭🇷", "Ghana": "🇬🇭", "Panama": "🇵🇦",
  };
  return emojiMap[teamName] || "🏳️";
}
