// RetroUI-style card. Hard 2px border, offset block shadow that lifts on hover.
import Link from 'next/link';
import type { ReactNode } from 'react';

type Tone = 'cream' | 'yellow' | 'magenta' | 'sky' | 'lime' | 'chalk';

const SURFACES: Record<Tone, string> = {
  cream: 'bg-cream text-ink',
  yellow: 'bg-yellow text-ink',
  magenta: 'bg-magenta text-chalk',
  sky: 'bg-sky text-ink',
  lime: 'bg-lime text-ink',
  chalk: 'bg-chalk text-ink',
};

type Props = {
  tone?: Tone;
  meta?: string;
  title?: string;
  body?: string;
  href?: string;
  children?: ReactNode;
  className?: string;
};

export function RetroCard({
  tone = 'cream',
  meta,
  title,
  body,
  href,
  children,
  className = '',
}: Props) {
  const inner = (
    <div
      className={
        `relative h-full p-4 border-2 border-ink rounded-none ` +
        `shadow-[6px_6px_0_0_#0B1A12] ` +
        `transition-all duration-100 ` +
        `hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_0_#0B1A12] ` +
        `${SURFACES[tone]} ${className}`
      }
    >
      {meta && (
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] mb-1 opacity-80">
          {meta}
        </p>
      )}
      {title && <h3 className="font-display text-xl leading-tight">{title}</h3>}
      {body && <p className="text-sm mt-1 opacity-90">{body}</p>}
      {children}
    </div>
  );
  return href ? (
    <Link href={href as any} className="block h-full">
      {inner}
    </Link>
  ) : (
    inner
  );
}
