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
	// Output configuration for better compatibility
	output: "standalone",
};

export default withcontentCollections(nextConfig);
