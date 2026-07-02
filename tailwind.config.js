/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./context/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#a8823a",
          light: "#c9a25c",
          dark: "#8a6a2c"
        },
        cream: "#faf6ef",
        ink: "#1f1b16"
      },
      fontFamily: {
        serif: ["'Playfair Display'", "serif"],
        sans: ["'Poppins'", "sans-serif"]
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(168,130,58,0.35)",
        "card-hover": "0 20px 40px -15px rgba(168,130,58,0.5)"
      }
    }
  },
  plugins: []
};
