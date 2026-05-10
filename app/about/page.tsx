import { copy } from '@/config/copy';

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 prose prose-sm">
      <h1 className="font-display text-4xl">About {copy.brand.name}</h1>
      <p>An aggregated, summer-vibes hub for {copy.tournament.descriptive}.</p>
      <h2>Sources</h2>
      <ul>
        <li>Schedule and results — football data provider</li>
        <li>News pulse — r/soccer (Reddit JSON)</li>
        <li>Market pulse — Kalshi public API</li>
        <li>Weather — OpenWeatherMap</li>
        <li>Static metadata — Wikipedia / Wikidata</li>
      </ul>
      <h2>Methodology</h2>
      <p>How topics are selected, how movement is computed, refresh cadences.</p>
      <h2>Credits</h2>
      <p>Pixel asset credits go here.</p>
    </main>
  );
}
