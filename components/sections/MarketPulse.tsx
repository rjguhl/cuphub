import { copy } from '@/config/copy';
import { getChampionshipLeaders, getBiggestMovers } from '@/lib/data/odds';
import { SectionHeader } from '@/components/ui/SectionHeader';

export async function MarketPulse() {
  const [leaders, movers] = await Promise.all([
    getChampionshipLeaders(5),
    getBiggestMovers(3),
  ]);

  return (
    <section>
      <SectionHeader
        eyebrow="The bookmakers' bench"
        title={copy.sections.market}
        hint="Kalshi prediction market"
      />

      {leaders.length === 0 && movers.length === 0 ? (
        <p className="text-sm text-chalk/70">{copy.empty.market}</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-5">
          {/* Leaderboard — 3/5 width */}
          <div className="md:col-span-3 penalty-box rounded-md bg-shadow/50 p-5">
            <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-yellow mb-3">
              Top 5 to lift the trophy
            </p>
            <ul className="space-y-2">
              {leaders.map((o, i) => (
                <li key={o.teamCode} className="flex items-center gap-3">
                  <span className="scoreboard text-yellow w-6 text-right">{i + 1}</span>
                  <span className="flex-1 font-display">{o.teamName}</span>
                  <ProbBar value={o.impliedProb} />
                  <span className="scoreboard w-12 text-right">{Math.round(o.impliedProb * 100)}%</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Movers — 2/5 width */}
          <div className="md:col-span-2 penalty-box rounded-md bg-shadow/50 p-5">
            <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-yellow mb-3">
              24h movers
            </p>
            <ul className="space-y-3">
              {movers.map((m) => {
                const delta = m.impliedProb - (m.prob24hAgo ?? 0);
                const up = delta >= 0;
                return (
                  <li key={m.teamCode} className="flex items-center gap-3">
                    <span className={`scoreboard text-lg ${up ? 'text-yellow' : 'text-red'}`}>
                      {up ? '▲' : '▼'}
                    </span>
                    <span className="flex-1 font-display">{m.teamName}</span>
                    <span className="scoreboard text-sm">
                      {up ? '+' : ''}
                      {Math.round(delta * 100)}pp
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}

function ProbBar({ value }: { value: number }) {
  const pct = Math.max(2, Math.round(value * 100));
  return (
    <div className="hidden sm:block h-2 w-24 bg-shadow rounded-full overflow-hidden">
      <div className="h-full bg-yellow" style={{ width: `${pct}%` }} />
    </div>
  );
}
