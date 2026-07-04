import { TEAMS, getTeamFlag } from '@/lib/teamData';
import { notFound } from 'next/navigation';
import { Trophy, ArrowLeft, Star, Shield, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { generateText } from 'ai';
import { groq } from '@ai-sdk/groq';

// Optional: Set revalidate time so the AI isn't called on every single page load
export const revalidate = 86400; // Cache for 24 hours

export async function generateMetadata({ params }: { params: Promise<{ teamId: string }> }) {
  const { teamId } = await params;
  const decodedId = decodeURIComponent(teamId);
  return {
    title: `${decodedId} - World Cup 2026 Profile`,
  };
}

export default async function TeamPage({ params }: { params: Promise<{ teamId: string }> }) {
  const { teamId } = await params;
  const decodedId = decodeURIComponent(teamId);
  const team = TEAMS[decodedId];

  if (!team) {
    notFound();
  }

  // AI Generation for team history and squad preview
  let aiSummary = '';
  let aiStars = '';
  let aiTactics = '';
  
  try {
    const { text } = await generateText({
      model: groq('llama3-8b-8192'),
      system: 'You are a concise, expert football pundit. Format output clearly with simple markdown.',
      prompt: `Provide a quick profile for the ${decodedId} national football team heading into the 2026 World Cup. 
      Break your response into exactly three sections:
      ### 🏆 World Cup History
      (2-3 sentences on their historical performance and best moments)
      
      ### ⭐ Key Players to Watch
      (List 3 expected star players for 2026 with a brief 1-line reason for each)
      
      ### ⚽ Tactical Approach
      (2 sentences on how they usually play, e.g., defensive counter-attack, possession-based).`
    });

    const parts = text.split('###');
    aiSummary = parts.find(p => p.includes('World Cup History'))?.replace(' 🏆 World Cup History', '').trim() || 'Data unavailable.';
    aiStars = parts.find(p => p.includes('Key Players to Watch'))?.replace(' ⭐ Key Players to Watch', '').trim() || 'Data unavailable.';
    aiTactics = parts.find(p => p.includes('Tactical Approach'))?.replace(' ⚽ Tactical Approach', '').trim() || 'Data unavailable.';
  } catch (error) {
    console.error("AI Generation failed:", error);
    aiSummary = "Historical data currently unavailable.";
    aiStars = team.starPlayers.join(", ");
    aiTactics = "Tactical data currently unavailable.";
  }

  return (
    <main className="min-h-screen bg-bg-primary pt-24 pb-20">
      <div className="section-container max-w-4xl">
        
        <Link href="/#teams" className="inline-flex items-center gap-2 text-text-secondary hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to all teams
        </Link>

        {/* Header Hero */}
        <div className="glass-strong rounded-3xl p-8 md:p-12 mb-8 relative overflow-hidden border-gradient">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <img 
              src={getTeamFlag(decodedId)} 
              alt={`${decodedId} flag`}
              className="w-48 h-auto shadow-2xl rounded-lg"
            />
            <div className="text-center md:text-left">
              <span className="text-accent-gold font-bold tracking-widest text-sm uppercase mb-2 block">
                {team.confederation}
              </span>
              <h1 className="font-display text-5xl md:text-7xl font-black text-white mb-4">
                {team.name}
              </h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <div className="glass px-4 py-2 rounded-xl flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-accent-green" />
                  <span className="text-sm text-text-secondary">ELO:</span>
                  <span className="font-bold text-white">{team.elo}</span>
                </div>
                <div className="glass px-4 py-2 rounded-xl flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-accent-gold" />
                  <span className="text-sm text-text-secondary">Best:</span>
                  <span className="font-bold text-white">{team.bestFinish}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* History */}
          <div className="md:col-span-2 glass rounded-2xl p-8">
            <h2 className="font-display text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-accent-gold" />
              World Cup Heritage
            </h2>
            <div className="prose prose-invert prose-p:text-text-secondary prose-p:leading-relaxed">
              {aiSummary}
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/10">
              <h2 className="font-display text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-accent-cyan" />
                Tactical Profile
              </h2>
              <div className="prose prose-invert prose-p:text-text-secondary prose-p:leading-relaxed">
                {aiTactics}
              </div>
            </div>
          </div>

          {/* Stars */}
          <div className="glass rounded-2xl p-8">
            <h2 className="font-display text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Star className="w-6 h-6 text-accent-magenta" />
              Key Players
            </h2>
            <div className="prose prose-invert prose-p:text-text-secondary text-sm">
              <div dangerouslySetInnerHTML={{ __html: aiStars.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
            </div>
            
            <div className="mt-8 p-4 bg-accent-gold/10 rounded-xl border border-accent-gold/20">
              <p className="text-xs text-accent-gold font-medium mb-1">AI Generated Profile</p>
              <p className="text-[10px] text-text-secondary">
                Historical and tactical data generated in real-time by the Groq AI Engine.
              </p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
