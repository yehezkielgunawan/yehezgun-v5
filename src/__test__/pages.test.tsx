import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ProjectPage from "@/app/projects/page";
import BlogPage from "@/app/blog/page";
import About from "@/app/about/page";

// Mock next/image
vi.mock("next/image", () => ({
	default: (props: {
		alt: string;
		src: string;
		width: number;
		height: number;
		className?: string;
		priority?: boolean;
	}) => <img {...props} alt={props.alt} src={props.src} />,
}));

// Mock content-collections
vi.mock("content-collections", () => ({
	allProjects: [
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
	],
	allWorkExperiences: [
		{
			company: "Test Company",
			title: "Senior Developer",
			startDate: "2020-01-01",
			endDate: "2024-03-20",
			description: "Test experience description",
			_meta: {
				filePath: "/experience.md",
				fileName: "experience",
				directory: "experiences",
				path: "/experiences/test",
				extension: "md",
			},
		},
	],
}));

// Mock the projects service
vi.mock("@/services/projects", () => ({
	featuredProjects: [
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
	],
	nonFeaturedProjects: [
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
	],
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

describe("Project Page", () => {
	it("renders the main heading", () => {
		render(<ProjectPage />);
		expect(screen.getByText("Projects")).toBeInTheDocument();
	});

	it("renders the description", () => {
		render(<ProjectPage />);
		expect(
			screen.getByText(
				"Here I will share some of the projects I have worked on.",
			),
		).toBeInTheDocument();
	});

	it("renders featured projects section", () => {
		render(<ProjectPage />);
		expect(screen.getByText("Featured Projects")).toBeInTheDocument();
		expect(screen.getByText("Featured Project")).toBeInTheDocument();
	});

	it("renders other projects section", () => {
		render(<ProjectPage />);
		expect(screen.getByText("Other Projects")).toBeInTheDocument();
		expect(screen.getByText("Other Project")).toBeInTheDocument();
	});
});

describe("Blog Page", () => {
	it("renders the main heading", () => {
		render(<BlogPage />);
		expect(screen.getByText("Blog")).toBeInTheDocument();
	});

	it("renders the description", () => {
		render(<BlogPage />);
		expect(
			screen.getByText(
				"Here, I will share some of the things I learn on a daily basis.",
			),
		).toBeInTheDocument();
	});

	it("renders blog posts", () => {
		render(<BlogPage />);
		expect(screen.getByText("Test Blog Post")).toBeInTheDocument();
	});
});

describe("About Page", () => {
	it("renders the main heading", () => {
		render(<About />);
		expect(screen.getByText("✋Hello There!")).toBeInTheDocument();
	});

	it("renders the introduction section", () => {
		render(<About />);
		expect(screen.getByText(/You can call me Yehez!/)).toBeInTheDocument();
	});

	it("renders experience section", () => {
		render(<About />);
		expect(screen.getByText("Test Company")).toBeInTheDocument();
		expect(screen.getByText("Senior Developer")).toBeInTheDocument();
	});
});
