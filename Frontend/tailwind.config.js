const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        OrangeColor: "#FD1616", // Custom orange color
        BlueColor: "#001935", // Custom blue color
      },
    },
  },
  plugins: [flowbite.plugin()],
};
