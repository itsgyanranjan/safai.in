/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0F14',
        secondaryBg: '#111827',
        cardBg: '#1A2332',
        accentGreen: '#22C55E',
        accentHover: '#16A34A',
        textHeading: '#FFFFFF',
        textBody: '#D1D5DB',
        textMuted: '#9CA3AF',
        cardBorder: 'rgba(255, 255, 255, 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'xl': '14px',
        '2xl': '18px',
      }
    },
  },
  plugins: [],
}
