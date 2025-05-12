import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
// Import components after mocking
import Home from "@/app/page";
import ProjectPage from "@/app/projects/page";
import BlogPage from "@/app/blog/page";
import About from "@/app/about/page";

// Mock the module before importing components that use it
vi.mock("@/services/projects", () => ({
	featuredProjects: [
		{
			id: 1,
			name: "Mock Project 1",
			description: "Example Desc",
			isFeatured: true,
			url: "https://example.com",
			_meta: {
				filePath: "content/projects/mock-project-1.md",
			},
			projectHero: "/projects/mock-project-1/hero.png",
			projectIcon: "/projects/mock-project-1/icon.png",
			stacks: ["React", "Typescript"],
		},
		{
			id: 3,
			name: "Mock Project 3",
			description: "Example Desc",
			url: "https://example.com",
			isFeatured: true,
			_meta: {
				filePath: "content/projects/mock-project-3.md",
			},
			projectHero: "/projects/mock-project-1/hero.png",
			projectIcon: "/projects/mock-project-1/icon.png",
			stacks: ["React", "Typescript"],
		},
	],
	nonFeaturedProjects: [
		{
			id: 2,
			name: "Mock Project 2",
			description: "Example Desc",
			url: "https://example.com",
			isFeatured: false,
			_meta: {
				filePath: "content/projects/mock-project-2.md",
			},
			projectHero: "/projects/mock-project-1/hero.png",
			projectIcon: "/projects/mock-project-1/icon.png",
			stacks: ["React", "Typescript"],
		},
	],
}));

vi.mock("@/services/blogs", () => ({
	blogList: [
		{
			title: "Why Making A Starter Template Matters",
			summary: "The importance of having your own boilerplate.",
			coverImg: "/blogs/why-making-a-starter-template-matters/cover.png",
			slug: "why-making-a-starter-template-matters",
			date: "2022-10-30",
			category: "Random",
		},
		{
			title: "The Benefits of Learning TypeScript",
			summary: "Why TypeScript is a valuable skill for modern web development.",
			coverImg: "/blogs/benefits-of-learning-typescript/cover.png",
			slug: "why-making-a-starter-template-matters2",
			date: "2023-01-15",
			category: "Programming",
		},
		{
			title: "Understanding React Hooks",
			summary:
				"A deep dive into the world of React Hooks and how they can simplify your code.",
			coverImg: "/blogs/understanding-react-hooks/cover.png",
			slug: "why-making-a-starter-template-matters3",
			date: "2023-05-22",
			category: "Web Development",
		},
	],
	blogCategories: () => ["Random", "Programming", "Web Development"],
}));

vi.mock("@/services/experiences", () => ({
	experienceList: [
		{
			company: "Tech Innovators Inc.",
			role: "Software Engineer",
			startDate: "2020-01-15",
			endDate: "2022-06-30",
		},
		{
			company: "Creative Solutions Ltd.",
			role: "Frontend Developer",
			startDate: "2018-03-01",
			endDate: "2019-12-31",
		},
		{
			company: "Global Tech Corp.",
			role: "Backend Developer",
			startDate: "2016-07-10",
			endDate: "2018-02-28",
		},
	],
}));

test("should render the home page successfully", async () => {
	render(<Home />);
	expect(screen.getByText("Hello! I'm Yehez 🙌")).toBeInTheDocument();
});

test("should render the projects page successfully", async () => {
	render(<ProjectPage />);
	expect(screen.getByText("Featured Projects")).toBeInTheDocument();
});

test("should render the blog page successfully", async () => {
	render(<BlogPage />);
	expect(screen.getByText("Blog")).toBeInTheDocument();
});

test("should render the about page successfully", async () => {
	render(<About />);
	expect(screen.getByText("✋Hello There!")).toBeInTheDocument();
});
