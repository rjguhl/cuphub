import { copy } from '@/config/copy';
import { getTopPulseTopics } from '@/lib/data/pulse';
import { Card } from '@/components/ui/Card';

export async function PulseFeed() {
  const topics = await getTopPulseTopics();
  return (
    <section>
      <h2 className="font-display text-2xl mb-3">{copy.sections.pulse}</h2>
      {topics.length === 0 ? (
        <p className="text-sm opacity-70">{copy.empty.pulse}</p>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {topics.map((t) => (
            <Card key={t.id} title={t.title} body={t.summary} href={t.topUrl} meta={`${t.sourceCount} sources`} />
          ))}
        </div>
      )}
    </section>
  );
}
