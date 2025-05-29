<template>
	<UModal
		v-model:open="open"
		:title="title"
		:description="description"
		:close="!loading"
		:ui="{ footer: 'justify-end gap-4' }"
	>
		<template #footer>
			<UButton
				label="Отмена"
				color="neutral"
				size="xl"
				class="px-8 justify-center"
				variant="outline"
				:disabled="loading"
				@click="open = false"
			/>
			<UButton
				:label="confirmLabel"
				:color="color"
				size="xl"
				class="px-8 justify-center"
				:loading="loading"
				@click="handleConfirm"
			/>
		</template>
	</UModal>
</template>

<script setup>
const props = defineProps({
	modelValue: Boolean,
	title: String,
	description: String,
	loading: Boolean,
	onConfirm: Function,
	color: { type: String, default: "primary" },
	confirmLabel: { type: String, default: "Подтвердить" },
});

const emit = defineEmits(["update:modelValue"]);
const open = computed({
	get: () => props.modelValue,
	set: value => emit("update:modelValue", value),
});

const handleConfirm = async () => {
	if (typeof props.onConfirm === "function") {
		const result = await props.onConfirm();
		if (result !== false) open.value = false;
	} else {
		open.value = false;
	}
};
</script>
