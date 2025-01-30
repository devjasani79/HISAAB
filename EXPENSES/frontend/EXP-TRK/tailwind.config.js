module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}", // Ensure this includes your React files
  ],
  theme: {
    extend: {
      colors: {
        'electric-blue': 'rgb(59, 130, 246)',
        'neon-green': 'rgb(34, 197, 94)',
        'dark-gray': 'rgb(17, 24, 39)',
        'almost-black': 'rgb(15, 23, 42)',
        'light-gray': 'rgb(229, 231, 235)',
      },
    },
  },
  plugins: [],
};
