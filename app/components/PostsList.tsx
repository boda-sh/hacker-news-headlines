"use client";
import { useState } from "react";
import { BackToTop } from "./BackToTop";
import type { PostItem } from "@/types";

export const Post = ({ post }: { post: PostItem }) => {
	return (
		<tr className="postItem odd:bg-slate-50 even:bg-slate-100 dark:odd:bg-[#09090b] dark:even:bg-[#27272a] dark:text-[#a1a1aa]">
			<td className="p-1 sm:p-2 text-right whitespace-nowrap">{post.score}</td>

			<td className="p-1 sm:p-2 text-left text-gray-700 dark:text-[#fafafa]">
				<a href={post.url} target="_blank" rel="nofollow noreferrer noopener" className="hover:underline decoration-1">
					{post.title}
				</a>
			</td>

			<td className="p-1 sm:p-2 whitespace-nowrap text-right">
				<a
					className="hover:underline decoration-1"
					href={`https://news.ycombinator.com/item?id=${post.id}`}
					target="_blank"
					rel="nofollow noreferrer noopener"
				>
					{post.date}
				</a>
			</td>
		</tr>
	);
};

export const PostsList = ({ initialPosts }: { initialPosts: PostItem[] }) => {
	const [posts, setPosts] = useState(initialPosts);
	const [loading, setLoading] = useState(false);
	const [loaded, setLoaded] = useState(false);

	const loadMorePosts = async () => {
		setLoading(true);
		try {
			const response = await fetch("/api/list");
			const newPosts = await response.json();
			setPosts((prevPosts) => [...prevPosts, ...newPosts]);
		} catch (error) {
			console.error("Error loading more posts:", error);
		} finally {
			setLoading(false);
			setLoaded(true);
		}
	};

	if (!posts.length) return null;

	return (
		<div>
			<table className="text-sm md:text-base text-gray-400 w-full table-fixed mt-3">
				<thead>
					<tr className="leading-6">
						<th className="w-10 sm:w-12 opacity-50 whitespace-nowrap p-2 border-b dark:border-slate-600 text-right">
							☕
						</th>
						<th className="p-2 border-b dark:border-slate-600 text-center">Title</th>
						<th className="w-16 sm:w-20 p-2 pr-4 opacity-50 whitespace-nowrap border-b dark:border-slate-600 text-right">
							💬
						</th>
					</tr>
				</thead>

				<tbody id="postList" className="">
					{posts.map((post) => {
						return <Post key={post.id} post={post} />;
					})}
				</tbody>
			</table>

			{!loaded && (
				<div className="mt-4 text-center">
					<button
						type="button"
						onClick={loadMorePosts}
						disabled={loading}
						className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
					>
						{loading ? "Loading..." : "Load More"}
					</button>
				</div>
			)}

			<BackToTop />
		</div>
	);
};
