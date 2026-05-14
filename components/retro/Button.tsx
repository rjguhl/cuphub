// RetroUI-style button: solid fill, hard 2px border, offset block shadow.
// On press the shadow collapses and the button shifts — feels physical, like an arcade key.
import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

type Variant = 'primary' | 'accent' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-yellow text-ink border-ink',
  accent: 'bg-magenta text-chalk border-ink',
  ghost: 'bg-cream text-ink border-ink',
  danger: 'bg-red text-chalk border-ink',
};

const SIZES: Record<Size, string> = {
  sm: 'px-3 py-1 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

const BASE =
  'inline-flex items-center justify-center gap-2 font-display tracking-wide ' +
  'border-2 rounded-none transition-all duration-100 ' +
  'shadow-[4px_4px_0_0_#0B1A12] ' +
  'hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#0B1A12] ' +
  'active:translate-x-[4px] active:translate-y-[4px] active:shadow-none ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow';

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  ...rest
}: CommonProps & ComponentProps<'button'>) {
  return (
    <button {...rest} className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`}>
      {rest.children}
    </button>
  );
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  children,
}: CommonProps & { href: string }) {
  return (
    <Link href={href as any} className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`}>
      {children}
    </Link>
  );
}
