<template>
	<UTable
		v-model:pagination="filters"
		:loading="loading"
		:columns="columns"
		:data="lessons?.items"
		:ui="{ td: 'cursor-pointer' }"
		class="flex-1"
		@select="onSelect"
	/>

	<div class="flex justify-end pt-4">
		<UPagination
			v-model:page="filters.page_index"
			:default-page="1"
			:items-per-page="filters.page_size"
			:total="lessons?.total"
		/>
	</div>

	<LessonsDetailsModal
		v-model="detailModalOpen"
		:lesson="selectedLesson"
		@close="selectedLesson = null"
		@refetch="fetchLessons"
	/>
</template>

<script setup>
const lessons = ref(null);
const filters = ref({ page_index: 1, page_size: 10 });
const loading = ref(true);
const detailModalOpen = ref(false);
const selectedLesson = ref(null);

const UBadge = resolveComponent("UBadge");

const columns = [
	{
		header: "#",
		cell: ({ row }) => (filters.value.page_index - 1) * filters.value.page_size + row.index + 1,
	},
	{ header: "Язык", cell: ({ row }) => row.original.language.name },
	{
		header: "Автор",
		cell: ({ row }) => {
			if (row.original.user) {
				return `${row.original.user.first_name} ${row.original.user.last_name}`;
			} else {
				return "-";
			}
		},
	},
	{
		header: "Слова",
		cell: ({ row }) => {
			return row.original.words.map(word => word.title).join(", ");
		},
	},
	{
		accessorKey: "is_block",
		header: "Статус",
		cell: ({ row }) => {
			const is_block = row.getValue("is_block");
			return h(UBadge, { class: "capitalize", variant: "subtle", color: is_block ? "error" : "success" }, () =>
				is_block ? "Заблокирован" : "Активен"
			);
		},
	},
];

const fetchLessons = async () => {
	loading.value = true;

	const { data, error } = await useAPI("/admin/lessons", {
		query: { page: filters.value.page_index, size: filters.value.page_size },
	});

	loading.value = false;

	if (error.value) {
		console.error("Ошибка загрузки уроков", error.value);
		toast.add({
			title: "Ошибка",
			description: "Произошла ошибка при получении уроков, попробуйте еще раз",
			color: "error",
		});
	} else {
		lessons.value = data.value;
	}
};

const onSelect = row => {
	selectedLesson.value = row.original;
	detailModalOpen.value = true;
};

onMounted(fetchLessons);

watch(
	() => filters.value.page_index,
	() => fetchLessons()
);
</script>
