import { copy } from '@/config/copy';
import { getChampionshipLeaders, getBiggestMovers } from '@/lib/data/odds';
import { Card } from '@/components/ui/Card';

export async function MarketPulse() {
  const [leaders, movers] = await Promise.all([getChampionshipLeaders(5), getBiggestMovers(3)]);
  return (
    <section>
      <h2 className="font-display text-2xl mb-3">{copy.sections.market}</h2>
      {leaders.length === 0 && movers.length === 0 ? (
        <p className="text-sm opacity-70">{copy.empty.market}</p>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <h3 className="text-sm uppercase tracking-wide mb-2 opacity-70">Top 5 favorites</h3>
            <ul className="space-y-1">
              {leaders.map((o) => (
                <li key={o.teamCode} className="flex justify-between">
                  <span>{o.teamName}</span>
                  <span className="font-mono">{Math.round(o.impliedProb * 100)}%</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-wide mb-2 opacity-70">Biggest movers (24h)</h3>
            <div className="space-y-2">
              {movers.map((m) => (
                <Card
                  key={m.teamCode}
                  title={m.teamName}
                  body={`${Math.round((m.prob24hAgo ?? 0) * 100)}% → ${Math.round(m.impliedProb * 100)}%`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
