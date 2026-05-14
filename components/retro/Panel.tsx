// RetroUI-style heavy panel — used for large surfaces (hero blocks, page headers).
// Same offset-shadow language as RetroCard but doesn't lift on hover (it's a surface, not a control).
import type { ReactNode } from 'react';

type Tone = 'pitch' | 'shadow' | 'cream' | 'yellow' | 'magenta';

const SURFACES: Record<Tone, string> = {
  pitch: 'bg-pitch text-chalk',
  shadow: 'bg-shadow text-chalk',
  cream: 'bg-cream text-ink',
  yellow: 'bg-yellow text-ink',
  magenta: 'bg-magenta text-chalk',
};

export function Panel({
  tone = 'shadow',
  children,
  className = '',
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        `border-2 border-ink rounded-none p-5 ` +
        `shadow-[6px_6px_0_0_#0B1A12] ${SURFACES[tone]} ${className}`
      }
    >
      {children}
    </div>
  );
}
