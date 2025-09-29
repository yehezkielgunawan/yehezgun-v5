import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import ProjectPage from "@/app/projects/page";
import BlogPage from "@/app/blog/page";
import About from "@/app/about/page";
import QuickNotesPage from "@/app/quick-notes/page";
import ResumePage from "@/app/resume/page";
import Loading from "@/app/loading";

// Mock BlogWrapper component
vi.mock("@/components/BlogWrapper", () => ({
	default: ({
		blogList,
	}: {
		blogList: Array<{
			title: string;
			date: string;
			category: string;
			slug: string;
			summary: string;
		}>;
	}) => (
		<div data-testid="blog-wrapper">
			{blogList.map((blog) => (
				<article key={blog.slug}>{blog.title}</article>
			))}
		</div>
	),
}));

// Mock MDXContent component
vi.mock("@content-collections/mdx/react", () => ({
	// biome-ignore lint/correctness/noEmptyPattern: <explanation>
	MDXContent: ({}: { code: string; components: Record<string, unknown> }) => (
		<div data-testid="mdx-content">Mocked MDX Content</div>
	),
}));

// Mock getBlogBySlug and getBlogMetadataBySlug
vi.mock("@/services/blogs", () => ({
	getBlogBySlug: (_slug: string) => ({
		title: "Mocked Blog Title",
		date: "2023-01-01",
		category: "Technology",
		coverImg: "/image.jpg",
		summary: "Mocked blog summary",
		mdx: "mocked mdx content",
	}),
	getBlogMetadataBySlug: (_slug: string) => ({
		title: "Mocked Blog Title",
		summary: "Mocked blog summary",
	}),
	getBlogsList: () => [
		{
			title: "Blog 1",
			date: "2023-01-01",
			category: "Tech",
			slug: "blog-1",
			summary: "Summary 1",
		},
	],
	blogList: [
		{
			title: "Blog 1",
			date: "2023-01-01",
			category: "Tech",
			slug: "blog-1",
			summary: "Summary 1",
		},
	],
}));

// Mock getQuickNoteBySlug and quickNotesList
vi.mock("@/services/quickNotes", () => ({
	getQuickNoteBySlug: (_slug: string) => ({
		title: "Mocked Quick Note Title",
		subtitle: "Mocked Quick Note Subtitle",
		mdx: "mocked mdx content",
	}),
	quickNotesList: [
		{
			title: "Quick Note 1",
			subtitle: "Subtitle 1",
			slug: "note-1",
			date: "2023-01-01",
		},
	],
}));

// Mock Image, Link and iframe components
vi.mock("next/image", () => ({
	default: ({
		src,
		alt,
		className,
	}: {
		src: string;
		alt: string;
		className?: string;
	}) => (
		<img src={src} alt={alt} className={className} data-testid="mock-image" />
	),
}));

vi.mock("next/link", () => ({
	default: ({
		href,
		children,
		className,
	}: {
		href: string;
		children: React.ReactNode;
		className?: string;
	}) => (
		<a href={href} className={className} data-testid="mock-link">
			{children}
		</a>
	),
}));

// Mock ClientGiscus component
vi.mock("@/components/ClientGiscus", () => ({
	default: () => <div data-testid="giscus-component">Mocked Giscus</div>,
}));

// Mock ShareButtonFlex component
vi.mock("@/components/ShareButtonFlex", () => ({
	default: ({ title }: { title: string }) => (
		<div data-testid="share-buttons">Share buttons for: {title}</div>
	),
}));

// Mock QuickNotesWrapper component
vi.mock("@/components/QuickNotesWrapper", () => ({
	// biome-ignore lint/correctness/noEmptyPattern: <explanation>
	default: ({}: {
		quickNotesList: Array<{
			title: string;
			subtitle: string;
			slug: string;
			date: string;
		}>;
	}) => <div data-testid="quick-notes-wrapper">Mocked Quick Notes List</div>,
}));

// Mock formatDate
vi.mock("@/services/formatDate", () => ({
	formatDate: (_date: string) => "January 1, 2023",
}));

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
		const blogWrapper = screen.getByTestId("blog-wrapper");
		expect(blogWrapper).toBeInTheDocument();
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

describe("Quick Notes Page", () => {
	it("renders the main heading", () => {
		render(<QuickNotesPage />);
		const heading = screen.getByRole("heading", { level: 1 });
		expect(heading).toHaveTextContent("Quick Notes");
	});

	it("renders the description", () => {
		render(<QuickNotesPage />);
		const description = screen.getByText(
			/A Quick Notes From What I've Figured Out./i,
		);
		expect(description).toBeInTheDocument();
	});

	it("renders the quick notes wrapper component", () => {
		render(<QuickNotesPage />);
		const wrapper = screen.getByTestId("quick-notes-wrapper");
		expect(wrapper).toBeInTheDocument();
	});
});

describe("Resume Page", () => {
	it("renders the iframe", () => {
		render(<ResumePage />);
		const iframe = screen.getByTitle("Resume");
		expect(iframe).toBeInTheDocument();
		expect(iframe.tagName).toBe("IFRAME");
	});

	it("has the correct source URL", () => {
		render(<ResumePage />);
		const iframe = screen.getByTitle("Resume");
		expect(iframe).toHaveAttribute(
			"src",
			"https://drive.google.com/file/d/1oXe3GJlPHHDE3w14IzLSa650jXgvG-_K/preview",
		);
	});

	it("has the correct styling", () => {
		render(<ResumePage />);
		const iframe = screen.getByTitle("Resume");
		expect(iframe).toHaveClass("h-screen w-full");
	});
});

describe("Loading Component", () => {
	it("renders the skeleton UI elements", () => {
		render(<Loading />);
		const skeletonElements = screen.getAllByTestId("skeleton");
		expect(skeletonElements.length).toBe(3);
	});

	it("renders with correct styling", () => {
		render(<Loading />);
		const firstSkeleton = screen.getAllByTestId("skeleton")[0];
		expect(firstSkeleton).toHaveClass("h-12 w-full");
	});
});
