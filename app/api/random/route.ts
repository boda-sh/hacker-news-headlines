import data from "@/data/best.json";

export const dynamic = "force-dynamic";

function getWeightedRandomIndex(length: number): number {
	const random = Math.random();
	const RECENT_YEARS = 5;
	const CHANCE = 0.5;

	if (random < CHANCE) {
		// Assuming approx. 365 posts per year
		return Math.floor(Math.random() * Math.min(365 * RECENT_YEARS, length));
	}
	return Math.floor(random ** 2 * length);
}

export async function GET() {
	const selectedIndex = getWeightedRandomIndex(data.length);
	const selectedPost = data[selectedIndex];
	return Response.json({ post: selectedPost });
}
