import { withcontentCollections } from "@content-collections/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		qualities: [75, 100],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.sanity.io",
				port: "",
			},
		],
	},
	// Conditional output based on deployment target
	output:
		process.env.CF_PAGES || process.env.CLOUDFLARE_BUILD
			? "standalone"
			: undefined,
};

export default withcontentCollections(nextConfig);
