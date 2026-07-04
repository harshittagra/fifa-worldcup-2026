import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FIFA World Cup 2026 — USA · Mexico · Canada",
  description:
    "Live scores, group standings, knockout bracket, team stats, match predictions, and complete World Cup history for the 2026 FIFA World Cup across USA, Mexico, and Canada. 48 teams, 104 matches, one champion.",
  keywords: [
    "FIFA World Cup 2026",
    "World Cup scores",
    "World Cup bracket",
    "World Cup predictions",
    "football",
    "soccer",
  ],
  openGraph: {
    title: "FIFA World Cup 2026 — Live Scores, Predictions & More",
    description: "The most comprehensive World Cup 2026 experience. 48 teams. 104 matches. Live predictions with detailed analysis.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body className="noise-overlay antialiased">
        {children}
      </body>
    </html>
  );
}
