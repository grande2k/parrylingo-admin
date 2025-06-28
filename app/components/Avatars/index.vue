<template>
	<div class="flex justify-end mb-4">
		<AvatarsUpload @refetch="fetchAvatars" />
	</div>

	<UAlert
		v-if="failed"
		color="error"
		variant="soft"
		icon="i-lucide-alert"
		title="Произошла ошибка при загрузке аватаров"
	/>

	<div v-else>
		<UTable v-model:pagination="pagination" :loading="loading" :columns="columns" :data="avatars?.items" />

		<div v-if="avatars?.total > pagination.page_size" class="flex justify-end pt-4">
			<UPagination
				v-model:page="pagination.page_index"
				:default-page="1"
				:items-per-page="pagination.page_size"
				:total="avatars?.total"
			/>
		</div>
	</div>

	<SharedConfirmModal
		v-model="confirmModal"
		:loading="delete_loading"
		color="error"
		title="Удалить аватарку?"
		description="Вы уверены, что хотите удалить эту аватарку?"
		:onConfirm="() => deleteAvatar()"
	/>
</template>

<script setup>
const toast = useToast();
const avatars = ref(null);
const failed = ref(false);
const loading = ref(true);
const pagination = ref({ page_index: 1, page_size: 10 });

const confirmModal = ref(false);
const selectedAvatar = ref(null);
const delete_loading = ref(false);

const UAvatar = resolveComponent("UAvatar");
const UButton = resolveComponent("UButton");

const columns = [
	{
		header: "#",
		cell: ({ row }) => (pagination.value.page_index - 1) * pagination.value.page_size + row.index + 1,
	},
	{
		header: "Аватар",
		cell: ({ row }) =>
			h(UAvatar, {
				src: getStaticUrl(row.original.link),
				size: "lg",
				class: "drop-shadow-sm",
				icon: "i-lucide-image",
			}),
	},
	{
		header: "Действия",
		cell: ({ row }) =>
			h(UButton, {
				color: "error",
				variant: "outline",
				label: "Удалить",
				icon: "i-lucide-trash",
				class: "!text-red-500",
				onClick: () => {
					selectedAvatar.value = row.original;
					confirmModal.value = true;
				},
			}),
	},
];

const fetchAvatars = async () => {
	failed.value = false;
	loading.value = true;

	const { data, error } = await useAPI("/admin/avatars", { query: { size: 100 } });

	loading.value = false;

	if (error.value) {
		console.log("Failed to fetch avatars", error);
		failed.value = true;
		return;
	}

	avatars.value = data.value;
};

const deleteAvatar = async () => {
	const id = selectedAvatar.value.id;
	delete_loading.value = true;

	const { error } = await useAPI(`/admin/avatar/${id}`, { method: "DELETE" });

	if (error.value) {
		console.error("Ошибка при удалении аватарки:", error);
		toast.add({
			title: "Ошибка",
			description: "Произошла ошибка при удалении аватарки, попробуйте еще раз",
			color: "error",
		});
		return;
	}

	toast.add({
		title: "Успешно",
		description: "Аватарка успешно удалена",
		color: "success",
	});
	selectedAvatar.value = null;
	confirmModal.value = false;
	fetchAvatars();
};

watch(confirmModal, val => {
	if (!val) selectedAvatar.value = null;
});

onMounted(fetchAvatars);
</script>
