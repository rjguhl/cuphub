import { copy } from '@/config/copy';
import { getTopPulseTopics } from '@/lib/data/pulse';
import { RetroCard } from '@/components/retro/RetroCard';
import { Badge } from '@/components/retro/Badge';
import { SectionHeader } from '@/components/ui/SectionHeader';

const TONES = ['cream', 'yellow', 'sky', 'lime', 'magenta'] as const;

export async function PulseFeed() {
  const topics = await getTopPulseTopics();
  return (
    <section>
      <SectionHeader eyebrow="The crowd" title={copy.sections.pulse} hint="r/soccer · refreshed every 20m" />
      {topics.length === 0 ? (
        <p className="text-sm text-chalk/70">{copy.empty.pulse}</p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {topics.map((t, i) => (
            <RetroCard key={t.id} tone={TONES[i % TONES.length]} href={t.topUrl}>
              <div className="flex items-center gap-2 mb-2">
                <Badge tone="chalk">
                  {t.sourceCount} thread{t.sourceCount > 1 ? 's' : ''}
                </Badge>
                <Badge tone="gold">{t.score} pts</Badge>
              </div>
              <h3 className="font-display text-xl leading-tight">{t.title}</h3>
              {t.summary && <p className="text-sm mt-1 opacity-90">{t.summary}</p>}
            </RetroCard>
          ))}
        </div>
      )}
    </section>
  );
}
