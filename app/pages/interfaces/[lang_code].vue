<template>
	<div>
		<InterfacesSingle />
	</div>
</template>

<script setup>
useHead({
	title: "Parrylingo - Языки интерфейса",
});

definePageMeta({
	middleware: "auth",
	requiresAuth: true,
	goBack: true,
	title: "Языки интерфейса",
});
</script>
