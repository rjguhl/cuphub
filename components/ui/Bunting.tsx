// Stadium bunting — triangular flag streamer that runs across the top of every page.
// Inline SVG so it's free, scalable, and themeable. Cycles through accent palette.
const COLORS = ['#FFD60A', '#FF2E4C', '#3DB7FF', '#FF3DCB', '#B6FF3D', '#FFB300', '#FF6B2B'];

export function Bunting({ count = 28 }: { count?: number }) {
  return (
    <div
      aria-hidden
      className="sticky top-0 z-40 w-full overflow-hidden pointer-events-none"
      style={{ height: 26 }}
    >
      <svg
        viewBox={`0 0 ${count * 24} 26`}
        preserveAspectRatio="none"
        className="w-full h-full"
        shapeRendering="crispEdges"
      >
        {/* String the flags hang from */}
        <line x1="0" y1="2" x2={count * 24} y2="2" stroke="#FFFFFF" strokeOpacity="0.6" strokeWidth="1" />
        {Array.from({ length: count }).map((_, i) => {
          const x = i * 24;
          const c = COLORS[i % COLORS.length];
          return (
            <polygon
              key={i}
              points={`${x},2 ${x + 24},2 ${x + 12},22`}
              fill={c}
              opacity="0.95"
            />
          );
        })}
      </svg>
    </div>
  );
}
