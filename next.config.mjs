import { withcontentCollections } from "@content-collections/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.sanity.io",
				port: "",
			},
		],
	},
	env: {
		publicRepo: process.env.NEXT_PUBLIC_REPO,
		repoId: process.env.NEXT_PUBLIC_REPO_ID,
		categoryId: process.env.NEXT_PUBLIC_CATEGORY_ID,
		umamiID: process.env.UMAMI_ID,
		umamiURL: process.env.UMAMI_URL,
	},
	// Conditional output based on deployment target
	output:
		process.env.CF_PAGES || process.env.CLOUDFLARE_BUILD
			? "standalone"
			: undefined,
};

export default withcontentCollections(nextConfig);
