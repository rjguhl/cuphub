import { notFound } from 'next/navigation';
import { getMatch } from '@/lib/data/matches';
import { getMatchOdds } from '@/lib/data/odds';
import { shortKickoff, countdown } from '@/lib/utils/time';
import { ButtonLink } from '@/components/retro/Button';
import { Badge } from '@/components/retro/Badge';

// Match page renders one of three states based on `match.state`.
export const revalidate = 30;

export default async function MatchPage({ params }: { params: { id: string } }) {
  const match = await getMatch(params.id);
  if (!match) notFound();
  const odds = await getMatchOdds(match.id);

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 space-y-8">
      <ButtonLink href="/" variant="ghost" size="sm">← back to the hub</ButtonLink>

      <header className="penalty-box rounded-md bg-shadow/50 p-6">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge tone="yellow">{match.stage.toUpperCase()}</Badge>
          <Badge tone="sky">{match.venueCity || 'TBD'}</Badge>
          {match.state === 'live' && <Badge tone="red">● LIVE</Badge>}
          {match.state === 'recap' && <Badge tone="lime">FT</Badge>}
        </div>
        <div className="mt-3 flex items-baseline gap-4 scoreboard text-5xl">
          <span>{match.homeCode}</span>
          {match.state !== 'preview' ? (
            <>
              <span className="text-yellow">{match.homeScore ?? 0}</span>
              <span className="text-chalk/50 text-2xl">—</span>
              <span className="text-yellow">{match.awayScore ?? 0}</span>
            </>
          ) : (
            <span className="text-chalk/50 text-3xl">vs</span>
          )}
          <span>{match.awayCode}</span>
        </div>
        <p className="mt-2 text-sm text-chalk/80">
          {match.state === 'preview' && (
            <>Kickoff {shortKickoff(match.kickoffISO)} · in {countdown(match.kickoffISO)}</>
          )}
          {match.state === 'live' && <>● Live · {match.minute ?? 0}'</>}
          {match.state === 'recap' && <>Final whistle · {shortKickoff(match.kickoffISO)}</>}
        </p>
      </header>

      {match.state === 'preview' && <Preview match={match} odds={odds} />}
      {match.state === 'live' && <Live match={match} />}
      {match.state === 'recap' && <Recap match={match} />}
    </main>
  );
}

function Preview({ match, odds }: { match: any; odds: any }) {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      <Tile title="Where">
        <p className="text-sm text-chalk/80">{match.venueCity}</p>
      </Tile>
      <Tile title="When (your time)">
        <p className="scoreboard">{shortKickoff(match.kickoffISO)}</p>
      </Tile>
      <Tile title="Market probabilities">
        {odds ? (
          <ul className="text-sm scoreboard space-y-1">
            <li>{match.homeCode} win · {(odds.home * 100).toFixed(0)}%</li>
            <li>Draw · {(odds.draw * 100).toFixed(0)}%</li>
            <li>{match.awayCode} win · {(odds.away * 100).toFixed(0)}%</li>
          </ul>
        ) : (
          <p className="text-sm text-chalk/60">Market not yet open.</p>
        )}
      </Tile>
      <Tile title="Storylines">
        <p className="text-sm text-chalk/80">Editorial preview drops in the hours before kickoff.</p>
      </Tile>
    </section>
  );
}

function Live({ match }: { match: any }) {
  return (
    <section>
      <Tile title="Event ticker">
        <p className="text-sm text-chalk/80">Polled every 30s. Goals, cards, subs land here as they happen.</p>
      </Tile>
    </section>
  );
}

function Recap({ match }: { match: any }) {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      <Tile title="Recap">
        <p className="text-sm text-chalk/80">Hand-written 3-sentence recap in CupHub voice goes here.</p>
      </Tile>
      <Tile title="Key moments">
        <p className="text-sm text-chalk/80">Goals, turning point, talking point.</p>
      </Tile>
    </section>
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
