import { notFound } from 'next/navigation';
import { getTeam } from '@/lib/data/teams';

export const revalidate = 3600;

export default async function TeamPage({ params }: { params: { code: string } }) {
  const team = await getTeam(params.code);
  if (!team) notFound();
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 space-y-6">
      <header className="flex items-baseline gap-3">
        <h1 className="font-display text-4xl">{team.name}</h1>
        {team.group && <span className="text-sm opacity-70">Group {team.group}</span>}
      </header>
      {/* TODO: squad, fixtures+results, filtered news, market odds to advance, editorial profile */}
    </main>
  );
}
