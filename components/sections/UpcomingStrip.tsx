import { copy } from '@/config/copy';
import { getUpcomingMatches } from '@/lib/data/matches';
import { countdown, shortKickoff } from '@/lib/utils/time';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { RetroCard } from '@/components/retro/RetroCard';
import { Badge } from '@/components/retro/Badge';

const TONES = ['cream', 'sky', 'yellow'] as const;

export async function UpcomingStrip() {
  const matches = await getUpcomingMatches(3);

  return (
    <section>
      <SectionHeader eyebrow="On the slate" title={copy.sections.upcoming} hint="your local time" />
      {matches.length === 0 ? (
        <p className="text-sm text-chalk/70">Nothing scheduled yet — schedule loads from the API.</p>
      ) : (
        <div className="grid gap-5 md:grid-cols-3">
          {matches.map((m, i) => (
            <RetroCard
              key={m.id}
              tone={TONES[i % TONES.length]}
              href={`/matches/${m.id}`}
            >
              <div className="flex items-center justify-between mb-2">
                <Badge tone="magenta">in {countdown(m.kickoffISO)}</Badge>
                <span className="text-[10px] font-mono uppercase opacity-70">{m.stage}</span>
              </div>
              <p className="scoreboard text-3xl">
                {m.homeCode} <span className="opacity-50 text-xl">v</span> {m.awayCode}
              </p>
              <p className="text-xs mt-2 opacity-80">
                {shortKickoff(m.kickoffISO)} · {m.venueCity}
              </p>
            </RetroCard>
          ))}
        </div>
      )}
    </section>
  );
}
