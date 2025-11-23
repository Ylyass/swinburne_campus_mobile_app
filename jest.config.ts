import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#C8102E", // Swinburne red
          50: "#FFE5E9",
          100: "#FFD6DB",
          200: "#FEB3BE",
          300: "#FD8D9F",
          400: "#F95B73",
          500: "#E7354F",
          600: "#D11C37",
          700: "#A8142B",
          800: "#830F22",
          900: "#5C0A18",
        },
        canvas: "#F7F8FB",
        ink: "#0B1220",
      },
      borderRadius: {
        "2xl": "1.25rem",
      },
      boxShadow: {
        card: "0 10px 30px rgb(2 6 23 / 0.06)",
        soft: "0 6px 20px rgb(2 6 23 / 0.05)",
      },
      backgroundImage: {
        "dots": "radial-gradient(currentColor 1px, transparent 1px)",
      },
      backgroundSize: {
        dot: "16px 16px",
      },
    },
  },
  plugins: [],
};

export default config;
