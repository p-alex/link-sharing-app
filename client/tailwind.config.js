/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkGray: "#333333",
        grey: "#737373",
        primary: "#633CFF",
        lightPurple: "#EFEBFF",
        siteBg: "#FAFAFA",
        lightGray: "#FAFAFA",
        error: "#FF3939",
        github: "#1c2022",
        google: "#4285F4",
        linkedin: "#0A66C2",
        discord: "#5865F2",
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
