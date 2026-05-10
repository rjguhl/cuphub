import { notFound } from 'next/navigation';
import { getMatch } from '@/lib/data/matches';

export const revalidate = 30;

export default async function MatchPage({ params }: { params: { id: string } }) {
  const match = await getMatch(params.id);
  if (!match) notFound();
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 space-y-6">
      <h1 className="font-display text-3xl">
        {match.homeCode} vs {match.awayCode}
      </h1>
      {/* Render based on match.state: preview | live | recap */}
      {match.state === 'preview' && <p>Kickoff: {new Date(match.kickoffISO).toLocaleString()}</p>}
      {match.state === 'live' && <p>Live · {match.minute}'</p>}
      {match.state === 'recap' && <p>Final · {match.homeScore}–{match.awayScore}</p>}
    </main>
  );
}
