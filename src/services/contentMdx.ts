import type { Options } from "@content-collections/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";

export const contentRehypePlugins: NonNullable<Options["rehypePlugins"]> = [
	rehypeAutolinkHeadings,
	rehypeSlug,
	[
		rehypeRaw,
		{
			passThrough: ["mdxJsxFlowElement", "mdxJsxTextElement"],
		},
	],
];
