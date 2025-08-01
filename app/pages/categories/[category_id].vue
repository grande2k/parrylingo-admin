<template>
	<div>
		<CategoriesSingle />
	</div>
</template>

<script setup>
useHead({
	title: "Parrylingo - Категории",
});

definePageMeta({
	middleware: "auth",
	requiresAuth: true,
	goBack: true,
	title: "Категории",
});
</script>
