<template>
	<!-- <div v-if="loading" class="flex items-center gap-3 w-[200px]">
		<USkeleton class="size-10 rounded-full" />

		<div class="grid gap-2 max-w-24 w-full">
			<USkeleton class="h-3 w-[50%]" />
			<USkeleton class="h-3 w-full" />
		</div>
	</div> -->

	<div class="flex items-center justify-center gap-3">
		<UAvatar src="/avatar.svg" size="xl" alt="" />

		<div class="flex flex-col items-start justify-start">
			<h3
				class="text-sm font-semibold text-graphite-700 mb-0.5 w-full whitespace-nowrap overflow-hidden text-ellipsis"
			>
				Space Gaming
			</h3>
			<p class="text-xs font-medium text-graphite-300 w-full whitespace-nowrap overflow-hidden text-ellipsis">
				Superadmin
			</p>
		</div>

		<!-- <Icon size="md" name="i-lucide-chevron-down" /> -->
	</div>
</template>

<script setup>
/* import { useMainStore } from "~/stores/main";

const mainStore = useMainStore();

const loading = ref(true);

onMounted(async () => {
	const { data, error } = await useAPI("me/");

	loading.value = false;

	if (error.value) {
		console.error("Ошибка загрузки профиля", error.value);
	} else {
		mainStore.profile = data.value;
	}
}); */
</script>
