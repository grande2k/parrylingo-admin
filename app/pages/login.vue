<template>
	<div class="auth-wrapper">
		<img src="/logo.png" class="auth-wrapper__logo" alt="" />

		<h1 class="auth-wrapper__title">Вход в личный кабинет</h1>

		<LoginForm />
	</div>
</template>

<script setup>
definePageMeta({
	layout: "auth",
	middleware: "auth",
});
</script>
