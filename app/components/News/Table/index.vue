<template>
	<NewsTableControls v-model:search="filters.search" />

	<UTable
		v-model:pagination="filters"
		:loading="loading"
		:columns="columns"
		:data="news?.items"
		:ui="{ td: 'cursor-pointer' }"
		class="flex-1 mt-6"
		@select="onSelect"
	/>

	<div class="flex justify-end pt-4">
		<UPagination
			v-model:page="filters.page_index"
			:default-page="1"
			:items-per-page="filters.page_size"
			:total="news?.total"
		/>
	</div>

	<SharedConfirmModal
		v-model="confirmDelete"
		title="Удалить новость?"
		description="Вы уверены, что хотите удалить эту новость? Это действие необратимо."
		color="error"
		confirm-label="Удалить"
		@confirm="deleteNews(selectedNewsId, () => fetchNews())"
	/>
</template>

<script setup>
import moment from "moment";
import { useDeleteNews } from "../utils/deleteNews";
import { useDebounceFn } from "@vueuse/core";

const { deleteNews } = useDeleteNews();

const news = ref(null);
const filters = ref({ page_index: 1, page_size: 10, search: null });
const loading = ref(true);

const confirmDelete = ref(false);
const selectedNewsId = ref(null);

const UIcon = resolveComponent("UIcon");
const UDropdownMenu = resolveComponent("UDropdownMenu");
const UButton = resolveComponent("UButton");

const columns = [
	{
		accessorKey: "media",
		header: "Фото",
		cell: ({ row }) => {
			const url = getStaticUrl(row.original.media);
			return h("div", { class: "rounded-lg bg-graphite-50 size-14 flex-center" }, [
				row.original.media
					? h("img", { src: url, class: "rounded-lg object-cover size-full" })
					: h(UIcon, { name: "i-lucide-image" }),
			]);
		},
	},
	{ accessorKey: "title_ru", header: "Название (Ру)" },
	{
		accessorKey: "created_at",
		header: "Дата публикации",
		cell: ({ row }) => moment(row.original.created_at).format("DD.MM.YYYY, HH:mm"),
	},
	{ accessorKey: "views", header: "Просмотры" },
	{
		id: "actions",
		cell: ({ row }) => {
			return h(
				"div",
				{ class: "text-right" },
				h(
					UDropdownMenu,
					{
						content: { align: "end" },
						items: getRowItems(row),
						size: "lg",
						"aria-label": "Actions dropdown",
					},
					() =>
						h(UButton, {
							icon: "i-lucide-ellipsis-vertical",
							color: "neutral",
							variant: "ghost",
							size: "xl",
							class: "ml-auto cursor-pointer",
							"aria-label": "Actions dropdown",
						})
				)
			);
		},
	},
];

const getRowItems = row => {
	return [
		[
			{
				label: "Редактировать",
				icon: "i-lucide-pencil",
				async onSelect() {
					await navigateTo(`/news/${row.original.id}`);
				},
			},
		],
		[
			{
				label: "Удалить",
				color: "error",
				icon: "i-lucide-trash",
				onSelect() {
					selectedNewsId.value = row.original.id;
					confirmDelete.value = true;
				},
			},
		],
	];
};

const fetchNews = async () => {
	loading.value = true;

	const { data, error } = await useAPI("/news/list", {
		query: { page: filters.value.page_index, size: filters.value.page_size, search: filters.value.search },
	});

	loading.value = false;

	if (error.value) {
		console.error("Ошибка загрузки новостей", error.value);
	} else {
		news.value = data.value;
	}
};

const debouncedFetchNews = useDebounceFn(() => fetchNews(), 500);

const onSelect = row => {
	const news_id = row.original?.id;

	if (!news_id) {
		toast.add({
			title: "Ошибка",
			description: "Произошла ошибка, перезагрузите страницу и попробуйте еще раз",
			color: "error",
		});
		return;
	}

	navigateTo(`/news/${news_id}`);
};

onMounted(fetchNews);

watch(
	() => filters.value.search,
	value => {
		if (!value) filters.value.search = null;
		debouncedFetchNews();
	}
);

watch(
	() => filters.value.page_index,
	() => fetchNews()
);
</script>
