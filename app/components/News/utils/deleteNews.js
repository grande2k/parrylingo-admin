import { useToast } from "#imports";

export const useDeleteNews = () => {
	const toast = useToast();

	const deleteNews = async (news_id, callback) => {
		try {
			const api = useNuxtApp().$api;
			await api(`/news/delete/${news_id}`, { method: "DELETE" });

			toast.add({
				title: "Успешно",
				description: "Новость удалена",
				color: "success",
			});

			if (callback) callback();
		} catch (err) {
			console.error("Ошибка при удалении новости", err);
			toast.add({
				title: "Ошибка",
				description: "Не удалось удалить новость",
				color: "error",
			});
		}
	};

	return { deleteNews };
};
