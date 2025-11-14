export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'marquee-slide': 'marquee-slide 15s linear infinite',
      },
      keyframes: {
        'marquee-slide': {
          '0%': { transform: 'translateX(0%)' },
          '33.33%': { transform: 'translateX(-100%)' },
          '66.66%': { transform: 'translateX(-200%)' },
          '100%': { transform: 'translateX(-300%)' },
        },
      },
    },
  },
  
  plugins: [],
};
