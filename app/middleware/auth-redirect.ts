export default defineNuxtRouteMiddleware(() => {
	const authorized = useCookie("authenticated");

	if (authorized.value) {
		return navigateTo("/lessons");
	} else {
		return navigateTo("/login");
	}
});
