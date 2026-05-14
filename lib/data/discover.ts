// Discover cards. Editorial content lives in /content/discover/cards.json.
// New card kind = new content type, not a new component.
import cards from '@/content/discover/cards.json';

export type DiscoverKind = 'team-to-watch' | 'city-spotlight' | 'stat-of-day' | 'underdog' | 'throwback';

export type DiscoverCard = {
  id: string;
  kind: DiscoverKind;
  title: string;
  body: string;
  href?: string;
};

// Daily rotation: deterministic shuffle keyed by day-of-year so the order changes
// every day but is stable for the day (good for ISR caching).
function dayOfYear(d = new Date()): number {
  const start = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d.getTime() - start.getTime()) / 86_400_000);
}

export async function getDiscoverCards(limit = 4): Promise<DiscoverCard[]> {
  const all = cards as DiscoverCard[];
  if (!all.length) return [];
  const offset = dayOfYear() % all.length;
  return [...all.slice(offset), ...all.slice(0, offset)].slice(0, limit);
}
