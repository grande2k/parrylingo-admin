<template>
	<div class="flex justify-end mb-6">
		<UButton to="/categories/new" size="xl" icon="i-lucide-plus">Создать категорию</UButton>
	</div>

	<UTable
		:loading="loading"
		:columns="columns"
		:data="categories"
		:ui="{ td: 'cursor-pointer' }"
		class="flex-1"
		@select="onSelect"
	/>

	<SharedConfirmModal v-model="confirmDelete" title="Вы уверены?" color="error" @confirm="deleteCategory" />
</template>

<script setup>
const toast = useToast();
const categories = ref(null);
const loading = ref(true);

const confirmDelete = ref(false);
const selectedCategory = ref(null);

const UButton = resolveComponent("UButton");

const columns = [
	{
		header: "Название",
		cell: ({ row }) => {
			return (
				row.original.names?.ru ??
				row.original.names?.en ??
				row.original.names[0] ??
				"Неизвестное название категории"
			);
		},
	},
	{
		id: "actions",
		header: "Действия",
		meta: {
			class: { td: "w-72" },
		},
		cell: ({ row }) => {
			return h("div", { class: "flex gap-4" }, [
				h(UButton, {
					label: "Редактировать",
					size: "sm",
					variant: "outline",
					color: "neutral",
					icon: "i-lucide-pencil",
					to: `/categories/${row.original.id}`,
				}),
				h(UButton, {
					label: "Удалить",
					size: "sm",
					variant: "outline",
					color: "error",
					icon: "i-lucide-trash",
					onClick: () => {
						confirmDelete.value = true;
						selectedCategory.value = row.original;
					},
				}),
			]);
		},
	},
];

const fetchCategories = async () => {
	loading.value = true;

	const { data, error } = await useAPI("/admin/topic");

	loading.value = false;

	if (error.value) {
		console.error("Ошибка", error.value);
		toast.add({
			title: "Ошибка",
			description: "Произошла ошибка при получении категорий, попробуйте еще раз",
			color: "error",
		});
	} else {
		categories.value = data.value;
	}
};

const deleteCategory = async () => {
	const id = selectedCategory.value.id;

	const { error } = await useAPI(`/admin/topic/${id}`, { method: "DELETE" });

	if (error.value) {
		toast.add({
			title: "Ошибка",
			description: "Произошла ошибка, попробуйте позже",
			color: "error",
		});
	} else {
		toast.add({ title: "Успешно", color: "success" });
		fetchCategories();
	}

	selectedCategory.value = null;
	confirmDelete.value = false;
};

const onSelect = row => {
	navigateTo(`/categories/${row.original.id}`);
};

onMounted(fetchCategories);
</script>
