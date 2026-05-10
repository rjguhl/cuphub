// Mascot placeholder. Swap for the real pixel sprite when commissioned.
// Keep the API stable so the rest of the app doesn't change when art lands.
type Props = { size?: number; idle?: boolean };

export function Eagle({ size = 32, idle = false }: Props) {
  return (
    <span
      role="img"
      aria-label="CupHub eagle"
      className={`inline-block pixel ${idle ? 'animate-pulse' : ''}`}
      style={{ width: size, height: size, lineHeight: `${size}px`, fontSize: size * 0.8 }}
    >
      🦅
    </span>
  );
}
