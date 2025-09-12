// tailwind.config.js

module.exports = {
  // Your content paths to scan for Tailwind classes
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  // Your theme configuration, including extensions
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        karla: ['Karla', 'sans-serif'],
        times: ['Times New Roman', 'serif'],
      },
    },
  },
  // Your plugins
  plugins: [
    require("@tailwindcss/aspect-ratio")
  ],
};