<template>
	<div class="flex flex-col items-center space-y-2" :style="{ width }">
		<label
			:class="[
				'relative flex items-center justify-center bg-gray-50 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200',
				isInvalid ? 'border-red-500' : 'border-gray-200',
			]"
			:style="{
				width: width,
				height: height,
			}"
		>
			<input type="file" accept="image/*" class="hidden" @change="handleFileChange" ref="fileInput" />

			<img v-if="preview" :src="preview" alt="Preview" class="object-cover w-full h-full rounded-lg" />

			<div v-else class="flex flex-col items-center justify-center text-gray-400">
				<UIcon name="i-lucide-image-plus" class="!size-8" />
			</div>
		</label>

		<p
			v-if="!preview && !deletable"
			class="text-blue-600 text-sm font-medium cursor-pointer hover:underline"
			@click="triggerFileDialog"
		>
			{{ caption }}
		</p>

		<p v-if="errorMessage" class="text-xs text-red-500">{{ errorMessage }}</p>

		<UButton
			v-if="preview && deletable"
			color="error"
			variant="soft"
			class="font-medium self-start"
			@click="deleteImage"
		>
			Удалить
		</UButton>
	</div>
</template>

<script setup>
import { ref, watch, computed } from "vue";

const props = defineProps({
	modelValue: [File, String],
	caption: {
		type: String,
		default: "Добавить изображение",
	},
	maxSizeMb: {
		type: Number,
		default: 5,
	},
	width: {
		type: String,
		default: "180px",
	},
	height: {
		type: String,
		default: "180px",
	},
	name: String,
	error: String,
	deletable: Boolean,
});

const emit = defineEmits(["update:modelValue"]);
const fileInput = ref(null);
const preview = ref(null);
const errorMessage = ref(null);

const isInvalid = computed(() => !!errorMessage.value || !!props.error);

const triggerFileDialog = () => {
	fileInput.value?.click();
};

const handleFileChange = e => {
	const file = e.target.files[0];
	if (!file) return;

	// Validate type
	if (!file.type.startsWith("image/")) {
		errorMessage.value = "Можно загружать только изображения";
		return;
	}

	// Validate size
	const sizeMb = file.size / 1024 / 1024;
	if (sizeMb > props.maxSizeMb) {
		errorMessage.value = `Максимальный размер файла — ${props.maxSizeMb} МБ`;
		return;
	}

	errorMessage.value = null;
	emit("update:modelValue", file);
	preview.value = URL.createObjectURL(file);
};

const deleteImage = () => {
	emit("update:modelValue", null);
	errorMessage.value = null;
	fileInput.value.value = null;
};

watch(
	() => props.modelValue,
	value => {
		if (value instanceof File) {
			preview.value = URL.createObjectURL(value);
		} else if (typeof value === "string") {
			preview.value = getStaticUrl(value);
		} else {
			preview.value = null;
		}
	},
	{ immediate: true }
);
</script>
