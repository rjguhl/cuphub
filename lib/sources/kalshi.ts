// Kalshi public API adapter. Read-only.
// Market series IDs need to be confirmed once Kalshi lists 2026 tournament markets.
import type { ChampionshipOdds, MatchOdds } from '@/lib/data/odds';
import { cached, TTL } from '@/lib/utils/cache';

const BASE = 'https://api.elections.kalshi.com/trade-api/v2';
// Placeholder series ticker — set via env when known.
const CHAMPIONSHIP_SERIES = process.env.KALSHI_CHAMPIONSHIP_SERIES ?? '';

async function getJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${BASE}${path}`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: TTL.market },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchChampionshipMarket(): Promise<ChampionshipOdds[]> {
  return cached('kalshi:championship', TTL.market, async () => {
    if (!CHAMPIONSHIP_SERIES) return [];
    // TODO: hit the actual series endpoint, map yes-mid → impliedProb,
    // pull a 24h-prior snapshot for prob24hAgo. Shape kept stable for callers.
    return [];
  });
}

export async function fetchMatchMarkets(matchId: string): Promise<MatchOdds | null> {
  return cached(`kalshi:match:${matchId}`, TTL.market, async () => {
    // TODO: per-match win/draw/loss markets + 48h history series.
    return null;
  });
}
