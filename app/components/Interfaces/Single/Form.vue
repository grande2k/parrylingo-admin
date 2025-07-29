<template>
	<UForm :schema="schema" :state="state" @submit.prevent="onSubmit">
		<div class="flex items-start gap-8">
			<UCard class="w-92">
				<template #header>
					<p class="text-graphite-700 font-semibold text-lg">Язык</p>
				</template>

				<div class="space-y-4">
					<UFormField label="Название" name="name">
						<UInput v-model="state.name" size="2xl" placeholder="Введите название" class="w-full" />
					</UFormField>

					<UFormField label="Код языка (2 симвлова)" name="language_code">
						<UInput
							v-model="state.language_code"
							size="2xl"
							placeholder="Введите код языка"
							maxlength="2"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Код флага" name="flag_code">
						<div class="flex items-center gap-2">
							<UInput
								v-model="state.flag_code"
								size="2xl"
								placeholder="Введите код флага"
								class="w-full"
							/>

							<div class="bg-slate-200 rounded-lg p-2">
								<span :class="`fi fi-${state.flag_code} text-xl`"></span>
							</div>
						</div>

						<UButton
							icon="i-lucide-external-link"
							variant="subtle"
							color="info"
							to="https://flagicons.lipis.dev/"
							target="_blank"
							class="mt-2"
						>
							Открыть источник
						</UButton>
					</UFormField>
				</div>
			</UCard>

			<UCard class="flex-auto">
				<template #header>
					<p class="text-graphite-700 font-semibold text-lg">Переводы</p>
				</template>

				<div class="space-y-4">
					<UFormField label="Мета:title" name="interface.meta_title">
						<UInput
							v-model="state.interface.meta_title"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Мета:description" name="interface.meta_description">
						<UInput
							v-model="state.interface.meta_description"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Мета:keywords" name="interface.meta_keywords">
						<UInput
							v-model="state.interface.meta_keywords"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Уроки" name="interface.lessons">
						<UInput
							v-model="state.interface.lessons"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Старые уроки" name="interface.old_lessons">
						<UInput
							v-model="state.interface.old_lessons"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Уроки не найдены" name="interface.no_lessons">
						<UInput
							v-model="state.interface.no_lessons"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Авторы" name="interface.authors">
						<UInput
							v-model="state.interface.authors"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Избранное" name="interface.favourites">
						<UInput
							v-model="state.interface.favourites"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Лидерборды" name="interface.leaderboard">
						<UInput
							v-model="state.interface.leaderboard"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Язык для обучения" name="interface.language_to_learn">
						<UInput
							v-model="state.interface.language_to_learn"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Сортировка по" name="interface.sort_by">
						<UInput
							v-model="state.interface.sort_by"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Сортировка по: дате" name="interface.sort_by_date">
						<UInput
							v-model="state.interface.sort_by_date"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Сортировка по: имени" name="interface.sort_by_name">
						<UInput
							v-model="state.interface.sort_by_name"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Выберите язык" name="interface.select_language">
						<UInput
							v-model="state.interface.select_language"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Кнопка старт" name="interface.start">
						<UInput
							v-model="state.interface.start"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Звуки интерфейса" name="interface.interface_sounds">
						<UInput
							v-model="state.interface.interface_sounds"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Озвучка слова" name="interface.word_sounds">
						<UInput
							v-model="state.interface.word_sounds"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Написание слова" name="interface.word_visibility">
						<UInput
							v-model="state.interface.word_visibility"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Таймер урока" name="interface.timer">
						<UInput
							v-model="state.interface.timer"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Поиск" name="interface.search">
						<UInput
							v-model="state.interface.search"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Язык интерфейса" name="interface.interface_languages">
						<UInput
							v-model="state.interface.interface_languages"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Заголовок текста" name="interface.footer_title">
						<UTextarea
							v-model="state.interface.footer_title"
							autoresize
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Текст" name="interface.footer_text">
						<UTextarea
							v-model="state.interface.footer_text"
							autoresize
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Показать больше" name="interface.show_more">
						<UInput
							v-model="state.interface.show_more"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Показать меньше" name="interface.show_less">
						<UInput
							v-model="state.interface.show_less"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Текст кнопки Appstore" name="interface.appstore_button">
						<UInput
							v-model="state.interface.appstore_button"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Поиск Appstore" name="interface.appstore_search">
						<UInput
							v-model="state.interface.appstore_search"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Успешно скопировано" name="interface.copy_success">
						<UInput
							v-model="state.interface.copy_success"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Ошибка копирования" name="interface.copy_error">
						<UInput
							v-model="state.interface.copy_error"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Предложение войти или зарегистрироваться" name="interface.auth_text">
						<UInput
							v-model="state.interface.auth_text"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Войти" name="interface.sign_in">
						<UInput
							v-model="state.interface.sign_in"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Зарегистрироваться" name="interface.sign_up">
						<UInput
							v-model="state.interface.sign_up"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Выйти" name="interface.log_out">
						<UInput
							v-model="state.interface.log_out"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Сохранить" name="interface.save">
						<UInput
							v-model="state.interface.save"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Отменить" name="interface.cancel">
						<UInput
							v-model="state.interface.cancel"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Email" name="interface.email">
						<UInput
							v-model="state.interface.email"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Имя" name="interface.name">
						<UInput
							v-model="state.interface.name"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Пароль" name="interface.password">
						<UInput
							v-model="state.interface.password"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Повторите пароль" name="interface.repeat_password">
						<UInput
							v-model="state.interface.repeat_password"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Пароли не совпадают" name="interface.passwords_dont_match">
						<UInput
							v-model="state.interface.passwords_dont_match"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Заполните все поля" name="interface.fill_all_fields">
						<UInput
							v-model="state.interface.fill_all_fields"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Пользователь не найден" name="interface.user_not_found">
						<UInput
							v-model="state.interface.user_not_found"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Неправильный логин или пароль" name="interface.incorect_password">
						<UInput
							v-model="state.interface.incorect_password"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Сообщение об успешном входе" name="interface.login_success">
						<UInput
							v-model="state.interface.login_success"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Сообщение об успешной регистрации" name="interface.signup_success">
						<UInput
							v-model="state.interface.signup_success"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField
						label="Сообщение об успешном обновлении профиля"
						name="interface.update_profile_success"
					>
						<UInput
							v-model="state.interface.update_profile_success"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>
				</div>
			</UCard>
		</div>

		<div class="flex justify-end flex-wrap gap-4 mt-6">
			<UButton
				v-if="!isCreate"
				size="2xl"
				variant="soft"
				color="error"
				class="w-[200px] justify-center"
				:disabled="loading"
				@click="confirmDelete = true"
			>
				Удалить
			</UButton>

			<UButton
				v-if="!isCreate"
				size="2xl"
				variant="outline"
				color="neutral"
				class="w-[200px] justify-center"
				:disabled="loading"
				@click="setState"
			>
				Отменить
			</UButton>

			<UButton type="submit" :loading="loading" size="2xl" class="w-[200px] justify-center">
				{{ isCreate ? "Создать" : "Сохранить" }}
			</UButton>
		</div>
	</UForm>

	<SharedConfirmModal
		v-model="confirmDelete"
		title="Удалить язык?"
		description="Вы уверены, что хотите удалить этот язык интерфейса? Это действие необратимо."
		color="error"
		confirm-label="Удалить"
		:loading="delete_loading"
		:onConfirm="deleteInterface"
	/>
</template>

<script setup>
import * as z from "zod";

const emit = defineEmits(["update"]);
const route = useRoute();
const toast = useToast();
const loading = ref(false);
const delete_loading = ref(false);
const confirmDelete = ref(false);

const props = defineProps({
	data: Object,
	isCreate: Boolean,
});

const schema = z.object({
	name: z.string().nonempty("Название обязательно"),
	language_code: z.string().nonempty("Поле обязательно"),
	flag_code: z.string().nonempty("Поле обязательно"),
});

const state = reactive({
	name: "",
	language_code: "",
	flag_code: "",
	interface: {
		meta_title: "",
		meta_description: "",
		meta_keywords: "",
		lessons: "",
		authors: "",
		old_lessons: "",
		no_lessons: "",
		favourites: "",
		leaderboard: "",
		language_to_learn: "",
		sort_by: "",
		sort_by_date: "",
		sort_by_name: "",
		select_language: "",
		start: "",
		interface_sounds: "",
		word_sounds: "",
		word_visibility: "",
		timer: "",
		search: "",
		interface_languages: "",
		footer_title: "",
		footer_text: "",
		show_more: "",
		show_less: "",
		appstore_button: "",
		appstore_search: "",
		copy_success: "",
		copy_error: "",
		auth_text: "Login or signup to see your points",
		sign_in: "Sign in",
		sign_up: "Sign up",
		log_out: "Log out",
		save: "Save",
		update_profile_success: "Profile updated",
		cancel: "Cancel",
		email: "Email",
		name: "Name",
		password: "Password",
		repeat_password: "Repeat password",
		passwords_dont_match: "Passwords don't match",
		fill_all_fields: "Fill all fields",
		user_not_found: "User not found",
		incorect_password: "Incorrect email or password",
		login_success: "Successfully logged in",
		signup_success: "Successfully signed up",
	},
});

onMounted(() => {
	if (props.data) setState();
});

const setState = () => {
	Object.keys(state).forEach(key => {
		if (key in props.data) {
			state[key] =
				typeof props.data[key] === "object" && props.data[key] !== null
					? structuredClone(toRaw(props.data[key]))
					: props.data[key];
		}
	});
};

const onSubmit = async () => {
	loading.value = true;

	const changed = getModifiedFields(props.data || {}, state);

	if (Object.keys(changed).length === 0 && !props.isCreate) {
		toast.add({ title: "Данные не были изменены" });
		loading.value = false;
		return;
	}

	try {
		const api = useNuxtApp().$api;

		if (props.isCreate) {
			await api("/admin/interface", { method: "POST", body: state });
			await navigateTo("/interfaces");
			toast.add({ title: "Создано", description: "Язык интерфейса был успешно создан", color: "success" });
		} else {
			const id = route.params.lang_code;
			await api(`/admin/interface/${id}`, { method: "PATCH", body: state });
			toast.add({ title: "Обновлено", description: "Язык интерфейса был успешно обновлен", color: "success" });
		}
		emit("update");
	} catch (err) {
		console.error("Ошибка:", err);
	} finally {
		loading.value = false;
	}
};

const deleteInterface = async () => {
	delete_loading.value = true;

	try {
		const id = route.params.lang_code;
		const api = useNuxtApp().$api;

		await api(`/admin/interface/${id}`, { method: "DELETE" });
		await navigateTo("/interfaces");
		toast.add({ title: "Удалено", description: "Язык интерфейса был успешно удален", color: "success" });
	} catch (err) {
		console.error("Ошибка при удалении интерфейса:", err);
	} finally {
		delete_loading.value = false;
	}
};
</script>
