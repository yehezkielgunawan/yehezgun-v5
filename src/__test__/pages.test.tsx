import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Home from "@/app/page";
import ProjectPage from "@/app/projects/page";
import BlogPage from "@/app/blog/page";
import About from "@/app/about/page";

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

		// Find the blog card and verify the category within it
		const blogCard = screen.getByRole("link", { name: /Test Blog Post/i });
		const category = within(blogCard).getByText("Testing");
		expect(category).toBeInTheDocument();
		expect(category).toHaveClass("badge");
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
