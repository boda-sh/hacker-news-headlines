import { NextResponse } from "next/server";
import data from "@/data/best.json";
import { transformPost } from "@/app/utils/utils";
import { INITIAL_LOAD_COUNT } from "@/app/constants";

export async function GET() {
	const transformedPosts = data.slice(INITIAL_LOAD_COUNT).map((post) => transformPost(post));

	return NextResponse.json(transformedPosts);
}
