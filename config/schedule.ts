// Manual schedule overrides for when the upstream API has gaps or errors.
// Match objects keyed by match id. Spread on top of API results in lib/data/matches.ts.
import type { Match } from '@/lib/data/matches';

export const scheduleOverrides: Partial<Record<string, Partial<Match>>> = {
  // 'M001': { kickoffISO: '2026-06-11T20:00:00Z', venueCity: 'mexico-city' },
};
