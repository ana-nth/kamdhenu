import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      screens: { xs: '375px' },
      colors: {
        bg:            '#0a0a0a',
        surface:       '#111111',
        'surface-2':   '#161616',
        border:        '#1f1f1f',
        primary:       '#f5f0e8',
        muted:         'rgba(245, 240, 232, 0.6)',
        accent:        '#c8a96e',
        'accent-light':'#e8d5a3',
        'accent-dark': '#8f7340',
        gold:          '#c8a96e',
        'off-white':   '#f5f0e8',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;

