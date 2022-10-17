/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-orange': {
          light: '#F7AD19',
          DEFAULT: '#F27F0C',
        },
        'brand-blue': {
          light: '#9FE7F5',
          DEFAULT: '#429EBD',
          dark: '#O53F5C',
        },
      },
      spacing: {
        4.5: '1rem',
      },
    },
  },
  plugins: [],
};
