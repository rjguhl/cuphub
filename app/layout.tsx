import type { Metadata } from 'next';
import { Inter, Pixelify_Sans, JetBrains_Mono } from 'next/font/google';
import { copy } from '@/config/copy';
import { Bunting } from '@/components/ui/Bunting';
import './globals.css';

// Font strategy from the plan:
//  - Pixel display font for chrome / headlines (Pixelify Sans is readable, not arcade-tiny)
//  - Clean sans for body and data
//  - Mono for scoreboard digits
const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const display = Pixelify_Sans({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  title: `${copy.brand.name} — ${copy.brand.tagline}`,
  description: `An aggregated, summer-vibes hub for ${copy.tournament.descriptive}.`,
  openGraph: { title: copy.brand.name, description: copy.brand.tagline },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body className="bg-pitch min-h-screen text-chalk font-sans antialiased grass-noise">
        <Bunting />
        {children}
      </body>
    </html>
  );
}
