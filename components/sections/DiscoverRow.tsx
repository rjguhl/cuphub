import { copy } from '@/config/copy';
import { RetroCard } from '@/components/retro/RetroCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { getDiscoverCards } from '@/lib/data/discover';

const KIND_LABEL: Record<string, string> = {
  'team-to-watch': 'Team to watch',
  'city-spotlight': 'City spotlight',
  'stat-of-day': 'Stat of the day',
  'underdog': 'Underdog tracker',
  'throwback': 'Throwback',
};

// Each kind gets its own retro tone so the row reads like a strip of arcade cards.
const KIND_TONE = {
  'team-to-watch': 'yellow',
  'city-spotlight': 'sky',
  'stat-of-day': 'lime',
  'underdog': 'magenta',
  'throwback': 'cream',
} as const;

export async function DiscoverRow() {
  const cards = await getDiscoverCards();
  return (
    <section>
      <SectionHeader eyebrow="Off the bench" title={copy.sections.discover} />
      {cards.length === 0 ? (
        <p className="text-sm text-chalk/70">More vibes incoming.</p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <RetroCard
              key={c.id}
              tone={KIND_TONE[c.kind] ?? 'cream'}
              meta={KIND_LABEL[c.kind] ?? c.kind}
              title={c.title}
              body={c.body}
              href={c.href}
            />
          ))}
        </div>
      )}
    </section>
  );
}
