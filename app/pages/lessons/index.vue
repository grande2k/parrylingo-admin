<template>
	<div>
		<LessonsTable />
	</div>
</template>

<script setup>
definePageMeta({
	middleware: "auth",
	requiresAuth: true,
	title: "Уроки",
});
</script>
