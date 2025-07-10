<template>
	<UTable v-model:pagination="filters" :loading="loading" :columns="columns" :data="users?.items" />

	<div v-if="users?.total > filters.page_size" class="flex justify-end pt-4">
		<UPagination
			v-model:page="filters.page_index"
			:default-page="1"
			:items-per-page="filters.page_size"
			:total="users?.total"
		/>
	</div>

	<SharedConfirmModal v-model="confirmModal" title="Вы уверены?" @confirm="handleConfirm" />
</template>

<script setup>
import moment from "moment";

const toast = useToast();
const users = ref(null);
const filters = ref({ page_index: 1, page_size: 10 });
const loading = ref(true);
const confirmModal = ref(false);
const selectedUser = ref(null);

const UBadge = resolveComponent("UBadge");
const UButton = resolveComponent("UButton");

const columns = [
	{
		header: "#",
		cell: ({ row }) => (filters.value.page_index - 1) * filters.value.page_size + row.index + 1,
	},
	{
		header: "Имя пользователя",
		cell: ({ row }) => {
			return h("div", { class: "flex items-center gap-2" }, [
				h("img", { src: getStaticUrl(row.original.avatar.link), class: "size-8 drop-shadow rounded" }),
				h("p", row.original.name),
			]);
		},
	},
	{
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "total_stars",
		header: "Количество звезд",
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
	{
		accessorKey: "created_at",
		header: "Дата регистрации",
		cell: ({ row }) => moment(row.original.created_at).format("DD.MM.YYYY"),
	},
	{
		accessorKey: "updated_at",
		header: "Дата обновления",
		cell: ({ row }) => moment(row.original.updated_at).format("DD.MM.YYYY"),
	},
	{
		id: "actions",
		header: "Действия",
		cell: ({ row }) => {
			if (row.original.is_block) {
				return h(UButton, {
					label: "Разблокировать",
					size: "sm",
					variant: "outline",
					color: "success",
					icon: "i-lucide-lock-open",
					onClick: () => {
						confirmModal.value = true;
						selectedUser.value = row.original;
					},
				});
			} else {
				return h(UButton, {
					label: "Заблокировать",
					size: "sm",
					variant: "outline",
					color: "error",
					icon: "i-lucide-lock",
					onClick: () => {
						confirmModal.value = true;
						selectedUser.value = row.original;
					},
				});
			}
		},
	},
];

const fetchUsers = async () => {
	loading.value = true;

	const { data, error } = await useAPI("/user/admin/users", {
		query: { page: filters.value.page_index, size: filters.value.page_size },
	});

	loading.value = false;

	if (error.value) {
		console.error("Ошибка загрузки пользователей", error.value);
		toast.add({
			title: "Ошибка",
			description: "Произошла ошибка при получении пользователей, попробуйте еще раз",
			color: "error",
		});
	} else {
		users.value = data.value;
	}
};

const handleConfirm = async () => {
	const id = selectedUser.value.id;
	const endpoint = selectedUser.value.is_block ? "/user/admin/unblock-user" : "/user/admin/block-user";

	const { error } = await useAPI(`${endpoint}/${id}`, {
		method: selectedUser.value.is_block ? "DELETE" : "POST",
	});

	if (error.value) {
		toast.add({
			title: "Ошибка",
			description: "Произошла ошибка, попробуйте еще раз",
			color: "error",
		});
	} else {
		toast.add({ title: "Успешно", color: "success" });
		fetchUsers();
	}

	selectedUser.value = null;
	confirmModal.value = false;
};

onMounted(fetchUsers);

watch(
	() => filters.value.page_index,
	() => fetchUsers()
);

watch(confirmModal, val => {
	if (!val) selectedUser.value = null;
});
</script>
