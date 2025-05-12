import "@testing-library/jest-dom";
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { vi } from "vitest";
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
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	default: (props: any) => {
		// eslint-disable-next-line @next/next/no-img-element
		return React.createElement("img", {
			...props,
			// These are the props next/image adds to img
			loading: props.loading || "lazy",
		});
	},
}));

// Define mock data for services tests
export const mockProjects = [
	{
		name: "Featured Project",
		description: "A featured project description",
		url: "https://test.com/featured",
		projectHero: "/test-hero.jpg",
		projectIcon: "/test-icon.jpg",
		stacks: ["React", "TypeScript"],
		date: "2024-03-20",
		isFeatured: true,
		content: "Project content",
		_meta: {
			filePath: "/featured.md",
			fileName: "featured",
			directory: "projects",
			path: "/projects/featured",
			extension: "md",
		},
	},
	{
		name: "Other Project",
		description: "A non-featured project description",
		url: "https://test.com/other",
		projectHero: "/test-hero.jpg",
		projectIcon: "/test-icon.jpg",
		stacks: ["Next.js", "Tailwind"],
		date: "2024-03-19",
		isFeatured: false,
		content: "Project content",
		_meta: {
			filePath: "/other.md",
			fileName: "other",
			directory: "projects",
			path: "/projects/other",
			extension: "md",
		},
	},
];

export const mockBlogs = [
	{
		title: "Test Blog 1",
		summary: "Test summary 1",
		coverImg: "/test-cover-1.jpg",
		date: "2023-01-01",
		category: "Development",
		mdx: "Test content 1",
		_meta: { path: "test-blog-1" },
	},
	{
		title: "Test Blog 2",
		summary: "Test summary 2",
		coverImg: "/test-cover-2.jpg",
		date: "2023-02-01",
		category: "Design",
		mdx: "Test content 2",
		_meta: { path: "test-blog-2" },
	},
];

export const mockExperiences = [
	{
		company: "Test Company 1",
		title: "Senior Developer",
		startDate: "2020-01-01",
		endDate: "2023-01-01",
		description: "Test description 1",
		_meta: { path: "experience-1" },
	},
	{
		company: "Test Company 2",
		title: "Tech Lead",
		startDate: "2018-01-01",
		endDate: "2019-12-31",
		description: "Test description 2",
		_meta: { path: "experience-2" },
	},
];

export const mockQuickNotes = [
	{
		title: "Quick Note 1",
		subtitle: "Subtitle for note 1",
		date: "2023-01-01",
		tags: ["javascript", "react"],
		content: "Note content 1",
		_meta: { path: "quick-note-1" },
	},
	{
		title: "Quick Note 2",
		subtitle: "Subtitle for note 2",
		date: "2023-02-01",
		tags: ["typescript", "nextjs"],
		content: "Note content 2",
		_meta: { path: "quick-note-2" },
	},
];

// Note: content-collections is mocked via alias in vitest.config.ts
// but we need to define explicitly what should be exported from it
vi.mock("content-collections", () => ({
	allProjects: mockProjects,
	allBlogs: mockBlogs,
	allWorkExperiences: mockExperiences,
	allQuickNotes: mockQuickNotes,
}));
