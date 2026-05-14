import { copy } from '@/config/copy';
import { getTodaysMatches, type Match } from '@/lib/data/matches';
import { tournamentPhase, shortKickoff, countdown } from '@/lib/utils/time';
import { Eagle } from '@/components/sprites/Eagle';
import { Sparkles, Star } from '@/components/sprites/Star';
import { Confetti } from '@/components/ui/Confetti';
import { Badge } from '@/components/retro/Badge';

// Hero = scoreboard + center circle + celebration. Three states: pre, live, post.
export async function HeroToday() {
  const today = await getTodaysMatches();
  const phase = tournamentPhase();
  const live = today.find((m) => m.state === 'live');
  const next = today.find((m) => m.state === 'preview');
  const recap = today.find((m) => m.state === 'recap');

  const subline =
    phase.phase === 'pre'
      ? `${phase.daysToStart} days till kickoff`
      : phase.phase === 'live'
        ? `Day ${phase.day} · ${phase.stage}`
        : 'See you in 2030';

  return (
    <section className="relative overflow-hidden rounded-2xl bg-floodlit shadow-flood center-circle animate-rise">
      {/* Sparkle confetti behind everything */}
      <Sparkles count={10} />
      {/* Pyrotechnic corners */}
      <div className="absolute -top-12 -left-12 w-40 h-40 rounded-full bg-magenta/20 blur-2xl" />
      <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-yellow/20 blur-2xl" />
      {/* Penalty arc / chalk corner detail */}
      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full border-2 border-chalk/30" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-chalk/40" />

      {/* Confetti pop on first finish of the day */}
      {recap && <Confetti trigger={recap.id} />}

      <div className="relative p-6 md:p-10">
        <header className="flex items-center gap-3">
          <Eagle size={56} idle />
          <div className="flex-1">
            <h1 className="font-display text-4xl md:text-6xl tracking-tight leading-none">
              <span className="text-chalk">Cup</span>
              <span className="text-yellow">Hub</span>
              <Star size={14} className="inline-block ml-2 align-middle animate-sparkle" />
            </h1>
            <p className="text-sm uppercase tracking-[0.2em] text-chalk/85 mt-1">{subline}</p>
          </div>
          {phase.phase === 'live' && (
            <span className="hidden md:inline-block animate-flicker">
              <Badge tone="red">● Tournament live</Badge>
            </span>
          )}
        </header>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {/* Big block — what's happening right now */}
          <div className="md:col-span-2 penalty-box bg-shadow/50 backdrop-blur p-5 rounded-md relative overflow-hidden">
            {live ? (
              <LiveCard match={live} />
            ) : next ? (
              <NextCard match={next} />
            ) : recap ? (
              <RecapCard match={recap} />
            ) : (
              <EmptyCard daysToStart={phase.phase === 'pre' ? phase.daysToStart : null} />
            )}
          </div>

          {/* Side rail — quick day glance */}
          <aside className="penalty-box bg-shadow/50 backdrop-blur p-5 rounded-md">
            <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-yellow flex items-center gap-1">
              <Star size={8} color="#FFD60A" /> Today's slate
            </p>
            {today.length ? (
              <ul className="mt-2 space-y-2 text-sm">
                {today.slice(0, 4).map((m) => (
                  <li key={m.id} className="flex justify-between font-mono">
                    <span>{m.homeCode} v {m.awayCode}</span>
                    <span className="text-chalk/70">{shortKickoff(m.kickoffISO)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-chalk/70">Rest day. Stretch the hammies.</p>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}

function LiveCard({ match }: { match: Match }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-red animate-flicker font-mono">
        ● Live · {match.minute ?? 0}'
      </p>
      <div className="mt-2 flex items-baseline gap-4 scoreboard text-5xl md:text-7xl">
        <span>{match.homeCode}</span>
        <span className="text-yellow">{match.homeScore ?? 0}</span>
        <span className="text-chalk/50 text-3xl">—</span>
        <span className="text-yellow">{match.awayScore ?? 0}</span>
        <span>{match.awayCode}</span>
      </div>
    </div>
  );
}

function NextCard({ match }: { match: Match }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-magenta font-mono">
        Up next · in {countdown(match.kickoffISO)}
      </p>
      <div className="mt-2 flex items-baseline gap-4 scoreboard text-4xl md:text-6xl">
        <span>{match.homeCode}</span>
        <span className="text-chalk/50 text-3xl">vs</span>
        <span>{match.awayCode}</span>
      </div>
      <p className="mt-2 text-sm text-chalk/85">{shortKickoff(match.kickoffISO)} · {match.venueCity}</p>
    </div>
  );
}

function RecapCard({ match }: { match: Match }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-lime font-mono flex items-center gap-1">
        <Star size={10} color="#B6FF3D" /> Final whistle
      </p>
      <div className="mt-2 flex items-baseline gap-4 scoreboard text-5xl md:text-7xl">
        <span>{match.homeCode}</span>
        <span className="text-gold">{match.homeScore ?? 0}</span>
        <span className="text-chalk/50 text-3xl">—</span>
        <span className="text-gold">{match.awayScore ?? 0}</span>
        <span>{match.awayCode}</span>
      </div>
    </div>
  );
}

function EmptyCard({ daysToStart }: { daysToStart: number | null }) {
  return (
    <div className="relative">
      <p className="text-xs uppercase tracking-widest text-magenta font-mono">The countdown</p>
      {daysToStart != null ? (
        <div className="mt-2 flex items-baseline gap-3">
          <span className="scoreboard text-7xl md:text-8xl text-yellow leading-none">
            {daysToStart}
          </span>
          <span className="font-display text-2xl text-chalk">
            day{daysToStart === 1 ? '' : 's'} to kickoff
          </span>
        </div>
      ) : (
        <p className="mt-2 font-display text-3xl">The world's biggest summer is almost here.</p>
      )}
    </div>
  );
}
