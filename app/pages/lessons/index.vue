<template>
	<div>
		<NewsTable />
	</div>
</template>

<script setup>
definePageMeta({
	middleware: "auth",
	requiresAuth: true,
	title: "Новости",
});
</script>
