// football-data.org adapter. Free tier covers groups; api-football is the upgrade path.
// To swap providers, replace the body of these functions — types stay stable for callers.
import type { Match } from '@/lib/data/matches';
import type { Team } from '@/lib/data/teams';
import { cached, TTL } from '@/lib/utils/cache';

const BASE = 'https://api.football-data.org/v4';
// 2026 tournament competition id will be set once announced; placeholder shape below.
const COMPETITION = process.env.FOOTBALL_DATA_COMP ?? 'WC';

function headers() {
  return {
    'X-Auth-Token': process.env.FOOTBALL_DATA_API_KEY ?? '',
    Accept: 'application/json',
  };
}

function mapState(status: string): Match['state'] {
  if (status === 'IN_PLAY' || status === 'PAUSED') return 'live';
  if (status === 'FINISHED') return 'recap';
  return 'preview';
}

function mapStage(stage: string): Match['stage'] {
  const s = stage.toLowerCase();
  if (s.includes('final') && !s.includes('semi') && !s.includes('quarter')) return 'final';
  if (s.includes('semi')) return 'sf';
  if (s.includes('quarter')) return 'qf';
  if (s.includes('round_of_16') || s.includes('last_16')) return 'r16';
  if (s.includes('round_of_32') || s.includes('last_32')) return 'r32';
  if (s.includes('third')) return 'third';
  return 'group';
}

export async function fetchMatches(): Promise<Match[]> {
  return cached('fd:matches', TTL.staticMeta, async () => {
    if (!process.env.FOOTBALL_DATA_API_KEY) return [];
    const res = await fetch(`${BASE}/competitions/${COMPETITION}/matches`, {
      headers: headers(),
      next: { revalidate: TTL.staticMeta },
    });
    if (!res.ok) return [];
    const json: any = await res.json();
    return (json?.matches ?? []).map((m: any) => ({
      id: String(m.id),
      homeCode: m.homeTeam?.tla ?? '???',
      awayCode: m.awayTeam?.tla ?? '???',
      kickoffISO: m.utcDate,
      venueCity: m.venue ?? '',
      stage: mapStage(m.stage ?? ''),
      state: mapState(m.status ?? ''),
      homeScore: m.score?.fullTime?.home ?? undefined,
      awayScore: m.score?.fullTime?.away ?? undefined,
      minute: m.minute ?? undefined,
    }));
  });
}

export async function fetchTeams(): Promise<Team[]> {
  return cached('fd:teams', TTL.staticMeta, async () => {
    if (!process.env.FOOTBALL_DATA_API_KEY) return [];
    const res = await fetch(`${BASE}/competitions/${COMPETITION}/teams`, {
      headers: headers(),
      next: { revalidate: TTL.staticMeta },
    });
    if (!res.ok) return [];
    const json: any = await res.json();
    return (json?.teams ?? []).map((t: any) => ({
      code: t.tla ?? t.shortName ?? String(t.id),
      name: t.name,
    }));
  });
}
