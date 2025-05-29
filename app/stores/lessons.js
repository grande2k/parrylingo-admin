import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAPI } from "@/composables/useAPI";

export const useClientStore = defineStore("clients", () => {
	const clients = ref(null);
	const single_client = ref(null);
	const analytics = ref(null);
	const filters = ref({ page_index: 1, page_size: 10, search: null });
	const loading = ref(true);
	const single_loading = ref(true);
	const createModalOpen = ref(false);

	const router = useRouter();
	const route = useRoute();

	const fetchClients = async () => {
		loading.value = true;

		const { data, error } = await useAPI("clients/", {
			query: { page: filters.value.page_index, page_size: filters.value.page_size, search: filters.value.search },
		});

		loading.value = false;

		if (error.value) {
			console.error("Ошибка загрузки клиентов", error.value);
		} else {
			clients.value = data.value;
		}
	};

	const fetchSingleClient = async () => {
		single_loading.value = true;

		const client_id = route.params.user_id;

		if (!client_id) {
			loading.value = false;
			await router.push("/users");
			return;
		}

		const { data, error } = await useAPI(`client/${client_id}`);

		single_loading.value = false;

		if (error.value) {
			console.error("Ошибка загрузки клиента", error.value);
		} else {
			single_client.value = data.value;
		}
	};

	watch(
		() => filters.value.page_index,
		() => fetchClients()
	);

	return {
		clients,
		single_client,
		analytics,
		loading,
		single_loading,
		createModalOpen,
		filters,
		fetchClients,
		fetchSingleClient,
	};
});
