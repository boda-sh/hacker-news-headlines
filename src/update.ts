import { Database } from "bun:sqlite";
import type { Item } from "./types";

const db = new Database("./data/hackernews.sqlite");

async function update() {
	const bestResponse = await fetch(
		"https://hacker-news.firebaseio.com/v0/beststories.json",
	);
	if (!bestResponse.ok) throw new Error("Failed to fetch best stories");

	const bestIds = (await bestResponse.json()) as number[];
	if (!bestIds.length) throw new Error("No best stories found");

	const length = bestIds.length;
	let i = 1;

	for (const bestId of bestIds) {
		console.log(`${bestId} (${i}/${length})`);

		const postResponse = await fetch(
			`https://hacker-news.firebaseio.com/v0/item/${bestId}.json`,
		);
		if (!postResponse.ok) {
			console.warn(`Failed to fetch post ${bestId}`);
			continue;
		}

		try {
			const post = (await postResponse.json()) as Item;
			const { id, title, url, score, by, time, descendants } = post;

			const query = db.query(`
		  INSERT OR REPLACE INTO posts (id, title, url, score, by, time, descendants)
			VALUES ($id, $title, $url, $score, $by, datetime($time, 'unixepoch'), $descendants)
		`);

			query.run({
				$id: id,
				$title: title,
				$url: url ? url : `https://news.ycombinator.com/item?id=${id}`,
				$score: score,
				$by: by,
				$time: time,
				$descendants: descendants,
			});
		} catch (e) {
			console.warn(`Failed to upsert post ${bestId}`);
		}

		i++;
	}

	console.log("updated all!");
}

update();
