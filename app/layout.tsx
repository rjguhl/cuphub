import type { Metadata } from 'next';
import { copy } from '@/config/copy';
import './globals.css';

export const metadata: Metadata = {
  title: `${copy.brand.name} — ${copy.brand.tagline}`,
  description: `An aggregated, summer-vibes hub for ${copy.tournament.descriptive}.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-cream text-ink font-sans antialiased">{children}</body>
    </html>
  );
}
