// Pitch palette. Single source of truth — referenced by tailwind.config.ts.
// Imagery: top-down soccer pitch — deep grass, mowed stripes, chalk lines.
export const palette = {
  // Field
  pitch: '#0E5C2F',       // deep grass — primary surface
  grass: '#157A3D',       // lighter mowed stripe
  stripe: '#0A4A26',      // dark mowed stripe (alternating)
  shadow: '#063318',      // shaded grass for depth

  // Lines and chalk
  chalk: '#FFFFFF',       // pure white pitch markings
  cream: '#F4F1E8',       // warm off-white surface (cards, sheets)

  // Type
  ink: '#0B1A12',         // deep almost-black for body text
  fog: '#7A8A80',         // muted secondary text

  // Accents (the referee's pocket + the supporters' end)
  yellow: '#FFD60A',      // booking — brighter, more festive
  red: '#FF2E4C',         // sending off — neon-ish for alerts/celebrations
  sky: '#3DB7FF',         // away kit blue — links, neutral data
  corner: '#FF6B2B',      // corner flag orange — call-to-action
  magenta: '#FF3DCB',     // confetti — celebration accents
  lime: '#B6FF3D',        // away kit highlights — fresh accents
  gold: '#FFB300',        // trophy — winner highlights
} as const;

export type PaletteKey = keyof typeof palette;

export const gradients = {
  // Floodlit night match
  floodlit: `linear-gradient(180deg, ${palette.shadow} 0%, ${palette.pitch} 60%, ${palette.grass} 100%)`,
  // Halftime sun on the grass
  halftime: `linear-gradient(135deg, ${palette.grass} 0%, ${palette.pitch} 100%)`,
} as const;
