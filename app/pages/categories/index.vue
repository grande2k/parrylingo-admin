<template>
	<div>
		<Categories />
	</div>
</template>

<script setup>
definePageMeta({
	middleware: "auth",
	requiresAuth: true,
	title: "Категории",
});
</script>
