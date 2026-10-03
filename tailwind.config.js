/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#F5F1E8',
        'paper-deep': '#ECE6D9',
        ink: '#1C2B2E',
        basalt: '#4A4D4B',
        sea: '#2F5D62',
        'sea-mist': '#D7E3DF',
        brass: '#A8864F',
        'deep-sea': '#12292D',
        'deep-sea-text': '#F5F1E8',
        'pierre-tone': '#D9CFC0',
        rose: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
          950: '#4c0519',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        accent: ['var(--font-accent)', 'serif'],
      },
      borderRadius: {
        '2': '2px',
        '4': '4px',
      },
      animation: {
        'fade-up': 'fade-up var(--duration-enter) var(--ease-out) forwards',
        'line-reveal': 'line-reveal var(--duration-enter) var(--ease-out) forwards',
        'clip-reveal': 'clip-reveal var(--duration-enter) var(--ease-out) forwards',
        'ken-burns': 'ken-burns 20s var(--ease-out) forwards',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'line-reveal': {
          from: { transform: 'translateY(100%)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'clip-reveal': {
          from: { clipPath: 'inset(0 0 100% 0)' },
          to: { clipPath: 'inset(0 0 0 0)' },
        },
        'ken-burns': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.06)' },
        },
      },
      transitionDuration: {
        'enter': '900ms',
        'hover': '300ms',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};