import Link from 'next/link';

type Tone = 'chalk' | 'pitch' | 'cream';

type Props = {
  title: string;
  body?: string;
  href?: string;
  meta?: string;
  tone?: Tone;
};

const TONES: Record<Tone, string> = {
  // Default — looks like a chalk-bordered patch on the pitch
  chalk: 'bg-shadow/50 backdrop-blur border-2 border-chalk/80 text-chalk hover:border-yellow hover:-translate-y-0.5',
  // Floating panel — solid grass
  pitch: 'bg-grass border border-chalk/30 text-chalk hover:border-magenta hover:-translate-y-0.5',
  // Off-white sheet — for prose-heavy contexts
  cream: 'bg-cream border border-shadow/20 text-ink hover:border-corner hover:-translate-y-0.5',
};

// One Card family. Tone shifts via prop, not new components — keeps the family modular.
export function Card({ title, body, href, meta, tone = 'chalk' }: Props) {
  const inner = (
    <div className={`rounded-md p-4 transition-all duration-150 h-full ${TONES[tone]}`}>
      {meta && (
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-yellow mb-1">
          {meta}
        </p>
      )}
      <h3 className="font-display text-xl leading-tight">{title}</h3>
      {body && <p className="text-sm mt-1 opacity-90">{body}</p>}
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
