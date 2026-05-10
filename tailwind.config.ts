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
      },
      backgroundImage: {
        sunset: 'linear-gradient(135deg, #FF3D8A 0%, #FF7A59 50%, #FFD23F 100%)',
        dusk: 'linear-gradient(180deg, #3A0CA3 0%, #FF3D8A 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
