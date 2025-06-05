<template>
	<div class="flex justify-end mb-6">
		<UButton to="/interfaces/new" size="xl" icon="i-lucide-plus">Добавить язык</UButton>
	</div>

	<UTable
		:loading="loading"
		:columns="columns"
		:data="languages"
		:ui="{ td: 'cursor-pointer' }"
		class="flex-1"
		@select="onSelect"
	/>
</template>

<script setup>
const languages = ref(null);
const loading = ref(true);

const columns = [
	{ accessorKey: "name", header: "Название" },
	{ accessorKey: "language_code", header: "Код языка" },
	{
		accessorKey: "flag_code",
		header: "Флаг",
		cell: ({ row }) => {
			return h("span", { class: `fi fi-${row.getValue("flag_code")}` });
		},
	},
];

const fetchLanguages = async () => {
	loading.value = true;

	const { data, error } = await useAPI("/admin/interface");

	loading.value = false;

	if (error.value) {
		console.error("Ошибка загрузки языков интерфейса", error.value);
		toast.add({
			title: "Ошибка",
			description: "Произошла ошибка при получении языков интерфейса, попробуйте еще раз",
			color: "error",
		});
	} else {
		languages.value = data.value;
	}
};

const onSelect = row => {
	navigateTo(`/interfaces/${row.original.language_code}`);
};

onMounted(fetchLanguages);
</script>
