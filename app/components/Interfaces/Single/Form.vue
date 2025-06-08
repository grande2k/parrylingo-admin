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

					<UFormField label="Избранное" name="interface.favourites">
						<UInput
							v-model="state.interface.favourites"
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

					<UFormField label="Язык интерфейса" name="interface.interface_languages">
						<UInput
							v-model="state.interface.interface_languages"
							size="2xl"
							placeholder="Введите значение"
							class="w-full"
						/>
					</UFormField>

					<UFormField label="Нижний текст" name="interface.footer_text">
						<UTextarea
							v-model="state.interface.footer_text"
							autoresize
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

					<UFormField label="Поиск Appstore" name="interface.appstore_search">
						<UInput
							v-model="state.interface.appstore_search"
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
		lessons: "",
		old_lessons: "",
		no_lessons: "",
		favourites: "",
		language_to_learn: "",
		select_language: "",
		start: "",
		interface_sounds: "",
		word_sounds: "",
		interface_languages: "",
		footer_text: "",
		copy_success: "",
		copy_error: "",
		appstore_search: "",
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
