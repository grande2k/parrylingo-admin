<template>
	<UModal :close="false" :dismissible="false" title="Урок" :ui="{ footer: 'justify-end gap-4' }">
		<template #body>
			<p class="font-bold text-lg mb-6">{{ words }}</p>

			<UForm ref="form" :state="state" @submit.prevent="onSubmit">
				<UFormField label="Категория" name="topic_id">
					<USelect
						v-model="state.topic_id"
						size="xl"
						class="w-full"
						placeholder="Выберите категорию"
						:items="categories"
					/>
				</UFormField>
			</UForm>
		</template>

		<template #footer>
			<UButton
				label="Закрыть"
				color="neutral"
				size="xl"
				class="px-8 justify-center"
				variant="outline"
				@click="close"
			/>
			<UButton label="Сохранить" size="xl" class="px-8 justify-center" @click="submit" />
		</template>
	</UModal>
</template>

<script setup>
const props = defineProps({
	lesson: Object,
	isOpen: Boolean,
});

const toast = useToast();
const emit = defineEmits(["update:open", "refetch"]);
const form = useTemplateRef("form");

const categories = ref([]);

const state = reactive({
	topic_id: props.lesson?.topic?.id ?? "",
});

const words = computed(() => {
	if (!props.lesson) return "";

	return props.lesson.words.map(word => word.titles.ru.trim()).join("/");
});

const close = () => {
	emit("update:open", false);
};

const submit = () => {
	if (form.value) form.value.submit();
};

const onSubmit = async () => {
	const { error } = await useAPI(`/admin/lesson/${props.lesson.id}`, {
		method: "PATCH",
		body: { topic_id: state.topic_id },
	});

	if (error.value) {
		console.error("Ошибка при обновлении урока", error.value);
		toast.add({
			title: "Ошибка",
			description: "Произошла ошибка при обновлении урока, попробуйте позже",
			color: "error",
		});
	} else {
		toast.add({ title: "Успешно", description: "Урок успешно обновлен", color: "success" });
		emit("refetch");
		close();
	}
};

const fetchCategories = async () => {
	const { data, error } = await useAPI("/admin/topic");

	if (error.value) {
		console.error("Ошибка при загрузке категорий", error.value);
	} else {
		categories.value = data.value.map(cat => {
			return { label: cat.names?.ru, value: cat.id };
		});
	}
};

watch(
	() => props.isOpen,
	isOpen => {
		if (isOpen) {
			if (!categories.value.length) fetchCategories();
			state.topic_id = props.lesson.topic?.id ?? "";
		} else {
			close();
		}
	}
);
</script>
