// Standings + bracket data layer. Built from match results + a static group config.
import { getAllMatches, type Match } from '@/lib/data/matches';

export type GroupRow = {
  teamCode: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  pts: number;
};

export type Group = {
  name: string;
  rows: GroupRow[];
};

// Static group composition. Fill once draw is known.
export const GROUPS: Record<string, string[]> = {
  // 'A': ['MEX', 'XXX', 'YYY', 'ZZZ'],
};

function emptyRow(teamCode: string): GroupRow {
  return { teamCode, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0 };
}

function applyMatch(row: GroupRow, gf: number, ga: number): GroupRow {
  const won = gf > ga ? 1 : 0;
  const drawn = gf === ga ? 1 : 0;
  const lost = gf < ga ? 1 : 0;
  return {
    ...row,
    played: row.played + 1,
    won: row.won + won,
    drawn: row.drawn + drawn,
    lost: row.lost + lost,
    gf: row.gf + gf,
    ga: row.ga + ga,
    gd: row.gd + (gf - ga),
    pts: row.pts + won * 3 + drawn,
  };
}

export async function getGroups(): Promise<Group[]> {
  const matches = await getAllMatches();
  const groupMatches = matches.filter((m) => m.stage === 'group' && m.state === 'recap');
  return Object.entries(GROUPS).map(([name, codes]) => {
    const rows = new Map(codes.map((c) => [c, emptyRow(c)]));
    for (const m of groupMatches) {
      const home = rows.get(m.homeCode);
      const away = rows.get(m.awayCode);
      if (!home || !away) continue;
      rows.set(m.homeCode, applyMatch(home, m.homeScore ?? 0, m.awayScore ?? 0));
      rows.set(m.awayCode, applyMatch(away, m.awayScore ?? 0, m.homeScore ?? 0));
    }
    const sorted = [...rows.values()].sort(
      (a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf,
    );
    return { name, rows: sorted };
  });
}

// Knockout bracket: derived from matches with stage in r32..final.
export type BracketSlot = {
  matchId?: string;
  stage: Match['stage'];
  homeCode?: string;
  awayCode?: string;
  homeScore?: number;
  awayScore?: number;
};

export async function getBracket(): Promise<BracketSlot[]> {
  const matches = await getAllMatches();
  return matches
    .filter((m) => m.stage !== 'group')
    .map((m) => ({
      matchId: m.id,
      stage: m.stage,
      homeCode: m.homeCode,
      awayCode: m.awayCode,
      homeScore: m.homeScore,
      awayScore: m.awayScore,
    }));
}
