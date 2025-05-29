<template>
	<UForm :schema="schema" :state="state" class="space-y-4" @submit.prevent="onSubmit">
		<UFormField label="Логин" name="login">
			<UInput v-model="state.login" size="2xl" placeholder="Введите логин" class="w-full" />
		</UFormField>

		<UFormField label="Пароль" name="password">
			<UInput
				v-model="state.password"
				:type="showPassword ? 'text' : 'password'"
				:ui="{ trailing: 'pe-1' }"
				size="2xl"
				placeholder="Введите пароль"
				class="w-full"
			>
				<template #trailing>
					<UButton
						color="neutral"
						variant="link"
						size="xl"
						:icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
						:aria-label="showPassword ? 'Hide password' : 'Show password'"
						:aria-pressed="showPassword"
						aria-controls="password"
						class="cursor-pointer"
						@click="showPassword = !showPassword"
					/>
				</template>
			</UInput>
		</UFormField>

		<UButton type="submit" size="2xl" class="w-full justify-center cursor-pointer mt-2"> Войти </UButton>
	</UForm>
</template>

<script setup>
import * as z from "zod";

const router = useRouter();

const schema = z.object({
	login: z.string().nonempty("Логин обязателен"),
	password: z.string().nonempty("Пароль обязателен"),
});

const state = reactive({
	login: "",
	password: "",
});

const showPassword = ref(false);

const toast = useToast();

const onSubmit = () => {
	const ADMIN_LOGIN = "parrylingo_admin";
	const ADMIN_PASSWORD = "stringst";

	if (state.login === ADMIN_LOGIN && state.password === ADMIN_PASSWORD) {
		useCookie("authenticated").value = "true";
		toast.add({ title: "Успешный вход", description: "Вы вошли в систему", color: "success" });
		router.push("/lessons");
	} else {
		toast.add({ title: "Ошибка входа", description: "Неправильный логин или пароль", color: "error" });
	}
};
</script>
