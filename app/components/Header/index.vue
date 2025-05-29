<template>
	<header class="flex justify-between items-center h-16 bg-white border-b border-b-gray-200 px-5">
		<div class="flex items-center gap-2">
			<UButton
				v-if="route.meta.goBack"
				icon="i-lucide-arrow-left"
				variant="ghost"
				color="neutral"
				size="2xl"
				class="hover:bg-gray-100"
				@click="$router.back()"
			/>
			<h1 v-if="title" class="text-graphite-800 font-semibold text-2xl gap-4 mr-3">{{ title }}</h1>
		</div>

		<div class="flex items-center gap-4">
			<HeaderProfile />

			<UButton icon="i-lucide-log-out" variant="ghost" color="error" size="2xl" @click="confirmLogout = true" />
		</div>
	</header>

	<SharedConfirmModal
		v-model="confirmLogout"
		title="Выход"
		description="Вы уверены что хотите выйти из системы?"
		color="error"
		confirm-label="Выйти"
		@confirm="logout"
	/>
</template>

<script setup>
const route = useRoute();

const confirmLogout = ref(false);

const title = computed(() => route.meta.title || "");

const logout = async () => {
	useCookie("access_token").value = null;
	useCookie("refresh_token").value = null;
	await navigateTo("/login");
};
</script>
