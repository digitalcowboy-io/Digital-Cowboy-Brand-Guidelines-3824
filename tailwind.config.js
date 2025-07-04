/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ignite: '#F49558',
        catalyst: '#D35E0E',
        cosmos: '#101F1F',
        evergreen: '#244A49',
        quantum: '#409FA1',
        solar: '#F6D541',
      },
      fontFamily: {
        'lexend': ['Lexend Deca', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
        'orbitron': ['Orbitron', 'monospace'],
      },
      animation: {
        'matrix-fall': 'matrix-fall 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
        'temet': 'temet 12s linear infinite',
      },
      keyframes: {
        'matrix-fall': {
          '0%': { transform: 'translateY(-100vh)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%': { boxShadow: '0 0 20px rgba(64, 159, 161, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(64, 159, 161, 0.6)' },
        },
        'temet': {
          '0%': { opacity: '0', transform: 'translateY(-10%)' },
          '10%': { opacity: '0.08' },
          '50%': { opacity: '0.12' },
          '90%': { opacity: '0.08' },
          '100%': { opacity: '0', transform: 'translateY(10%)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};