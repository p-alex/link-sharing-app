/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkGray: "#333333",
        gray: "#737373",
        primary: "#633CFF",
        primaryHover: "#BEADFF",
        siteBg: "#FAFAFA",
        lightGray: "#FAFAFA",
        error: "#FF3939",
      },
      boxShadow: {
        inputFocus: "0px 0px 32px 0px rgba(99, 60, 255, 0.25)",
      },
      fontFamily: {
        Instrument: "Instrument",
      },
    },
  },
  plugins: [],
};
