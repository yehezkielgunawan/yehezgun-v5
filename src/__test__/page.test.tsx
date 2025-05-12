import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

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

// Mock the projects service directly
vi.mock("@/services/projects", () => ({
	featuredProjects: [
		{
			name: "Test Project 1",
			description: "Test Description 1",
			url: "https://test.com/1",
			projectHero: "/test-hero-1.jpg",
			projectIcon: "/test-icon-1.jpg",
			stacks: ["React", "TypeScript"],
			date: "2024-03-20",
			isFeatured: true,
			content: "Test content 1",
			_meta: {
				filePath: "/test-1.md",
				fileName: "test-1",
				directory: "projects",
				path: "/projects/test-1",
				extension: "md",
			},
		},
	],
	nonFeaturedProjects: [],
}));

describe("Home Page", () => {
	it("renders the main heading", () => {
		render(<Home />);
		expect(screen.getByText("Hello! I'm Yehez 🙌")).toBeInTheDocument();
	});

	it("renders the navigation links", () => {
		render(<Home />);
		expect(screen.getByText("Projects")).toBeInTheDocument();
		expect(screen.getByText("About Me")).toBeInTheDocument();
		expect(screen.getByText("Resume")).toBeInTheDocument();
	});

	it("renders the profile image", () => {
		render(<Home />);
		const image = screen.getByAltText("icon");
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute("src", "/yehez-icon.svg");
	});

	it("renders the featured projects section", () => {
		render(<Home />);
		expect(screen.getByText("Featured Projects")).toBeInTheDocument();
	});
});
