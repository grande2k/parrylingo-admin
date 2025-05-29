export default defineNuxtPlugin(nuxtApp => {
	const config = useRuntimeConfig();

	const api = $fetch.create({
		baseURL: config.public.apiBaseUrl,
		onRequest({ request, options }) {},

		onResponse({ response }) {
			// Можно логировать или обрабатывать глобально
		},

		onResponseError({ response }) {
			if (response.status === 401) {
				// Можно автоматически обновлять токен или редиректить
				console.warn("Unauthorized, redirecting to login...");
			}
		},
	});

	nuxtApp.provide("api", api);
});
