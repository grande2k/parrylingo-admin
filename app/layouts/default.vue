<template>
	<div
		class="bg-bg-color h-dvh grid max-h-full"
		:class="mainStore.sidebar_collapsed ? 'grid-cols-[80px_auto]' : 'grid-cols-[280px_auto]'"
	>
		<Sidebar />

		<div class="flex flex-col max-h-dvh overflow-hidden">
			<Header />
			<main class="p-5 flex-1 overflow-y-auto">
				<slot />
			</main>
		</div>
	</div>
</template>

<script setup>
import { useMainStore } from "~/stores/main";

const mainStore = useMainStore();
</script>
