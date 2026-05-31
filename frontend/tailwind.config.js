/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        runway: {
          950: '#060a12',
          900: '#0a0f1a',
          800: '#111827',
          700: '#1a2332',
          600: '#243044',
          500: '#3d4f66',
        },
        signal: {
          cyan: '#22d3ee',
          blue: '#38bdf8',
          amber: '#fbbf24',
          orange: '#f97316',
          red: '#ef4444',
          green: '#34d399',
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        panel: '0 0 0 1px rgba(56, 189, 248, 0.08), 0 8px 32px rgba(0, 0, 0, 0.45)',
        glow: '0 0 24px rgba(34, 211, 238, 0.15)',
      },
      backgroundImage: {
        'radar-grid':
          'linear-gradient(rgba(34, 211, 238, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.04) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '32px 32px',
      },
    },
  },
  plugins: [],
};
