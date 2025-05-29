export default defineNuxtRouteMiddleware((to, from) => {
	const authorized = useCookie("authenticated");

	if (authorized.value && to.name === "login") {
		return navigateTo("/lessons");
	}

	if (!authorized.value && to.meta.requiresAuth !== false && to.name !== "login") {
		return navigateTo("/login");
	}
});
