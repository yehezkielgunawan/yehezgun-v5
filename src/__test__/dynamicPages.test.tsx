import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import BlogPage, {
	dynamicParams as blogDynamicParams,
	generateMetadata as generateBlogMetadata,
	generateStaticParams as generateBlogStaticParams,
} from "@/app/blog/[slug]/page";
import QuickNotePage, {
	dynamicParams as quickNoteDynamicParams,
	generateMetadata as generateQuickNoteMetadata,
	generateStaticParams as generateQuickNoteStaticParams,
} from "@/app/quick-notes/[slug]/page";

const mocks = vi.hoisted(() => ({
	getBlogBySlug: vi.fn(),
	getQuickNoteBySlug: vi.fn(),
	notFound: vi.fn((): never => {
		throw new Error("NEXT_NOT_FOUND");
	}),
}));

vi.mock("next/navigation", () => ({
	notFound: mocks.notFound,
}));

vi.mock("next/image", () => ({
	default: ({ src, alt }: { src: string; alt: string }) => (
		// biome-ignore lint/performance/noImgElement: Using img in test mock for next/image
		<img src={src} alt={alt} />
	),
}));

vi.mock("next/link", () => ({
	default: ({
		href,
		children,
	}: {
		href: string;
		children: React.ReactNode;
	}) => <a href={href}>{children}</a>,
}));

vi.mock("@/services/blogs", () => ({
	blogList: [{ slug: "first-blog" }],
	getBlogBySlug: mocks.getBlogBySlug,
}));

vi.mock("@/services/quickNotes", () => ({
	quickNotesList: [{ slug: "first-note" }],
	getQuickNoteBySlug: mocks.getQuickNoteBySlug,
}));

vi.mock("@/services/metadata", () => ({
	metadataContent: (metadata: unknown) => metadata,
}));

vi.mock("@/components/ClientGiscus", () => ({
	default: () => null,
}));

vi.mock("@/components/ClientMDXContent", () => ({
	default: () => <div data-testid="mdx-content" />,
}));

vi.mock("@/components/CustomTheme", () => ({
	CustomTheme: {},
}));

vi.mock("@/components/GeneralWrapper", () => ({
	default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock("@/components/MermaidWrapper", () => ({
	default: () => null,
}));

vi.mock("@/components/ShareButtonFlex", () => ({
	default: () => null,
}));

const blog = {
	title: "First Blog",
	summary: "A blog summary",
	coverImg: "/cover.png",
	date: "2026-01-01",
	category: "Testing",
	mdx: "blog content",
};

const note = {
	title: "First Note",
	subtitle: "A note subtitle",
	date: "2026-01-01",
	tags: ["testing"],
	mdx: "note content",
};

describe("dynamic content routes", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("pre-generates known blog and quick-note slugs", () => {
		expect(blogDynamicParams).toBe(false);
		expect(quickNoteDynamicParams).toBe(false);
		expect(generateBlogStaticParams()).toEqual([{ slug: "first-blog" }]);
		expect(generateQuickNoteStaticParams()).toEqual([{ slug: "first-note" }]);
	});

	it("generates blog metadata from the same blog lookup as the page", async () => {
		mocks.getBlogBySlug.mockReturnValue(blog);

		await expect(
			generateBlogMetadata({
				params: Promise.resolve({ slug: "first-blog" }),
			}),
		).resolves.toMatchObject({
			title: "First Blog",
			description: "A blog summary",
			slug: "blog/first-blog",
			type: "article",
		});
	});

	it("generates quick-note metadata from the page lookup", async () => {
		mocks.getQuickNoteBySlug.mockReturnValue(note);

		await expect(
			generateQuickNoteMetadata({
				params: Promise.resolve({ slug: "first-note" }),
			}),
		).resolves.toMatchObject({
			title: "Quick Notes: First Note",
			description: "A note subtitle",
			slug: "quick-notes/first-note",
		});
	});

	it("renders a known blog and quick note", async () => {
		mocks.getBlogBySlug.mockReturnValue(blog);
		mocks.getQuickNoteBySlug.mockReturnValue(note);

		render(await BlogPage({ params: Promise.resolve({ slug: "first-blog" }) }));
		expect(
			screen.getByRole("heading", { name: "First Blog" }),
		).toBeInTheDocument();

		render(
			await QuickNotePage({ params: Promise.resolve({ slug: "first-note" }) }),
		);
		expect(
			screen.getByRole("heading", { name: "First Note" }),
		).toBeInTheDocument();
	});

	it("returns a 404 signal for unknown blog and quick-note slugs", async () => {
		mocks.getBlogBySlug.mockReturnValue(undefined);
		mocks.getQuickNoteBySlug.mockReturnValue(undefined);

		await expect(
			generateBlogMetadata({
				params: Promise.resolve({ slug: "missing-blog" }),
			}),
		).rejects.toThrow("NEXT_NOT_FOUND");
		await expect(
			generateQuickNoteMetadata({
				params: Promise.resolve({ slug: "missing-note" }),
			}),
		).rejects.toThrow("NEXT_NOT_FOUND");
		await expect(
			BlogPage({ params: Promise.resolve({ slug: "missing-blog" }) }),
		).rejects.toThrow("NEXT_NOT_FOUND");
		await expect(
			QuickNotePage({ params: Promise.resolve({ slug: "missing-note" }) }),
		).rejects.toThrow("NEXT_NOT_FOUND");
		expect(mocks.notFound).toHaveBeenCalledTimes(4);
	});
});
