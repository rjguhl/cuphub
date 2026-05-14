// Consistent section header with chalk-line treatment. Reused across sections.
type Props = {
  eyebrow?: string;
  title: string;
  hint?: string;
};

export function SectionHeader({ eyebrow, title, hint }: Props) {
  return (
    <div className="mb-4">
      <div className="flex items-baseline justify-between">
        <div>
          {eyebrow && (
            <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-yellow">{eyebrow}</p>
          )}
          <h2 className="font-display text-2xl md:text-3xl text-chalk">{title}</h2>
        </div>
        {hint && <span className="text-xs text-chalk/60">{hint}</span>}
      </div>
      <div className="chalk-line mt-2" />
    </div>
  );
}
