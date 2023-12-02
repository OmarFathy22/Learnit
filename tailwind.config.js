module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      "min-600": { min: "600px" },
      "max-600": { max: "600px" },
      "max-900": { max: "900px" },
      "min-900": { min: "900px" },
      "max-1200": { max: "1200px" },
      "min-1200": { min: "1200px" },
      "min-1400": { min: "1400px" },
      "max-1400": { max: "1400px" },
    },
  },
  plugins: [],
};
