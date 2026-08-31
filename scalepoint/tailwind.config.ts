import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Spec palette (section 3)
        carbon: '#050A10',       // Primary dark — hero, immersive employer, footer
        navy: '#0C1622',         // Secondary dark — data interfaces
        mineral: '#F3F1EB',      // Editorial light — primary light bg
        surface: '#FFFFFF',      // Clean surface — forms, cards
        ink: '#0F1822',          // Primary text
        slate: '#5C6975',        // Secondary text
        periwinkle: '#8EA9FF',   // Interactive accent
        cyan: '#79D0DD',         // Intelligence accent (map/network lens)
        brass: '#C5A56A',        // Premium accent (~5% usage)
        mist: '#DCE0E3',         // Border / divider
        plum: '#7B2D46',         // Employer accent — deep burgundy
        wine: '#A8446A',         // Employer accent — lighter
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Editorial scale
        'display': ['clamp(2.75rem, 6vw, 5.25rem)', { lineHeight: '0.96', letterSpacing: '-0.03em' }],
        'display-sm': ['clamp(2.25rem, 4.5vw, 3.5rem)', { lineHeight: '1.0', letterSpacing: '-0.025em' }],
        'heading': ['clamp(1.75rem, 3vw, 2.75rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'title': ['clamp(1.25rem, 2vw, 1.6rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'label': ['0.72rem', { lineHeight: '1.1', letterSpacing: '0.14em' }],
      },
      spacing: {
        'section': 'clamp(3.5rem, 8vw, 8.75rem)',   // 56–140px section padding
        'section-sm': 'clamp(3.5rem, 6vw, 5rem)',
      },
      borderRadius: {
        card: '16px',
        'card-lg': '20px',
      },
      maxWidth: {
        shell: '1240px',
        prose: '68ch',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'reveal-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'halo': {
          '0%': { opacity: '0.55', transform: 'scale(1)' },
          '70%': { opacity: '0', transform: 'scale(2.4)' },
          '100%': { opacity: '0', transform: 'scale(2.4)' },
        },
      },
      animation: {
        'reveal-up': 'reveal-up 0.6s cubic-bezier(0.22,1,0.36,1) both',
        'halo': 'halo 2.6s cubic-bezier(0.22,1,0.36,1) infinite',
      },
    },
  },
  plugins: [],
};
export default config;
