import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primary: "#FF2C55",
        secondary: "#7D1128",
        tertiary: "#A67F8E",
        clean: "#FFFFFA",
        dark: "#0A100D",
      },
      boxShadow: {
        primary:
          "0 2px 10px -11px rgba(255, 44, 85, 0.02), 0 2px 10px -1px rgba(255, 44, 85, 0.06)",
        secondary:
          "0 2px 10px -11px rgba(125, 17, 40, 0.02), 0 2px 10px -1px rgba(125, 17, 40, 0.06)",
        tertiary:
          "0 2px 10px -11px rgba(166, 127, 142, 0.02), 0 2px 10px -1px rgba(166, 127, 142, 0.06)",
        clean:
          "0 2px 10px -11px rgba(255, 255, 250, 0.02), 0 2px 10px -1px rgba(255, 255, 250, 0.06)",
        dark: "0 2px 10px -11px rgba(10, 16, 13, 0.02), 0 2px 10px -1px rgba(10, 16, 13, 0.06)",
      },
    },
  },
  plugins: [],
} satisfies Config;
