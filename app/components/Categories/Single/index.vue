<template>
	<div class="bg-white border border-gray-300 p-8 rounded-lg">
		<div v-if="loading" class="grid grid-cols-1 xl:grid-cols-2 gap-4">
			<USkeleton v-for="i in 10" :key="i" class="w-full h-16 rounded-lg" />
		</div>

		<CategoriesSingleForm v-if="!loading" :data="category" :is-create="isCreate" @update="fetchSingleCategory" />
	</div>
</template>

<script setup>
const route = useRoute();
const isCreate = computed(() => route.params.category_id === "new");
const loading = ref(!isCreate.value);
const category = ref(null);

const fetchSingleCategory = async () => {
	const id = route.params.category_id;

	if (id === "new") {
		route.meta.title = "Создание категории";
		return;
	}

	loading.value = true;
	const { data, error } = await useAPI(`/admin/topic/${id}`);
	loading.value = false;

	if (error.value) {
		console.error("Ошибка загрузки категории", error.value);
	} else {
		category.value = data.value;
		route.meta.title = data.value.names?.ru || "Категории";
	}
};

onMounted(fetchSingleCategory);
</script>
