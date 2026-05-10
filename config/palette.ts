// Miami / coastal palette. Single source of truth — referenced by tailwind.config.ts.
// Add new tokens here, then use them as `bg-hotpink`, `text-turquoise`, etc.
export const palette = {
  cream: '#FFF7EC',
  hotpink: '#FF3D8A',
  turquoise: '#2EE6D6',
  coral: '#FF7A59',
  sun: '#FFD23F',
  deeppurple: '#3A0CA3',
  ink: '#1A0B2E',
} as const;

export type PaletteKey = keyof typeof palette;

export const gradients = {
  sunset: `linear-gradient(135deg, ${palette.hotpink} 0%, ${palette.coral} 50%, ${palette.sun} 100%)`,
  dusk: `linear-gradient(180deg, ${palette.deeppurple} 0%, ${palette.hotpink} 100%)`,
} as const;
