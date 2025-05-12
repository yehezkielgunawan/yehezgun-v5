import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import ProjectPage from "@/app/projects/page";
import BlogPage from "@/app/blog/page";
import About from "@/app/about/page";

describe("Home Page", () => {
	it("renders the main heading", () => {
		render(<Home />);
		const heading = screen.getByRole("heading", { level: 1 });
		expect(heading).toBeInTheDocument();
	});

	it("renders the navigation links", () => {
		render(<Home />);
		const navLinks = screen.getAllByRole("link");
		expect(navLinks.length).toBeGreaterThan(0);
	});

	it("renders the profile image", () => {
		render(<Home />);
		const image = screen.getByAltText("icon");
		expect(image).toBeInTheDocument();
	});

	it("renders the featured projects section", () => {
		render(<Home />);
		const featuredProjectsHeading = screen.getByRole("heading", {
			level: 2,
			name: /featured projects/i,
		});
		expect(featuredProjectsHeading).toBeInTheDocument();
	});
});

describe("Project Page", () => {
	it("renders the main heading", () => {
		render(<ProjectPage />);
		const heading = screen.getByRole("heading", {
			level: 1,
			name: /projects/i,
		});
		expect(heading).toBeInTheDocument();
	});

	it("renders the description", () => {
		render(<ProjectPage />);
		const paragraphs = screen.getAllByText(/.+/);
		expect(paragraphs.length).toBeGreaterThan(0);
	});

	it("renders featured projects section", () => {
		render(<ProjectPage />);
		const featuredHeading = screen.getByRole("heading", {
			level: 2,
			name: /featured projects/i,
		});
		expect(featuredHeading).toBeInTheDocument();
	});

	it("renders other projects section", () => {
		render(<ProjectPage />);
		const otherHeading = screen.getByRole("heading", {
			level: 2,
			name: /other projects/i,
		});
		expect(otherHeading).toBeInTheDocument();
	});
});

describe("Blog Page", () => {
	it("renders the main heading", () => {
		render(<BlogPage />);
		const heading = screen.getByRole("heading", {
			level: 1,
			name: /blog/i,
		});
		expect(heading).toBeInTheDocument();
	});

	it("renders the description", () => {
		render(<BlogPage />);
		const paragraphs = screen.getAllByText(/.+/);
		expect(paragraphs.length).toBeGreaterThan(0);
	});

	it("renders blog posts", () => {
		render(<BlogPage />);
		const articles = screen.getAllByRole("article");
		expect(articles.length).toBeGreaterThan(0);
	});
});

describe("About Page", () => {
	it("renders the main heading", () => {
		render(<About />);
		const heading = screen.getByRole("heading", { level: 1 });
		expect(heading).toBeInTheDocument();
	});

	it("renders the introduction section", () => {
		render(<About />);
		const paragraphs = screen.getAllByText(/.+/);
		expect(paragraphs.length).toBeGreaterThan(0);
	});

	it("renders experience section", () => {
		render(<About />);
		const experiencesHeading = screen.getByRole("heading", {
			level: 2,
			name: /Work Experiences/i,
		});
		expect(experiencesHeading).toBeInTheDocument();
	});
});
