import { NextResponse } from "next/server";

import data from "@/data/best.json";
import type { DBItem } from "@/src/types";

export type PostItem = DBItem & { date: string };

function formatDate(dateString: string, currentYear: number): string {
	const [year, month, day] = dateString.split("-");

	if (Number.parseInt(year) === currentYear) {
		return `${day}/${month}`;
	}

	return `${day}/${month}/${year.slice(2)}`;
}

function transformPost(post: DBItem, currentYear: number): PostItem {
	const dbDate = post.time.split(" ")[0];
	const date = formatDate(dbDate, currentYear);

	return { ...post, date };
}

export async function GET() {
	const currentYear = new Date().getFullYear();
	const transformedPosts = data.map((post) => transformPost(post, currentYear));

	return NextResponse.json({ posts: transformedPosts });
}
