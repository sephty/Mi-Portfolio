/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bg-ink': '#05050a',
        'parchment': '#f0ece0',
        'parchment-dim': '#8b8a97',
        'indigo-core': '#3a49c9',
        'indigo-bright': '#7c87ea',
        'emperor-crimson': '#d1233a',
        'gold-accent': '#f2c14e',
      },
      fontFamily: {
        metaphor: ['"Butler"', '"Helvetica Now Black"', '"Archivo Black"', 'sans-serif'],
        butler: ['"Butler"', 'serif'],
        playfair: ['"Playfair Display SC"', 'serif'],
        bodoni: ['"Bodoni"', 'serif'],
        times: ['"Times New Roman Bold"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.08)' },
        }
      }
    },
  },
  plugins: [],
}
