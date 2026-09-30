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
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				port: "",
			},
			{
				protocol: "https",
				hostname: "diskusi-tech-production.s3.amazonaws.com",
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
