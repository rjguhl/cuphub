// Pixel badge. Tiny chip — for stages, statuses, country tags.
import type { ReactNode } from 'react';

type Tone = 'yellow' | 'magenta' | 'sky' | 'lime' | 'red' | 'chalk' | 'gold';

const SURFACES: Record<Tone, string> = {
  yellow: 'bg-yellow text-ink',
  magenta: 'bg-magenta text-chalk',
  sky: 'bg-sky text-ink',
  lime: 'bg-lime text-ink',
  red: 'bg-red text-chalk',
  chalk: 'bg-chalk text-ink',
  gold: 'bg-gold text-ink',
};

export function Badge({
  tone = 'yellow',
  children,
}: {
  tone?: Tone;
  children: ReactNode;
}) {
  return (
    <span
      className={
        `inline-flex items-center gap-1 px-2 py-0.5 ` +
        `font-mono text-[10px] uppercase tracking-[0.15em] ` +
        `border-2 border-ink rounded-none ` +
        `shadow-[2px_2px_0_0_#0B1A12] ${SURFACES[tone]}`
      }
    >
      {children}
    </span>
  );
}
