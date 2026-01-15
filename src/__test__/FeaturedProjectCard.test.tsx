import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import FeaturedProjectCard from "@/components/FeaturedProjectCard";
import type { Project } from "content-collections";

// Mock next/image
vi.mock("next/image", () => ({
	default: (props: {
		alt: string;
		src: string;
		width: number;
		height: number;
		className?: string;
		priority?: boolean;
		// biome-ignore lint/performance/noImgElement: Using img in test mock for next/image
	}) => <img {...props} alt={props.alt} src={props.src} />,
}));

describe("FeaturedProjectCard", () => {
	const mockProject: Project = {
		name: "Test Project",
		url: "https://test.com",
		projectHero: "/test-image.jpg",
		date: "2024-03-20",
		content: "Test content",
		description: "Test description",
		projectIcon: "/test-icon.jpg",
		stacks: ["React", "TypeScript"],
		isFeatured: true,
		_meta: {
			filePath: "/test.md",
			fileName: "test",
			directory: "projects",
			path: "/projects/test",
			extension: "md",
		},
	};

	it("renders project name", () => {
		render(<FeaturedProjectCard {...mockProject} />);
		expect(screen.getByText("Test Project")).toBeInTheDocument();
	});

	it("renders project image with correct attributes", () => {
		render(<FeaturedProjectCard {...mockProject} />);
		const image = screen.getByAltText("Test Project");
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute("src", "/test-image.jpg");
	});

	it("renders project link with correct href", () => {
		render(<FeaturedProjectCard {...mockProject} />);
		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("href", "https://test.com");
		expect(link).toHaveAttribute("target", "_blank");
		expect(link).toHaveAttribute("rel", "noreferrer");
	});
});
