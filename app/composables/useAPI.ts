import type { UseFetchOptions } from "#app";
import { toRaw, isReactive } from "vue";

export async function useAPI<T>(endpoint: string | (() => string), options?: UseFetchOptions<T>) {
	const baseUrl = useRuntimeConfig().public.apiBaseUrl;
	const api = await useNuxtApp().$api;

	const finalUrl = typeof endpoint === "function" ? endpoint() : endpoint;
	const fullUrl = `${baseUrl.replace(/\/$/, "")}/${finalUrl.replace(/^\//, "")}`;

	if (options?.body && isReactive(options.body)) {
		options.body = structuredClone(toRaw(options.body));
	}

	if (options?.query) {
		const rawQuery = isReactive(options.query) ? toRaw(options.query) : options.query;
		const filteredQuery = Object.fromEntries(
			Object.entries(rawQuery).filter(([, v]) => v !== null && v !== undefined)
		);
		options.query = filteredQuery;
	}

	return useFetch(fullUrl, {
		...options,
		server: false,
		$fetch: api as typeof $fetch,
	});
}
