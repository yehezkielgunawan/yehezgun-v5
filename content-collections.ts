import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
const projects = defineCollection({
	name: "projects",
	directory: "content/projects",
	include: "**/*.mdx",
	schema: (z) => ({
		name: z.string(),
		description: z.string(),
		url: z.string(),
		projectIcon: z.string(),
		projectHero: z.string(),
		stacks: z.array(z.string()),
		isFeatured: z.boolean(),
		date: z.string(),
	}),
});
const blogs = defineCollection({
	name: "blogs",
	directory: "content/blogs",
	include: "**/*.mdx",
	schema: (z) => ({
		title: z.string(),
		summary: z.string(),
		coverImg: z.string(),
		date: z.string(),
		category: z.string(),
	}),
	transform: async (document, context) => {
		const mdx = await compileMDX(context, document, {
			rehypePlugins: [rehypeAutolinkHeadings, rehypeSlug, rehypeRaw],
			remarkPlugins: [remarkGfm, remarkHtml],
		});
		return {
			...document,
			mdx,
		};
	},
});

export default defineConfig({
	collections: [projects, blogs],
});
