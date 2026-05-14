import { copy } from '@/config/copy';
import { ButtonLink } from '@/components/retro/Button';

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 space-y-6 text-chalk">
      <ButtonLink href="/" variant="ghost" size="sm">← back to the hub</ButtonLink>

      <header>
        <h1 className="font-display text-5xl">About {copy.brand.name}</h1>
        <p className="text-chalk/80 mt-2">{copy.brand.tagline}.</p>
      </header>

      <Section title="What this is">
        <p>
          {copy.brand.name} is a one-page hub for {copy.tournament.descriptive}. It pulls together
          schedule, scores, what fans are talking about, and where the prediction market is
          moving — so you don't have to juggle five tabs.
        </p>
        <p>It's an independent project. No official affiliation, no broadcast clips, no protected marks.</p>
      </Section>

      <Section title="Sources">
        <ul className="list-disc list-inside space-y-1 text-chalk/85">
          <li>Schedule, results, lineups — football data API (football-data.org / api-football)</li>
          <li>News pulse — r/soccer JSON (read-only)</li>
          <li>Market pulse — Kalshi public API</li>
          <li>Weather — OpenWeatherMap</li>
          <li>Static metadata — Wikipedia / Wikidata</li>
        </ul>
      </Section>

      <Section title="Methodology">
        <p>
          The pulse pipeline pulls hot/top/new from r/soccer every 20 minutes, filters by a
          tournament-relevance keyword set, clusters posts into topics, and ranks by a composite
          of upvotes, comments, recency, and source count. Top 3–5 surface on the homepage.
        </p>
        <p>
          Market Pulse converts Kalshi mid prices to implied probabilities and compares against a
          24-hour-prior snapshot to compute movers.
        </p>
      </Section>

      <Section title="Credits">
        <p>Built solo. Pixel asset credits land here when art is finalized.</p>
      </Section>

      <Section title="Contact">
        <p>Bug reports, suggestions, friendly hellos welcome.</p>
      </Section>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl">{title}</h2>
      <div className="chalk-line my-2" />
      <div className="space-y-2 text-chalk/85">{children}</div>
    </section>
  );
}
