import { defineStore } from "pinia";
import { ref } from "vue";

export const useMainStore = defineStore("main", () => {
	const sidebar_collapsed = ref(false);

	return { sidebar_collapsed };
});
