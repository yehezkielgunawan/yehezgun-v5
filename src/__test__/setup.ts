import "@testing-library/jest-dom";
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { vi } from "vitest";
import { allProjects } from "./mocks/content-collections";
import * as React from "react";

// Extend Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// Cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
	cleanup();
});

// Mock next/image as a simple img component
vi.mock("next/image", () => ({
	__esModule: true,
	default: (props: any) => {
		// eslint-disable-next-line @next/next/no-img-element
		return React.createElement("img", {
			...props,
			// These are the props next/image adds to img
			loading: props.loading || "lazy",
		});
	},
}));

// Note: content-collections is mocked via alias in vitest.config.ts
// which points to src/__test__/mocks/content-collections.ts

// Mock the projects service
vi.mock("@/services/projects", () => ({
	featuredProjects: allProjects.filter((p) => p.isFeatured),
	nonFeaturedProjects: allProjects.filter((p) => !p.isFeatured),
}));

// Mock the blogs service
vi.mock("@/services/blogs", () => ({
	blogList: [
		{
			title: "Test Blog Post",
			summary: "A test blog post summary",
			coverImg: "/test-cover.jpg",
			slug: "test-blog",
			date: "2024-03-20",
			category: "Testing",
		},
	],
	blogCategories: () => ["Testing"],
}));

// Mock the experiences service
vi.mock("@/services/experiences", () => ({
	experienceList: [
		{
			company: "Test Company",
			role: "Senior Developer",
			startDate: "2020-01-01",
			endDate: "2024-03-20",
		},
	],
}));
