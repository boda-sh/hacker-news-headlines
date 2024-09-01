import { Database } from "bun:sqlite";
import { stringify } from "csv-stringify/sync";
import type { DBItem } from "@/types";

const db = new Database("./data/hackernews.sqlite");

async function markdown(arr: DBItem[]) {
	const START_PLACEHOLDER = "<!-- POSTS PREVIEW BEGIN -->";
	const END_PLACEHOLDER = "<!-- POSTS PREVIEW END -->";

	let markdownContent = `${START_PLACEHOLDER}\n`;
	markdownContent += "| :coffee: | Title | 💬 |\n";
	markdownContent += "| --- | --- | --- |\n";
	for (const { score, title, url, time, id } of arr.slice(0, 367)) {
		markdownContent += `| ${score} | [${title}](${url}) | [${time.split(" ")[0]}](https://news.ycombinator.com/item?id=${id}) |\n`;
	}
	markdownContent += `${END_PLACEHOLDER}`;

	const file = Bun.file("README.md");
	const readme = await file.text();

	const start = readme.indexOf(START_PLACEHOLDER);
	const end = readme.indexOf(END_PLACEHOLDER);

	const newReadme = readme.slice(0, start) + markdownContent + readme.slice(end + END_PLACEHOLDER.length);

	await Bun.write("README.md", newReadme);
	console.log("updated README.md");
}

async function output() {
	const query = db.query(`
    SELECT p.* FROM posts p
    INNER JOIN (
      SELECT date(time) as post_date, MAX(score) as max_score
      FROM posts GROUP BY date(time)
    ) as max_per_day on p.score = max_per_day.max_score AND date(p.time) = max_per_day.post_date
    ORDER BY max_per_day.post_date DESC
  `);

	const dbResults = query.all() as DBItem[];
	const arrayResults = dbResults.map((r) => ({ ...r }));

	await markdown(dbResults);

	const columns = Object.keys(arrayResults[0]);
	const csv = stringify(arrayResults, { columns, header: true });

	await Bun.write("data/best.csv", csv);
	console.log("outputted best.csv");

	const json = JSON.stringify(arrayResults);
	await Bun.write("data/best.json", json);
	console.log("outputted best.json");
}

output();
