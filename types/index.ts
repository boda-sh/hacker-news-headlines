export interface Item {
	by: string;
	descendants: number;
	id: number;
	kids: number[];
	score: number;
	time: number;
	title: string;
	type: string;
	url: string;
}

// example time: 2024-08-31 21:52:01
export type DBItem = Omit<Item, "kids" | "type" | "time"> & { time: string };

export type PostItem = DBItem & { date: string };
