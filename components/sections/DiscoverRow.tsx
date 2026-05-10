import { copy } from '@/config/copy';
import { Card } from '@/components/ui/Card';
import { getDiscoverCards } from '@/lib/data/discover';

export async function DiscoverRow() {
  const cards = await getDiscoverCards();
  return (
    <section>
      <h2 className="font-display text-2xl mb-3">{copy.sections.discover}</h2>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Card key={c.id} title={c.title} body={c.body} href={c.href} meta={c.kind} />
        ))}
      </div>
    </section>
  );
}
