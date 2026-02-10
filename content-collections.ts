import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import type { Element, Root, RootContent } from "hast";
import type { Code, Root as MdastRoot } from "mdast";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeMermaid from "rehype-mermaid";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import { z } from "zod";

type MermaidMode = "default" | "overflow" | "fit";

// Track mermaid modes for the current document being processed
let currentDocMermaidModes: MermaidMode[] = [];

/**
 * Remark plugin to capture mermaid rendering modes from code block languages.
 *
 * Usage in MDX:
 *   ```mermaid            -> default responsive behavior
 *   ```mermaid-overflow   -> always scroll horizontally
 *   ```mermaid-fit        -> always fit to container
 *
 * This plugin normalizes the language back to "mermaid" so rehype-mermaid
 * can process it, while storing the mode for use by rehypeWrapMermaid.
 */
function remarkMermaidModes() {
	return (tree: MdastRoot) => {
		// Reset modes for this document
		currentDocMermaidModes = [];

		const visit = (node: MdastRoot | MdastRoot["children"][number]) => {
			if ("children" in node && Array.isArray(node.children)) {
				for (const child of node.children) {
					visit(child);
				}
			}

			if (node.type === "code") {
				const codeNode = node as Code;
				const lang = codeNode.lang || "";

				if (lang === "mermaid-overflow") {
					currentDocMermaidModes.push("overflow");
					codeNode.lang = "mermaid";
				} else if (lang === "mermaid-fit") {
					currentDocMermaidModes.push("fit");
					codeNode.lang = "mermaid";
				} else if (lang === "mermaid") {
					currentDocMermaidModes.push("default");
				}
			}
		};

		visit(tree);
	};
}

/**
 * Custom rehype plugin to wrap mermaid SVGs in a scrollable container.
 *
 * Modes (set via code block language in remark):
 * - default: Responsive (fits on mobile, scrolls on desktop)
 * - overflow: Always uses horizontal scrolling
 * - fit: Always fits to container width
 */
function rehypeWrapMermaid() {
	return (tree: Root) => {
		let mermaidIndex = 0;

		const wrapMermaidSvg = (children: RootContent[]): RootContent[] => {
			return children.map((node) => {
				if (node.type === "element") {
					const element = node as Element;

					// Check if this is a mermaid SVG
					if (
						element.tagName === "svg" &&
						element.properties?.id &&
						String(element.properties.id).startsWith("mermaid")
					) {
						const mode = currentDocMermaidModes[mermaidIndex] || "default";
						mermaidIndex++;

						// Wrap in a div container with mode class
						return {
							type: "element",
							tagName: "div",
							properties: {
								className: ["mermaid-container", `mermaid-${mode}`],
								"data-mermaid-mode": mode,
							},
							children: [element],
						} as Element;
					}

					// Recursively process children
					if (element.children) {
						element.children = wrapMermaidSvg(
							element.children as RootContent[],
						) as Element["children"];
					}
				}
				return node;
			});
		};

		tree.children = wrapMermaidSvg(tree.children);
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
			rehypePlugins: [
				rehypeAutolinkHeadings,
				rehypeSlug,
				rehypeRaw,
				[
					rehypeMermaid,
					{
						strategy: "inline-svg",
						mermaidConfig: {
							flowchart: {
								useMaxWidth: false,
								htmlLabels: true,
							},
							theme: "default",
						},
					},
				],
				rehypeWrapMermaid,
			],
			remarkPlugins: [remarkMermaidModes, remarkGfm, remarkHtml],
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
			remarkPlugins: [remarkGfm, remarkHtml],
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
