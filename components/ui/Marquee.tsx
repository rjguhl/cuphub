// Stadium scoreboard ticker — endless horizontal scroll. Pause on hover.
import type { ReactNode } from 'react';

export function Marquee({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="flex gap-8 whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
        {children}
        {children}
      </div>
    </div>
  );
}
