import { copy } from '@/config/copy';
import { getTodaysMatches } from '@/lib/data/matches';
import { Eagle } from '@/components/sprites/Eagle';

export async function HeroToday() {
  const today = await getTodaysMatches();
  const status = today.length ? `${today.length} match${today.length > 1 ? 'es' : ''} today` : 'No matches today';
  return (
    <section className="bg-sunset rounded-2xl p-6 text-cream shadow-md">
      <div className="flex items-center gap-3">
        <Eagle size={48} />
        <div>
          <h1 className="font-display text-3xl">{copy.brand.name}</h1>
          <p className="text-sm opacity-90">{status}</p>
        </div>
      </div>
      {/* TODO: countdown / live ticker / post-match recap card based on time-of-day */}
    </section>
  );
}
