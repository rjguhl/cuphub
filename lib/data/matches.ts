// Data access for matches. Components import from here; the source under the hood
// can be swapped (football-data.org → api-football) without touching components.
import { fetchMatches } from '@/lib/sources/footballData';
import { scheduleOverrides } from '@/config/schedule';

export type MatchState = 'preview' | 'live' | 'recap';

export type Match = {
  id: string;
  homeCode: string;
  awayCode: string;
  kickoffISO: string;
  venueCity: string;
  stage: 'group' | 'r32' | 'r16' | 'qf' | 'sf' | 'final' | 'third';
  state: MatchState;
  homeScore?: number;
  awayScore?: number;
  minute?: number;
};

function applyOverrides(m: Match): Match {
  const o = scheduleOverrides[m.id];
  return o ? { ...m, ...o } : m;
}

export async function getAllMatches(): Promise<Match[]> {
  const raw = await fetchMatches();
  return raw.map(applyOverrides);
}

export async function getMatch(id: string): Promise<Match | null> {
  const all = await getAllMatches();
  return all.find((m) => m.id === id) ?? null;
}

export async function getTodaysMatches(now = new Date()): Promise<Match[]> {
  const all = await getAllMatches();
  const day = now.toISOString().slice(0, 10);
  return all.filter((m) => m.kickoffISO.slice(0, 10) === day);
}

export async function getUpcomingMatches(limit = 3): Promise<Match[]> {
  const all = await getAllMatches();
  const now = Date.now();
  return all
    .filter((m) => new Date(m.kickoffISO).getTime() > now)
    .sort((a, b) => a.kickoffISO.localeCompare(b.kickoffISO))
    .slice(0, limit);
}
