import { defineCollection, defineConfig } from "@content-collections/core";
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

export default defineConfig({
	collections: [projects],
});
