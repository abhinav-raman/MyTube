/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			animation: {
				"spin-2": "spin 2s linear infinite",
			}
		},
	},
	plugins: [require("@tailwindcss/line-clamp")],
};
