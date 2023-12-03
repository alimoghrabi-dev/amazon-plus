/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#085f77",
          secondary: "#523cd1",
          accent: "#682c99",
          neutral: "#252b31",
          "base-100": "#e9e9e9",
          info: "#5cb0f0",
          success: "#179254",
          warning: "#eeb259",
          error: "#f32e2b",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
