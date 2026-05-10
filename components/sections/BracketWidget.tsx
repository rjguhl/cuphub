// Tabbed bracket / standings. Group tables during groups, knockout diagram from R16 on.
export async function BracketWidget() {
  return (
    <section>
      <h2 className="font-display text-2xl mb-3">Bracket</h2>
      <div className="rounded-xl border border-deeppurple/20 p-4 bg-cream">
        <p className="text-sm opacity-70">Standings + bracket diagram render here.</p>
        {/* TODO: tabs (groups | knockout); pull from lib/data/standings.ts */}
      </div>
    </section>
  );
}
