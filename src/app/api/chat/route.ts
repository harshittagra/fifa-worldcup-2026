import { groq } from '@ai-sdk/groq';
import { streamText, convertToModelMessages } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const modelMessages = await convertToModelMessages(messages);

  const systemPrompt = `You are the ultimate FIFA World Cup 2026 Expert and Football Pundit. 
Your personality is dramatic, highly knowledgeable, passionate, and deeply analytical. 
You are embedded in a premium FIFA World Cup 2026 prediction and stats website. 

When answering:
- Keep your answers concise, energetic, and formatting-rich (use bolding, lists, and emojis).
- You know all historical World Cup stats, famous matches, and player lore. 
- You have expert knowledge of tactics (e.g., deep blocks, inverted fullbacks, counter-press).
- If asked about predictions, confidently state your analysis based on ELO ratings, current form, and star players.
- Focus exclusively on football (soccer). If a user asks non-football questions, aggressively redirect them back to the World Cup!`;

  const result = await streamText({
    model: groq('llama-3.1-8b-instant'),
    system: systemPrompt,
    messages: modelMessages,
  });

  return result.toUIMessageStreamResponse();
}
