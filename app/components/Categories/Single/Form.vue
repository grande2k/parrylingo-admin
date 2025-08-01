<template>
	<UForm v-if="languages.length" :schema="schema" :state="state" @submit.prevent="onSubmit">
		<div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
			<UFormField v-for="field in languages" :key="field.code" :label="field.name" :name="field.code">
				<UInput v-model="state[field.code]" size="2xl" placeholder="Введите значение" class="w-full" />
			</UFormField>
		</div>

		<div class="flex justify-end gap-4 mt-8">
			<UButton
				label="Отменить"
				to="/categories"
				size="2xl"
				variant="outline"
				color="neutral"
				class="w-[200px] justify-center"
			/>
			<UButton
				:label="isCreate ? 'Создать' : 'Сохранить'"
				type="submit"
				size="2xl"
				class="w-[200px] justify-center"
			/>
		</div>
	</UForm>
</template>

<script setup>
import * as z from "zod";

const toast = useToast();
const languages = ref([]);
const state = reactive({});

const props = defineProps({
	data: Object,
	isCreate: Boolean,
});

const schema = computed(() =>
	z.object(Object.fromEntries(languages.value.map(lang => [lang.code, z.string().nonempty("Обязательное поле")])))
);

const fetchLanguages = async () => {
	const { data, error } = await useAPI("/admin/interface");

	if (error.value) {
		console.error("Ошибка при загрузке языков", error.value);
	} else {
		languages.value = data.value.map(lang => {
			return { name: lang.name, code: lang.language_code };
		});

		languages.value.forEach(lang => (state[lang.code] = ""));
	}
};

const onSubmit = async () => {
	if (props.isCreate) {
		const { error } = await useAPI("/admin/topic", {
			method: "POST",
			body: { names: state },
		});

		if (error.value) {
			console.error("Ошибка при создании категории", error.value);
			toast.add({ title: "Не удалось создать категорию", description: "Попробуйте позже", color: "error" });
		} else {
			toast.add({ title: "Категория была успешно создана", color: "success" });
			navigateTo("/categories");
		}
	} else if (props.data) {
		const updated = getModifiedFields(props.data.names, state);

		if (Object.keys(updated).length === 0) {
			toast.add({ title: "Данные не были изменены" });
			return;
		}

		const { error } = await useAPI(`/admin/topic/${props.data.id}`, {
			method: "PATCH",
			body: { names: state },
		});

		if (error.value) {
			console.error("Ошибка при обновлении категории", error.value);
			toast.add({ title: "Не удалось обновить категорию", description: "Попробуйте позже", color: "error" });
		} else {
			toast.add({ title: "Категория была успешно обновлена", color: "success" });
			navigateTo("/categories");
		}
	}
};

onMounted(async () => {
	await fetchLanguages();

	if (props.data) {
		console.log(props.data);

		Object.keys(props.data.names).forEach(key => {
			state[key] = props.data.names[key];
		});
	}
});
</script>
