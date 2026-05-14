import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCity } from '@/lib/data/cities';
import { getAllMatches } from '@/lib/data/matches';
import { fetchForecast } from '@/lib/sources/weather';
import { shortKickoff } from '@/lib/utils/time';
import { ButtonLink } from '@/components/retro/Button';
import { Badge } from '@/components/retro/Badge';

export const revalidate = 3600;

export default async function CityPage({ params }: { params: { slug: string } }) {
  const city = await getCity(params.slug);
  if (!city) notFound();

  const all = await getAllMatches();
  const matchesHere = all.filter((m) => m.venueCity === city.slug);
  const weather = await fetchForecast({
    lat: city.lat ?? 0,
    lon: city.lon ?? 0,
    timezone: city.timezone,
  });

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 space-y-8">
      <ButtonLink href="/" variant="ghost" size="sm">← back to the hub</ButtonLink>

      <header className="penalty-box rounded-md bg-shadow/50 p-6">
        <div className="flex gap-2 flex-wrap mb-2">
          <Badge tone="yellow">{city.country}</Badge>
          <Badge tone="sky">{city.timezone}</Badge>
          <Badge tone="lime">{city.capacity.toLocaleString()} CAP</Badge>
        </div>
        <h1 className="font-display text-4xl mt-1">{city.name}</h1>
        <p className="text-sm text-chalk/80 mt-1">{city.stadium}</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <Tile title="Matches here">
          {matchesHere.length === 0 ? (
            <p className="text-sm text-chalk/70">No matches scheduled at this venue yet.</p>
          ) : (
            <ul className="text-sm scoreboard space-y-1">
              {matchesHere.map((m) => (
                <li key={m.id}>
                  <Link href={`/matches/${m.id}` as any} className="hover:text-yellow">
                    {shortKickoff(m.kickoffISO)} · {m.homeCode} v {m.awayCode}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Tile>

        <Tile title="Weather">
          {weather ? (
            <p className="scoreboard text-3xl">{Math.round(weather.tempC)}°C · {weather.conditions}</p>
          ) : (
            <p className="text-sm text-chalk/70">Avg June/July: warm. Wear sunscreen.</p>
          )}
        </Tile>

        <Tile title="The city in 3 sentences">
          <p className="text-sm text-chalk/80">
            Editorial blurb (~150 words) in CupHub voice. Lives in /content/cities/{city.slug}.mdx.
          </p>
        </Tile>

        <Tile title="Watch parties & neighborhoods">
          <p className="text-sm text-chalk/80">Local fan zones and bar callouts go here once announced.</p>
        </Tile>
      </div>
    </main>
  );
}

function Tile({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="penalty-box rounded-md bg-shadow/50 p-5">
      <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-yellow mb-2">{title}</p>
      {children}
    </div>
  );
}
