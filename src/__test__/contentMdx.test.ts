// @vitest-environment node

import { compileMDX } from "@content-collections/mdx";
import { describe, expect, it } from "vitest";
import { contentRehypePlugins } from "@/services/contentMdx";

describe("content MDX plugins", () => {
	it("compiles flow JSX components used by blog articles", async () => {
		const document = {
			_meta: {
				filePath: "media.mdx",
				fileName: "media",
				directory: "blogs",
				path: "media",
				extension: "mdx",
			},
			content:
				'<Figure src="/diagram.png" alt="A diagram" width={640} height={480} caption="Diagram caption" />',
		};
		const context = {
			cache: async <Input, Output>(
				input: Input,
				compute: (input: Input) => Output | Promise<Output>,
			) => compute(input),
		};

		const compiled = await compileMDX(
			context as Parameters<typeof compileMDX>[0],
			document as Parameters<typeof compileMDX>[1],
			{ rehypePlugins: contentRehypePlugins },
		);

		expect(compiled).toContain("Figure");
	});
});
