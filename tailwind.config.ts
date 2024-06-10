/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	darkMode: "class",
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			animation: {
				"enter-l": "enter-l 300ms cubic-bezier(.4,0,.2,1)",
			},
			colors: {
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				border: "hsl(var(--border-color))",
				primary: "hsl(var(--primary))",
				secondary: "hsl(var(--secondary))",
				tertiary: "hsl(var(--tertiary))",
				quaternary: "hsl(var(--quaternary))",
				quinary: "hsl(var(--quinary))",
				senary: "hsl(var(--senary))",
				septenary: "hsl(var(--septenary))",
			},
			keyframes: {
				"enter-l": {
					"0%": { opacity: "0", transform: "translateX(-10px)" },
					"100%": { opacity: "1", transform: "translateX(0)" },
				},
			},
		},
		screens: {
			xxs: "425px",
			xs: "475px",
			...defaultTheme.screens,
		},
	},
	plugins: [require("tailwindcss-animate")],
};
