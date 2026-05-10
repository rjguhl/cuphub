// Market data sourced from Kalshi. Implied probabilities + 24h movement.
import { fetchChampionshipMarket, fetchMatchMarkets } from '@/lib/sources/kalshi';

export type ChampionshipOdds = {
  teamCode: string;
  teamName: string;
  impliedProb: number; // 0..1
  prob24hAgo?: number;
};

export type MatchOdds = {
  matchId: string;
  home: number;
  draw: number;
  away: number;
  history: { t: string; home: number; draw: number; away: number }[];
};

export async function getChampionshipLeaders(top = 5): Promise<ChampionshipOdds[]> {
  const all = await fetchChampionshipMarket();
  return [...all].sort((a, b) => b.impliedProb - a.impliedProb).slice(0, top);
}

export async function getBiggestMovers(top = 3): Promise<ChampionshipOdds[]> {
  const all = await fetchChampionshipMarket();
  return [...all]
    .filter((o) => o.prob24hAgo != null)
    .map((o) => ({ ...o, _delta: Math.abs(o.impliedProb - (o.prob24hAgo ?? 0)) }))
    .sort((a, b) => b._delta - a._delta)
    .slice(0, top);
}

export async function getMatchOdds(matchId: string): Promise<MatchOdds | null> {
  return fetchMatchMarkets(matchId);
}
