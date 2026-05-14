// The hub. A composed list of section components — reorder or feature-flag without touching logic.
import { features } from '@/config/features';
import { HeroToday } from '@/components/sections/HeroToday';
import { TournamentTicker } from '@/components/sections/Marquee';
import { PulseFeed } from '@/components/sections/PulseFeed';
import { MarketPulse } from '@/components/sections/MarketPulse';
import { BracketWidget } from '@/components/sections/BracketWidget';
import { UpcomingStrip } from '@/components/sections/UpcomingStrip';
import { DiscoverRow } from '@/components/sections/DiscoverRow';
import { Footer } from '@/components/ui/Footer';

export const revalidate = 60;

export default function HomePage() {
  const s = features.sections;
  return (
    <main className="mx-auto max-w-6xl px-4 py-6 md:py-10 space-y-10">
      {s.heroToday && <HeroToday />}
      {s.ticker && <TournamentTicker />}
      {s.pulseFeed && <PulseFeed />}
      {s.marketPulse && <MarketPulse />}
      {s.bracket && <BracketWidget />}
      {s.upcoming && <UpcomingStrip />}
      {s.discover && <DiscoverRow />}
      <Footer />
    </main>
  );
}
