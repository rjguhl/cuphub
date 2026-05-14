// Mascot. Small inline SVG so we can ship without art assets.
// Replace with the commissioned pixel sprite later — keep the prop API stable.
type Props = { size?: number; idle?: boolean };

export function Eagle({ size = 32, idle = false }: Props) {
  return (
    <svg
      role="img"
      aria-label="CupHub eagle"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      className={idle ? 'animate-flicker' : ''}
    >
      {/* Crude pixel eagle silhouette in chalk + yellow. Stand-in for commissioned art. */}
      <rect width="16" height="16" fill="transparent" />
      {/* Body */}
      <rect x="5" y="5" width="6" height="5" fill="#FFFFFF" />
      <rect x="4" y="6" width="1" height="3" fill="#FFFFFF" />
      <rect x="11" y="6" width="1" height="3" fill="#FFFFFF" />
      {/* Head */}
      <rect x="6" y="3" width="4" height="2" fill="#FFFFFF" />
      <rect x="7" y="2" width="2" height="1" fill="#FFFFFF" />
      {/* Eye */}
      <rect x="9" y="3" width="1" height="1" fill="#0E5C2F" />
      {/* Beak */}
      <rect x="10" y="4" width="2" height="1" fill="#FFCB05" />
      {/* Talons */}
      <rect x="6" y="10" width="1" height="2" fill="#FFCB05" />
      <rect x="9" y="10" width="1" height="2" fill="#FFCB05" />
    </svg>
  );
}
