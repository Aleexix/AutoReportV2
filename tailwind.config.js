/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        float: "float 2s ease-in-out infinite",
      },
      keyframes:{
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
      },
      colors: {
        blueO: "#001F3F", // Azul oscuriño
        blueI: "#1063FF", // Azul intermediño
        body: "#0E0F11", // Color de fondiño
        greenE: "#217346", // Verde escuriño
        orange: "#F97316" // Naranja
      }
    },
  },
  plugins: [],
}