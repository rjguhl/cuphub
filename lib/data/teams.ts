import { fetchTeams } from '@/lib/sources/footballData';

export type Team = {
  code: string; // ISO 3166-1 alpha-3, e.g. 'BRA'
  name: string;
  group?: string;
  flagEmoji?: string;
};

export async function getAllTeams(): Promise<Team[]> {
  return fetchTeams();
}

export async function getTeam(code: string): Promise<Team | null> {
  const all = await getAllTeams();
  return all.find((t) => t.code.toLowerCase() === code.toLowerCase()) ?? null;
}
