import { fetchMatchData } from '@/lib/fetchMatchData';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import LiveScoresSection from '@/components/LiveScoresSection';
import GroupStandingsSection from '@/components/GroupStandingsSection';
import ScheduleSection from '@/components/ScheduleSection';
import TeamsSection from '@/components/TeamsSection';
import KnockoutBracketSection from '@/components/KnockoutBracketSection';
import PredictionsSection from '@/components/PredictionsSection';
import HistoryTimelineSection from '@/components/HistoryTimelineSection';
import { Trophy, Heart } from 'lucide-react';

export const revalidate = 300; // ISR: revalidate every 5 minutes

export default async function HomePage() {
  const data = await fetchMatchData();
  const matches = data.matches;

  return (
    <main className="relative">
      <Navbar />

      <HeroSection />

      <LiveScoresSection matches={matches} />

      <GroupStandingsSection matches={matches} />

      <ScheduleSection matches={matches} />

      <TeamsSection matches={matches} />

      <KnockoutBracketSection matches={matches} />

      <PredictionsSection matches={matches} />

      <HistoryTimelineSection />

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="section-container text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-accent-gold" />
            <span className="font-display font-bold text-lg gradient-text">FIFA World Cup 2026</span>
          </div>
          <p className="text-text-secondary text-sm mb-2">
            Built with Next.js · Tailwind CSS · Framer Motion · GSAP
          </p>
          <p className="text-text-secondary text-xs">
            Data from{' '}
            <a
              href="https://github.com/openfootball/worldcup.json"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-cyan hover:underline"
            >
              openfootball/worldcup.json
            </a>{' '}
            (public domain)
          </p>
          <p className="text-text-secondary/50 text-xs mt-4 flex items-center justify-center gap-1">
            Made with <Heart className="w-3 h-3 text-accent-magenta" /> for football fans worldwide
          </p>
        </div>
      </footer>
    </main>
  );
}
