<template>
	<div>
		<div v-if="loading" class="flex gap-8 items-star">
			<USkeleton class="w-[350px] h-[180px] rounded-lg" />
			<USkeleton class="w-full h-[700px] rounded-lg" />
		</div>

		<InterfacesSingleForm
			v-if="!loading"
			:data="single_interface"
			:is-create="isCreate"
			@update="fetchSingleLanguage"
		/>
	</div>
</template>

<script setup>
const route = useRoute();
const isCreate = computed(() => route.params.lang_code === "new");
const loading = ref(!isCreate.value);
const single_interface = ref(null);

const fetchSingleLanguage = async () => {
	const id = route.params.lang_code;

	if (id === "new") {
		route.meta.title = "Создание языка интерфейса";
		return;
	}

	loading.value = true;
	const { data, error } = await useAPI(`/admin/interface/${id}`);
	loading.value = false;

	if (error.value) {
		console.error("Ошибка загрузки языка интерфейса", error.value);
	} else {
		single_interface.value = data.value;
		route.meta.title = data.value.name || "Язык интерфейса";
	}
};

onMounted(fetchSingleLanguage);
</script>
