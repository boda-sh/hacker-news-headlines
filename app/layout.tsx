import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import { Header } from "@/app/components/Header";
import "./globals.css";

const title = "Hacker News Headlines | hnhd.io";
const description = "The complete history of #1 posts on hacker news";

export const metadata: Metadata = {
	title,
	description,
	twitter: {
		title,
		description,
		card: "summary_large_image",
	},
	openGraph: { title, description },
	keywords: ["hacker news", "hn", "headlines", "history"],
	robots: "index, follow",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="dark">
			<body className="max-w-screen-md mx-auto mb-28 p-2 bg-slate-50 dark:bg-[#09090b] dark:text-white">
				<Header />
				{children}
				<Analytics />
			</body>
		</html>
	);
}
