/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				hostname: "img.shields.io",
			},
		],
	},
};

export default nextConfig;
