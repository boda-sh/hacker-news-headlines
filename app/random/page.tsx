"use client";
import { useEffect, useState } from "react";
import type { DBItem } from "@/types";

/**
 * A fun page that shows a random post, more recent ones have a higher chance of being picked.
 */
export default function Page() {
	const [randomPost, setRandomPost] = useState<DBItem>();

	useEffect(() => {
		fetch("/api/random")
			.then((res) => res.json())
			.then((data) => {
				setRandomPost(data.post);
			});
	}, []);

	if (!randomPost) {
		return null;
	}

	return (
		<div className="w-full text-center mt-20 p-3">
			<div className="mb-3">
				<a
					className="text-xl hover:underline decoration-1"
					href={randomPost.url}
					target="_blank"
					rel="noreferrer noopener"
				>
					{randomPost.title}
				</a>
				<p className="mt-1 text-sm">{randomPost.url}</p>
			</div>

			<div className="flex justify-center gap-x-10">
				<p>{randomPost.score} points</p>
				<a
					className="hover:underline decoration-1"
					href={`https://news.ycombinator.com/item?id=${randomPost.id}`}
					target="_blank"
					rel="noreferrer noopener"
				>
					{randomPost.time.split(" ")[0].split("-").reverse().join("-")}
				</a>
			</div>
		</div>
	);
}
