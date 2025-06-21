<template>
	<UModal v-if="lesson" v-model:open="open" :title="title" :ui="{ footer: 'justify-end gap-4' }">
		<template #body>
			<div class="grid grid-cols-2 gap-4">
				<div v-for="word in lesson.words" :key="word.id">
					<div class="border-4 border-gray-300 rounded-2xl flex-center p-4">
						<img :src="getStaticUrl(word.image)" class="size-42 object-contain object-center" alt="" />
					</div>
					<p class="text-center mt-2 font-semibold">{{ word.titles.ru }}</p>
				</div>
			</div>
		</template>

		<template #footer>
			<UButton
				label="Закрыть"
				color="neutral"
				size="xl"
				class="px-8 justify-center"
				variant="outline"
				@click="open = false"
			/>
			<UButton
				:label="lesson.is_block ? 'Разблокировать' : 'Заблокировать'"
				size="xl"
				class="px-8 justify-center"
				@click="confirmModalOpen = true"
			/>

			<SharedConfirmModal
				v-model="confirmModalOpen"
				title="Подтвердите действие"
				:description="`Вы уверены, что хотите ${
					lesson?.is_block ? 'разблокировать' : 'заблокировать'
				} этот урок?`"
				color="error"
				:confirm-label="lesson.is_block ? 'Разблокировать' : 'Заблокировать'"
				:loading="loading"
				:onConfirm="() => manageLesson(lesson.id, lesson.is_block, () => handleResult())"
			/>
		</template>
	</UModal>
</template>

<script setup>
import { useLessonManager } from "../utils/manageLesson";

const { manageLesson, loading } = useLessonManager();

const confirmModalOpen = ref(false);

const props = defineProps({
	modelValue: Boolean,
	lesson: Object,
});

const emit = defineEmits(["update:modelValue", "close", "refetch"]);
const open = computed({
	get: () => props.modelValue,
	set: value => emit("update:modelValue", value),
});

const title = computed(() => {
	// return props.lesson.words.map(word => word.title.trim()).join("/");
	return "Урок";
});

const handleResult = () => {
	open.value = false;
	confirmModalOpen.value = false;
	emit("refetch");
};

watch(
	() => open.value,
	isOpen => {
		if (!isOpen) emit("close");
	}
);
</script>
