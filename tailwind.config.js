module.exports = {
	content: [
		"./app/components/**/*.{vue,js,ts}",
		"./app/modules/**/*.{vue,js,ts}",
		"./app/pages/**/*.{vue,js,ts}",
		"./app/layouts/**/*.{vue,js,ts}",
		"./app/app.config.{vue,js,ts}",
	],
	purge: [],
	darkMode: false,
	theme: {
		colors: {
			primary: "#0DAAB5",
			background: "#F7F8FC",

			graphite: {
				50: "#eeefef",
				300: "#8A8F93",
				400: "#8A8F94",
				500: "#5A5C5F",
				600: "#2E3035",
				700: "#242528",
				800: "#1D1E20",
				900: "#141414",
			},

			lemon: {
				50: "#fcefb9",
				300: "#ffe300a3",
				500: "#ffc400",
				800: "#ffb700",
			},

			yellow: {
				50: "#f5e2b3",
				300: "#ffcb73d",
				500: "#ffb523",
				800: "#f08f35",
			},

			green: {
				50: "#c7e8b1",
				300: "#a6dc4ad",
				500: "#50c768",
				800: "#22b350",
			},

			red: {
				50: "#F5A7A9",
				300: "#FF7479",
				500: "#F54759",
				800: "#DD2A2F",
			},

			blue: {
				500: "#3F80FF",
			},

			base: {
				white: "#FFFFFF",
				black: "#000000",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
