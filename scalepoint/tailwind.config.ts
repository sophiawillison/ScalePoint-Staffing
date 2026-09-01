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
        // ── New premium palette: deep forest green + warm ivory + champagne gold ──
        carbon: '#08201A',       // Deepest — hero / immersive / footer
        navy: '#0E2C22',         // Secondary dark — data surfaces
        mineral: '#F4EEE0',      // Warm ivory — primary light background
        surface: '#FCFAF3',      // Clean surface — cards, forms
        ink: '#12271F',          // Primary text + primary buttons (deep green-ink)
        slate: '#5D6A61',        // Secondary text (muted sage)
        periwinkle: '#2F8F72',   // Interactive accent (emerald)
        cyan: '#5FBE9C',         // Intelligence accent (mint)
        brass: '#C6A15E',        // Premium accent — champagne gold (~5%)
        mist: '#E3DBC9',         // Warm border / divider
        plum: '#7C2D3A',         // Employer accent — burgundy
        wine: '#B0475C',         // Employer accent — lighter berry
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(2.75rem, 6vw, 5.5rem)', { lineHeight: '0.98', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(2.25rem, 4.5vw, 3.5rem)', { lineHeight: '1.02', letterSpacing: '-0.015em' }],
        'heading': ['clamp(1.75rem, 3vw, 2.75rem)', { lineHeight: '1.08', letterSpacing: '-0.015em' }],
        'title': ['clamp(1.25rem, 2vw, 1.6rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'label': ['0.72rem', { lineHeight: '1.1', letterSpacing: '0.14em' }],
      },
      spacing: {
        'section': 'clamp(3.5rem, 8vw, 8.75rem)',
        'section-sm': 'clamp(3.5rem, 6vw, 5rem)',
      },
      borderRadius: { card: '16px', 'card-lg': '20px' },
      maxWidth: { shell: '1240px', prose: '68ch' },
      transitionTimingFunction: { premium: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      keyframes: {
        'reveal-up': { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'halo': { '0%': { opacity: '0.55', transform: 'scale(1)' }, '70%': { opacity: '0', transform: 'scale(2.4)' }, '100%': { opacity: '0', transform: 'scale(2.4)' } },
        'kenburns': { '0%': { transform: 'scale(1)' }, '100%': { transform: 'scale(1.12)' } },
        'shimmer': { '0%': { backgroundPosition: '200% 0' }, '100%': { backgroundPosition: '-200% 0' } },
      },
      animation: {
        'reveal-up': 'reveal-up 0.6s cubic-bezier(0.22,1,0.36,1) both',
        'halo': 'halo 2.6s cubic-bezier(0.22,1,0.36,1) infinite',
        'kenburns': 'kenburns 20s ease-out forwards',
      },
    },
  },
  plugins: [],
};
export default config;
