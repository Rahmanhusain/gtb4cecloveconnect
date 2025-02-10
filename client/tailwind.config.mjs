/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        popIn: {
          '0%': { transform: 'scale(0)' },
          '50%': { transform: 'scale(1.25)' },
          '75%': { transform: 'scale(1)' },
          '90%': { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(1)' },
        },
        popOut: {
          '0%': { transform: 'scale(1)' },
          '20%': { transform: 'scale(1.25)' },
          '100%': { transform: 'scale(0)' },
        },
        rotateBackAndForth: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(5deg)" },
          "50%": { transform: "rotate(0deg)" },
          "75%": { transform: "rotate(-5deg)" },
        },
        dropped: {
          '0%': {
            transform: 'translateY(-40px)',
            'animation-timing-function': 'linear',
          },
          '30%': {
            transform: 'none',
            'animation-timing-function': 'linear',
          },
          '50%': {
            transform: 'translateY(-30px)',
            'animation-timing-function': 'linear',
          },
          '60%': {
            transform: 'none',
            'animation-timing-function': 'linear',
          },
          '70%': {
            transform: 'translateY(-22.5px)',
            'animation-timing-function': 'linear',
          },
          '80%': {
            transform: 'none',
            'animation-timing-function': 'linear',
          },
          '90%': {
            transform: 'translateY(-7.875px)',
            'animation-timing-function': 'linear',
          },
          '100%': {
            transform: 'none',
          },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.2s ease-in",
        rotateBackAndForth: "rotateBackAndForth 2s linear infinite",
        dropped: 'dropped 0.5s linear',
        popIn: 'popIn 0.3s linear',
        popOut: 'popOut 0.3s linear',
        'spin-fast': 'spin 600ms linear infinite',
      },
    },
  },
  plugins: [],
};
