import { copy } from '@/config/copy';
import { getUpcomingMatches } from '@/lib/data/matches';
import { Card } from '@/components/ui/Card';

export async function UpcomingStrip() {
  const matches = await getUpcomingMatches(3);
  return (
    <section>
      <h2 className="font-display text-2xl mb-3">{copy.sections.upcoming}</h2>
      <div className="grid gap-3 md:grid-cols-3">
        {matches.map((m) => (
          <Card
            key={m.id}
            title={`${m.homeCode} vs ${m.awayCode}`}
            body={new Date(m.kickoffISO).toLocaleString()}
            href={`/matches/${m.id}`}
            meta={m.venueCity}
          />
        ))}
      </div>
    </section>
  );
}
