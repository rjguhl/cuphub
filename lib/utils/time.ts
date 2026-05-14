// Tournament-time helpers. Used by hero, countdowns, etc.
import { copy } from '@/config/copy';

const START = new Date(copy.tournament.startDate + 'T00:00:00Z').getTime();
const END = new Date(copy.tournament.endDate + 'T23:59:59Z').getTime();

export type TournamentPhase =
  | { phase: 'pre'; daysToStart: number }
  | { phase: 'live'; day: number; stage: string }
  | { phase: 'post'; daysSinceEnd: number };

export function tournamentPhase(now = new Date()): TournamentPhase {
  const t = now.getTime();
  if (t < START) {
    return { phase: 'pre', daysToStart: Math.ceil((START - t) / 86_400_000) };
  }
  if (t > END) {
    return { phase: 'post', daysSinceEnd: Math.floor((t - END) / 86_400_000) };
  }
  const day = Math.floor((t - START) / 86_400_000) + 1;
  return { phase: 'live', day, stage: stageFromDay(day) };
}

// Rough stage windows. Tune once the schedule is final.
function stageFromDay(day: number): string {
  if (day <= 17) return 'Group Stage';
  if (day <= 21) return 'Round of 32';
  if (day <= 25) return 'Round of 16';
  if (day <= 29) return 'Quarterfinals';
  if (day <= 34) return 'Semifinals';
  if (day <= 38) return 'Final Stretch';
  return 'Final';
}

export function shortKickoff(iso: string, locale = 'en-US'): string {
  const d = new Date(iso);
  return d.toLocaleString(locale, {
    weekday: 'short',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function countdown(toISO: string, now = new Date()): string {
  const ms = new Date(toISO).getTime() - now.getTime();
  if (ms <= 0) return 'kicks off';
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  if (h >= 24) return `${Math.floor(h / 24)}d ${h % 24}h`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}
