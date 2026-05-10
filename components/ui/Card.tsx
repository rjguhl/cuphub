import Link from 'next/link';

type Props = {
  title: string;
  body?: string;
  href?: string;
  meta?: string;
};

// One Card family for all content types — tone shifts via props, not new components.
export function Card({ title, body, href, meta }: Props) {
  const inner = (
    <div className="rounded-xl border border-deeppurple/10 bg-cream p-4 hover:border-hotpink transition-colors h-full">
      {meta && <p className="text-xs uppercase tracking-wide text-hotpink mb-1">{meta}</p>}
      <h3 className="font-display text-lg leading-tight">{title}</h3>
      {body && <p className="text-sm mt-1 opacity-80">{body}</p>}
    </div>
  );
  return href ? <Link href={href as any}>{inner}</Link> : inner;
}
