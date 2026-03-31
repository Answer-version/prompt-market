/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        'primary-light': '#818CF8',
        'primary-dark': '#3730A3',
        secondary: '#10B981',
        accent: '#F59E0B',
        warning: '#EF4444',
        'chatgpt': '#10A37F',
        'midjourney': '#000000',
        'claude': '#CC785C',
        'stable-diffusion': '#9150E9',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
