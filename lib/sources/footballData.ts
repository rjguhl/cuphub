// Football data source adapter. Swap implementation between football-data.org and
// api-football here without changing /lib/data callers.
import type { Match } from '@/lib/data/matches';
import type { Team } from '@/lib/data/teams';

export async function fetchMatches(): Promise<Match[]> {
  // TODO: call provider, normalize to Match[].
  return [];
}

export async function fetchTeams(): Promise<Team[]> {
  // TODO: call provider, normalize to Team[].
  return [];
}
