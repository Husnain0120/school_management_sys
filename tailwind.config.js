// // tailwind.config.js
// const { fontFamily } = require("tailwindcss/defaultTheme");

// module.exports = {
//   content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
//   theme: {
//     extend: {
//       colors: {
//         border: "hsl(var(--border))",
//         input: "hsl(var(--input))",
//         ring: "hsl(var(--ring))",
//         background: "hsl(var(--background))",
//         foreground: "hsl(var(--foreground))",
//         primary: "hsl(var(--primary))",
//         "primary-foreground": "hsl(var(--primary-foreground))",
//         secondary: "hsl(var(--secondary))",
//         "secondary-foreground": "hsl(var(--secondary-foreground))",
//         destructive: "hsl(var(--destructive))",
//         "destructive-foreground": "hsl(var(--destructive-foreground))",
//         muted: "hsl(var(--muted))",
//         "muted-foreground": "hsl(var(--muted-foreground))",
//         accent: "hsl(var(--accent))",
//         "accent-foreground": "hsl(var(--accent-foreground))",
//         card: "hsl(var(--card))",
//         "card-foreground": "hsl(var(--card-foreground))",
//         popover: "hsl(var(--popover))",
//         "popover-foreground": "hsl(var(--popover-foreground))",
//       },
//       borderRadius: {
//         lg: "var(--radius)",
//       },
//       // Add these new extensions for the RGB border animation
//       animation: {
//         "spin-slow": "spin 3s linear infinite",
//         "border-rainbow": "borderRainbow 6s linear infinite",
//       },
//       keyframes: {
//         borderRainbow: {
//           "0%, 100%": { "background-position": "0% 50%" },
//           "50%": { "background-position": "100% 50%" },
//         },
//       },
//       backgroundSize: {
//         "400%": "400%",
//       },
//       fontFamily: {
//         poppins: ["var(--font-poppins)", "sans-serif"],
//       },
//     },
//   },
//   plugins: [require("tailwindcss-animate")],
// };
