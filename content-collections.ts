import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import type { Code, Root as MdastRoot } from "mdast";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { z } from "zod";

/**
 * Remark plugin to normalize mermaid code block languages.
 *
 * Usage in MDX:
 *   ```mermaid            -> default responsive behavior
 *   ```mermaid-overflow   -> always scroll horizontally
 *   ```mermaid-fit        -> always fit to container
 *
 * This plugin keeps the language variants so client-side can handle them.
 */
function remarkMermaidModes() {
	return (tree: MdastRoot) => {
		const visit = (node: MdastRoot | MdastRoot["children"][number]) => {
			if ("children" in node && Array.isArray(node.children)) {
				for (const child of node.children) {
					visit(child);
				}
			}

			// Normalize mermaid variants to mermaid for syntax highlighting
			// but keep a data attribute for the mode
			if (node.type === "code") {
				const codeNode = node as Code;
				const lang = codeNode.lang || "";

				if (
					lang === "mermaid-overflow" ||
					lang === "mermaid-fit" ||
					lang === "mermaid"
				) {
					// Store mode in meta for client-side handling
					const mode = lang.replace("mermaid-", "") || "default";
					codeNode.meta = `data-mermaid-mode="${mode === "mermaid" ? "default" : mode}"`;
					codeNode.lang = "mermaid";
				}
			}
		};

		visit(tree);
	};
}

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
			remarkPlugins: [remarkMermaidModes, remarkGfm],
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
