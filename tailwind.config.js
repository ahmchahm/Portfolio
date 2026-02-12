/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0a0a0a',
          800: '#1a1a1a',
          700: '#2a2a2a',
          600: '#3a3a3a',
        },
        primary: {
          50: '#f0f9ff',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
        accent: {
          500: '#ec4899',
          600: '#db2777',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(20px)' },
        },
        glow: {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(14, 165, 233, 0.5)',
            opacity: '0.5'
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(14, 165, 233, 0.8)',
            opacity: '1'
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        neon: '0 0 10px rgba(14, 165, 233, 0.5), 0 0 20px rgba(236, 72, 153, 0.2)',
        'neon-lg': '0 0 20px rgba(14, 165, 233, 0.6), 0 0 40px rgba(236, 72, 153, 0.3)',
      },
    },
  },
  plugins: [],
};
