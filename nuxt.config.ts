// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	future: { compatibilityVersion: 4 },

	devtools: { enabled: true },

	modules: ["@nuxt/eslint", "@nuxt/icon", "@nuxt/ui", "@nuxt/fonts", "@pinia/nuxt"],

	css: ["~/assets/css/main.css"],

	colorMode: { preference: "light" },

	runtimeConfig: {
		public: { apiBaseUrl: process.env.API_BASE_URL, mediaBaseUrl: process.env.MEDIA_BASE_URL },
	},
});
