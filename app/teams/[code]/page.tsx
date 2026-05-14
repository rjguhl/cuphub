import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTeam } from '@/lib/data/teams';
import { getAllMatches } from '@/lib/data/matches';
import { shortKickoff } from '@/lib/utils/time';
import { ButtonLink } from '@/components/retro/Button';
import { Badge } from '@/components/retro/Badge';

export const revalidate = 3600;

export default async function TeamPage({ params }: { params: { code: string } }) {
  const team = await getTeam(params.code);
  if (!team) notFound();

  const all = await getAllMatches();
  const fixtures = all
    .filter((m) => m.homeCode === team.code || m.awayCode === team.code)
    .sort((a, b) => a.kickoffISO.localeCompare(b.kickoffISO));

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 space-y-8">
      <ButtonLink href="/" variant="ghost" size="sm">← back to the hub</ButtonLink>

      <header className="penalty-box rounded-md bg-shadow/50 p-6 flex items-center gap-4">
        {team.flagEmoji && <span className="text-5xl">{team.flagEmoji}</span>}
        <div className="flex-1">
          <h1 className="font-display text-4xl">{team.name}</h1>
          <div className="mt-2 flex gap-2 flex-wrap">
            {team.group && <Badge tone="yellow">Group {team.group}</Badge>}
            <Badge tone="chalk">{team.code}</Badge>
          </div>
        </div>
      </header>

      <Section title="Fixtures & results">
        {fixtures.length === 0 ? (
          <p className="text-sm text-chalk/70">Schedule loading.</p>
        ) : (
          <ul className="divide-y divide-chalk/10">
            {fixtures.map((m) => (
              <li key={m.id} className="py-2 flex items-baseline gap-3 scoreboard text-sm">
                <span className="w-24 text-chalk/60">{shortKickoff(m.kickoffISO)}</span>
                <Link href={`/matches/${m.id}` as any} className="flex-1 hover:text-yellow">
                  {m.homeCode} {m.state === 'recap' ? `${m.homeScore}` : ''} — {m.state === 'recap' ? `${m.awayScore}` : ''} {m.awayCode}
                </Link>
                <span className="text-xs text-chalk/50 uppercase">{m.stage}</span>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section title="Squad">
        <p className="text-sm text-chalk/70">Squad list renders here once it's official.</p>
      </Section>

      <Section title="Profile">
        <p className="text-sm text-chalk/80">
          Editorial blurb in CupHub voice — about 100 words, lives in /content/teams/{team.code.toLowerCase()}.mdx.
        </p>
      </Section>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl mb-2 text-chalk">{title}</h2>
      <div className="chalk-line mb-3" />
      <div className="penalty-box rounded-md bg-shadow/50 p-5">{children}</div>
    </section>
  );
}
