/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        base: {
          back: '#FCFCFC',
          light: '#FFF5E4',
          normal: '#FFE3E1',
          darker: '#FFD1D1',
          hover: '#FF9494',
        },
      },

      screens: {
        mobile: '576px',
        tablet: '768px',
        laptop: '1024px',
        desktop: '1280px',
      },

      boxShadow: {
        bottom: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }
    },
  },

  plugins: [],
};
