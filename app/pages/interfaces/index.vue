<template>
	<div>
		<InterfacesTable />
	</div>
</template>

<script setup>
definePageMeta({
	middleware: "auth",
	requiresAuth: true,
	title: "Языки интерфейса",
});
</script>
