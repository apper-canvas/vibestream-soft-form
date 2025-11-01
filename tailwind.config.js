/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1DB954',
        secondary: '#121212',
        accent: '#9333EA',
        surface: '#1E1E1E',
        background: '#0A0A0A',
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backdropBlur: {
        '4': '4px',
        '6': '6px',
        '10': '10px',
      },
      animation: {
        'float': 'float 20s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 1.5s ease-in-out infinite',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '33%': { transform: 'translateY(-20px) rotate(5deg)' },
          '66%': { transform: 'translateY(-10px) rotate(-3deg)' }
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(29, 185, 84, 0.4)' },
          '50%': { boxShadow: '0 0 30px rgba(29, 185, 84, 0.8)' }
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    },
  },
  plugins: [],
}