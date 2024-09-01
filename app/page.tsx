import { PostsList } from "@/app/components/PostsList";
import data from "@/data/best.json";
import { transformPost } from "@/app/utils/utils";
import { INITIAL_LOAD_COUNT } from "@/app/constants";

async function getPosts() {
	return data.map((post) => transformPost(post)).slice(0, INITIAL_LOAD_COUNT);
}

export default async function Page() {
	const initialPosts = await getPosts();

	return (
		<>
			<PostsList initialPosts={initialPosts} />
		</>
	);
}
