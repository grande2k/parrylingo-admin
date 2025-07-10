<template>
	<div class="h-full bg-white border-r border-r-gray-200" :class="collapsed ? 'w-[80px]' : 'w-[280px]'">
		<div
			class="h-16 flex items-center py-4 px-3 border-b border-b-gray-200"
			:class="collapsed ? 'justify-center' : 'justify-between'"
		>
			<img v-if="!collapsed" src="/logo.png" width="130px" alt="" />
			<UButton
				color="neutral"
				variant="soft"
				size="xl"
				icon="material-symbols:keyboard-double-arrow-left-rounded"
				class="text-graphite-500 bg-[#EEF2F5] cursor-pointer"
				:ui="{ leadingIcon: collapsed ? 'rotate-180' : '' }"
				@click="mainStore.sidebar_collapsed = !mainStore.sidebar_collapsed"
			/>
		</div>

		<UNavigationMenu
			:collapsed="collapsed"
			orientation="vertical"
			:items="items"
			class="w-full p-3"
			:ui="{ link: collapsed ? 'size-10 mx-auto flex justify-center' : '' }"
		/>
	</div>
</template>

<script setup>
const route = useRoute();

const mainStore = useMainStore();
const collapsed = computed(() => mainStore.sidebar_collapsed);

const items = computed(() => [
	{ label: "Уроки", icon: "i-lucide-play", to: "/lessons", active: route.path.startsWith("/lessons") },
	{ label: "Пользователи", icon: "i-lucide-users", to: "/users", active: route.path.startsWith("/users") },
	{
		label: "Языки интерфейса",
		icon: "i-lucide-languages",
		to: "/interfaces",
		active: route.path.startsWith("/interfaces"),
	},
	{
		label: "Аватарки",
		icon: "i-lucide-image",
		to: "/avatars",
		active: route.path.startsWith("/avatars"),
	},
]);
</script>
