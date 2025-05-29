import { useToast } from "#imports";
import { ref } from "vue";

export const useLessonManager = () => {
	const toast = useToast();
	const loading = ref(false);

	const manageLesson = async (lesson_id, current_block_state, callback) => {
		loading.value = true;

		try {
			const api = useNuxtApp().$api;
			await api(`/admin/lesson/${lesson_id}`, { method: "PATCH", body: { is_block: !current_block_state } });

			toast.add({
				title: "Успешно",
				description: `Урок был успешно ${current_block_state ? "разблокирован" : "заблокирован"}`,
				color: "success",
			});

			if (callback) callback();
		} catch (err) {
			console.error("Ошибка при изменеии статуса урока", err);
			toast.add({
				title: "Ошибка",
				description: `Не удалось удалить ${
					current_block_state ? "разблокировать" : "заблокировать"
				} урок. Попробуйте позже`,
				color: "error",
			});
		} finally {
			loading.value = false;
		}
	};

	return { manageLesson, loading };
};
