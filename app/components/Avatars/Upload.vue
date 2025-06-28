<template>
	<UModal
		v-model:open="open"
		:close="!loading"
		:dismissible="!loading"
		title="Загрузка аватарки"
		:ui="{ footer: 'justify-end' }"
	>
		<UButton label="Add Avatar" size="lg" icon="i-lucide-plus" />

		<template #body>
			<UForm ref="form" :schema="schema" :state="state" @submit.prevent="onSubmit">
				<UFormField name="avatar" required>
					<SharedImageUploader v-model="state.avatar" name="avatar" />
				</UFormField>
			</UForm>
		</template>

		<template #footer>
			<UButton
				label="Загрузить"
				size="xl"
				:loading="loading"
				class="w-40 justify-center"
				@click="form.submit()"
			/>
		</template>
	</UModal>
</template>

<script setup>
import * as z from "zod";

const emit = defineEmits(["refetch"]);
const form = useTemplateRef("form");
const toast = useToast();
const open = ref(false);
const loading = ref(false);

const schema = z.object({
	avatar: z.any().refine(val => {
		if (val instanceof File) return true;
		return false;
	}, "Загрузите изображение."),
});

const state = reactive({ avatar: null });

const onSubmit = async () => {
	loading.value = true;

	const fd = new FormData();
	fd.append("avatar", state.avatar);

	try {
		const api = useNuxtApp().$api;

		await api("/admin/avatar", { method: "POST", body: fd });

		toast.add({
			title: "Загрузка успешна",
			description: "Аватарка успешно загружена",
			color: "success",
		});

		state.avatar = null;
		emit("refetch");
	} catch (error) {
		console.error("Ошибка при загрузке аватарки:", error);
		toast.add({
			title: "Ошибка",
			description: "Произошла ошибка при загрузке аватарки, попробуйте еще раз",
			color: "error",
		});
	} finally {
		loading.value = false;
		open.value = false;
	}
};

watch(
	() => state.avatar,
	val => {
		if (val) form.value.clear();
	}
);
</script>
