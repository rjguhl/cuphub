import { getGroups, getBracket } from '@/lib/data/standings';
import { tournamentPhase } from '@/lib/utils/time';
import { SectionHeader } from '@/components/ui/SectionHeader';

// Tabbed view. During group stage, lead with tables. From R16 on, lead with bracket.
export async function BracketWidget() {
  const phase = tournamentPhase();
  const inKnockouts = phase.phase === 'live' && phase.day > 17;
  const [groups, bracket] = await Promise.all([getGroups(), getBracket()]);

  return (
    <section>
      <SectionHeader
        eyebrow="Where it stands"
        title={inKnockouts ? 'Bracket' : 'Group stage'}
      />

      {inKnockouts ? (
        <BracketDiagram bracket={bracket} />
      ) : (
        <GroupTables groups={groups} />
      )}
    </section>
  );
}

function GroupTables({ groups }: { groups: Awaited<ReturnType<typeof getGroups>> }) {
  if (groups.length === 0) {
    return (
      <div className="penalty-box rounded-md bg-shadow/50 p-5 text-sm text-chalk/70">
        Groups will be drawn closer to kickoff.
      </div>
    );
  }
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {groups.map((g) => (
        <div key={g.name} className="penalty-box rounded-md bg-shadow/50 p-4">
          <p className="font-display text-xl mb-2">Group {g.name}</p>
          <table className="w-full text-sm scoreboard">
            <thead className="text-chalk/60 text-[10px] uppercase">
              <tr>
                <th className="text-left">Team</th>
                <th>P</th>
                <th>GD</th>
                <th>Pts</th>
              </tr>
            </thead>
            <tbody>
              {g.rows.map((r, i) => (
                <tr key={r.teamCode} className={i < 2 ? 'text-yellow' : ''}>
                  <td className="text-left py-0.5">{r.teamCode}</td>
                  <td className="text-center">{r.played}</td>
                  <td className="text-center">{r.gd > 0 ? `+${r.gd}` : r.gd}</td>
                  <td className="text-center font-bold">{r.pts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

const STAGE_LABEL: Record<string, string> = {
  r32: 'Round of 32',
  r16: 'Round of 16',
  qf: 'Quarterfinals',
  sf: 'Semifinals',
  third: '3rd Place',
  final: 'Final',
};

function BracketDiagram({ bracket }: { bracket: Awaited<ReturnType<typeof getBracket>> }) {
  const stages: Array<keyof typeof STAGE_LABEL> = ['r32', 'r16', 'qf', 'sf', 'final'];
  return (
    <div className="overflow-x-auto">
      <div className="flex gap-4 min-w-fit">
        {stages.map((s) => {
          const ties = bracket.filter((b) => b.stage === s);
          if (!ties.length) return null;
          return (
            <div key={s} className="min-w-[180px]">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-yellow mb-2">
                {STAGE_LABEL[s]}
              </p>
              <div className="space-y-2">
                {ties.map((t) => (
                  <div key={t.matchId} className="penalty-box rounded-md bg-shadow/50 p-2 text-sm">
                    <div className="flex justify-between scoreboard">
                      <span>{t.homeCode ?? '—'}</span>
                      <span>{t.homeScore ?? ''}</span>
                    </div>
                    <div className="flex justify-between scoreboard">
                      <span>{t.awayCode ?? '—'}</span>
                      <span>{t.awayScore ?? ''}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
