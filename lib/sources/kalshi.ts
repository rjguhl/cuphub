// Kalshi public API adapter. Read-only.
import type { ChampionshipOdds, MatchOdds } from '@/lib/data/odds';

export async function fetchChampionshipMarket(): Promise<ChampionshipOdds[]> {
  // TODO: fetch the championship-winner market series, snapshot 24h ago for movement.
  return [];
}

export async function fetchMatchMarkets(matchId: string): Promise<MatchOdds | null> {
  // TODO: fetch per-match markets, return win/draw/loss + 48h history.
  return null;
}
