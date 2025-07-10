<template>
	<div>
		<UsersTable />
	</div>
</template>

<script setup>
definePageMeta({
	middleware: "auth",
	requiresAuth: true,
	title: "Пользователи",
});
</script>
