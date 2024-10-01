import { FaGithub, FaDice } from "react-icons/fa";

export const Header = () => {
	return (
		<div className="pt-3 flex justify-between items-center">
			<div className="flex justify-left items-center">
				<a href="/">
					<strong className="font-semibold">Hacker News Headlines</strong>
					<svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
						<circle cx="1" cy="1" r="1" />
					</svg>
					<span className="tracking-wider">hnhd.io</span>
				</a>
			</div>

			<div className="flex space-x-3">
				<a href="/random">
					<FaDice size={24} />
				</a>
				<a href="https://github.com/bodadev/hacker-news-headlines">
					<FaGithub size={24} />
				</a>
			</div>
		</div>
	);
};
