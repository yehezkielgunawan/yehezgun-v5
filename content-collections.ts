import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { z } from "zod";

/**
 * Mermaid code block language variants (handled by MermaidInit client-side):
 *   ```mermaid            -> default responsive behavior
 *   ```mermaid-overflow   -> always scroll horizontally
 *   ```mermaid-fit        -> always fit to container
 *
 * The language variants are preserved in the rendered HTML as class names
 * (e.g., "language-mermaid-overflow") which the MermaidInit component reads
 * to apply the correct CSS styling.
 */

const projects = defineCollection({
	name: "projects",
	directory: "content/projects",
	include: "**/*.mdx",
	schema: z.object({
		name: z.string(),
		description: z.string(),
		url: z.string(),
		projectIcon: z.string(),
		projectHero: z.string(),
		stacks: z.array(z.string()),
		isFeatured: z.boolean(),
		date: z.string(),
		content: z.string(),
	}),
});

const workExperiences = defineCollection({
	name: "workExperiences",
	directory: "content/work-experiences",
	include: "**/*.mdx",
	schema: z.object({
		title: z.string(),
		company: z.string(),
		startDate: z.string(),
		endDate: z.string().optional(),
		content: z.string(),
	}),
});

const blogs = defineCollection({
	name: "blogs",
	directory: "content/blogs",
	include: "**/*.mdx",
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		coverImg: z.string(),
		date: z.string(),
		category: z.string(),
		content: z.string(),
	}),
	transform: async (document, context) => {
		const mdx = await compileMDX(context, document, {
			rehypePlugins: [rehypeAutolinkHeadings, rehypeSlug, rehypeRaw],
			remarkPlugins: [remarkGfm],
		});
		return {
			...document,
			mdx,
		};
	},
});

const quickNotes = defineCollection({
	name: "quickNotes",
	directory: "content/quick-notes",
	include: "**/*.mdx",
	schema: z.object({
		title: z.string(),
		subtitle: z.string(),
		date: z.string(),
		tags: z.array(z.string()),
		content: z.string(),
	}),
	transform: async (document, context) => {
		const mdx = await compileMDX(context, document, {
			rehypePlugins: [rehypeAutolinkHeadings, rehypeSlug, rehypeRaw],
			remarkPlugins: [remarkGfm],
		});
		return {
			...document,
			mdx,
		};
	},
});

export default defineConfig({
	collections: [projects, workExperiences, blogs, quickNotes],
});
