import type { DBItem, PostItem } from "@/types";

export function formatDate(dateString: string, currentYear: number): string {
	const [year, month, day] = dateString.split("-");

	if (Number.parseInt(year) === currentYear) {
		return `${day}/${month}`;
	}

	return `${day}/${month}/${year.slice(2)}`;
}

export function transformPost(post: DBItem): PostItem {
	const currentYear = new Date().getFullYear();
	const dbDate = post.time.split(" ")[0];
	const date = formatDate(dbDate, currentYear);

	return { ...post, date };
}
