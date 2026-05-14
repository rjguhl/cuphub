import type { Config } from 'tailwindcss';
import { palette } from './config/palette';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: palette,
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        // Mowed-stripe pitch — vertical bands of alternating grass tones
        pitch: `repeating-linear-gradient(
          90deg,
          ${palette.pitch} 0px,
          ${palette.pitch} 64px,
          ${palette.stripe} 64px,
          ${palette.stripe} 128px
        )`,
        // Floodlit hero gradient
        floodlit: `linear-gradient(180deg, ${palette.shadow} 0%, ${palette.pitch} 60%, ${palette.grass} 100%)`,
        halftime: `linear-gradient(135deg, ${palette.grass} 0%, ${palette.pitch} 100%)`,
      },
      boxShadow: {
        // Soft glow like a stadium light
        flood: `0 0 0 1px ${palette.chalk}33, 0 8px 32px ${palette.shadow}66`,
        chalk: `inset 0 0 0 2px ${palette.chalk}`,
      },
      animation: {
        ball: 'ball 4s ease-in-out infinite',
        flicker: 'flicker 3s ease-in-out infinite',
        sway: 'sway 6s ease-in-out infinite',
        sparkle: 'sparkle 2.4s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
        rise: 'rise 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both',
      },
      keyframes: {
        ball: {
          '0%, 100%': { transform: 'translateX(0) rotate(0deg)' },
          '50%': { transform: 'translateX(8px) rotate(180deg)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.15)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        rise: {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
