// Pixel sparkle/star. Used for celebration moments — confetti corners, hero accents.
type Props = { size?: number; color?: string; className?: string };

export function Star({ size = 12, color = '#FFD60A', className = '' }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 7 7"
      shapeRendering="crispEdges"
      className={className}
      aria-hidden
    >
      <rect x="3" y="0" width="1" height="1" fill={color} />
      <rect x="3" y="6" width="1" height="1" fill={color} />
      <rect x="0" y="3" width="1" height="1" fill={color} />
      <rect x="6" y="3" width="1" height="1" fill={color} />
      <rect x="2" y="2" width="3" height="3" fill={color} />
      <rect x="3" y="3" width="1" height="1" fill="#FFFFFF" />
    </svg>
  );
}

// Sprinkle a few stars at random positions inside a relative container.
export function Sparkles({ count = 6 }: { count?: number }) {
  const items = Array.from({ length: count }).map((_, i) => ({
    top: `${(i * 37) % 90}%`,
    left: `${(i * 53) % 95}%`,
    delay: `${(i * 0.3) % 2}s`,
    color: ['#FFD60A', '#FF3DCB', '#B6FF3D', '#3DB7FF'][i % 4],
    size: 8 + ((i * 3) % 8),
  }));
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {items.map((s, i) => (
        <span
          key={i}
          className="absolute animate-sparkle"
          style={{ top: s.top, left: s.left, animationDelay: s.delay }}
        >
          <Star size={s.size} color={s.color} />
        </span>
      ))}
    </div>
  );
}
