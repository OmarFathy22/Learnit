module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      sm: { max: "600px" },
      "min-600": { min: "600px" },
      "max-900": { max: "900px" },
      "min-900": { min: "900px" },
      "max-1200": { max: "1200px" },
      "min-1200": { min: "1200px" },
      "min-1400": { min: "1400px" },
      md: { min: "600px", max: "1024px" },
      "sm-md": { min: "0px", max: "1024px" },
      "md-lg": { min: "600px", max: "1200px" },
      lg: { min: "1024px" },
      xl: { min: "1200px" },
      "lg-xl": { min: "1024px", max: "1200px" },
      "sm-xl": { max: "1200px" },
    },
  },
  plugins: [],
};
