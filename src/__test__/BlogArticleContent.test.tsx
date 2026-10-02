import {
	act,
	fireEvent,
	render,
	screen,
	waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import BlogArticleContent from "@/components/BlogArticleContent";

const disconnect = vi.fn();
let notifyIntersection: IntersectionObserverCallback;
let headingTops: Record<string, number>;
let articleBottom: number;
const scrollIntoView = vi.fn();

describe("blog article navigation", () => {
	beforeEach(() => {
		headingTops = { intro: 120, details: 600 };
		articleBottom = 2000;
		vi.clearAllMocks();
		window.history.replaceState(null, "", "/blog/test");
		vi.stubGlobal(
			"IntersectionObserver",
			class {
				constructor(callback: IntersectionObserverCallback) {
					notifyIntersection = callback;
				}
				observe = vi.fn();
				unobserve = vi.fn();
				disconnect = disconnect;
			},
		);
		vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
			function (this: HTMLElement) {
				const top = this.matches("h2, h3")
					? (headingTops[this.id] ?? 600)
					: 100;
				return {
					top,
					bottom: this.matches("h2, h3") ? top + 30 : articleBottom,
					height: 1900,
					width: 800,
					left: 0,
					right: 800,
					x: 0,
					y: top,
					toJSON: () => ({}),
				};
			},
		);
		HTMLElement.prototype.scrollIntoView = scrollIntoView;
	});
	afterEach(() => {
		vi.restoreAllMocks();
		vi.unstubAllGlobals();
	});

	it("discovers delayed headings only inside the article and preserves duplicate IDs", async () => {
		const { rerender } = render(
			<>
				<h2 id="outside">Outside</h2>
				<BlogArticleContent>
					<p>Loading content...</p>
				</BlogArticleContent>
			</>,
		);
		expect(
			screen.queryByRole("button", { name: "On this page" }),
		).not.toBeInTheDocument();
		rerender(
			<>
				<h2 id="outside">Outside</h2>
				<BlogArticleContent>
					<h2 id="intro">Introduction</h2>
					<h3 id="intro-1">Introduction</h3>
					<h4 id="excluded">Excluded</h4>
				</BlogArticleContent>
			</>,
		);
		await waitFor(() =>
			expect(
				screen.getByRole("button", { name: "On this page" }),
			).toBeInTheDocument(),
		);
		const links = screen.getAllByRole("link", { name: "Introduction" });
		expect(links.map((link) => link.getAttribute("href"))).toEqual([
			"#intro",
			"#intro-1",
		]);
		expect(
			screen.queryByRole("link", { name: "Outside" }),
		).not.toBeInTheDocument();
		expect(
			screen.queryByRole("link", { name: "Excluded" }),
		).not.toBeInTheDocument();
	});

	it("hides navigation for a single heading", () => {
		render(
			<BlogArticleContent>
				<h2 id="intro">Introduction</h2>
			</BlogArticleContent>,
		);
		expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
	});

	it("updates the active section and hides the floating control past the body", async () => {
		render(
			<BlogArticleContent>
				<h2 id="intro">Introduction</h2>
				<h2 id="details">Details</h2>
			</BlogArticleContent>,
		);
		expect(screen.getByRole("link", { name: "Introduction" })).toHaveAttribute(
			"aria-current",
			"location",
		);
		headingTops = { intro: -600, details: 90 };
		act(() => notifyIntersection([], {} as IntersectionObserver));
		await waitFor(() =>
			expect(screen.getByRole("link", { name: "Details" })).toHaveAttribute(
				"aria-current",
				"location",
			),
		);
		articleBottom = -100;
		fireEvent.scroll(window);
		await waitFor(() =>
			expect(
				screen.queryByRole("button", { name: "On this page" }),
			).not.toBeInTheDocument(),
		);
	});

	it("resolves an incoming fragment after delayed rendering", async () => {
		window.history.replaceState(null, "", "/blog/test#details");
		const { rerender } = render(
			<BlogArticleContent>
				<p>Loading...</p>
			</BlogArticleContent>,
		);
		rerender(
			<BlogArticleContent>
				<h2 id="intro">Introduction</h2>
				<h2 id="details">Details</h2>
			</BlogArticleContent>,
		);
		await waitFor(() =>
			expect(scrollIntoView).toHaveBeenCalledWith({
				behavior: "auto",
				block: "start",
			}),
		);
	});

	it("cleans up tracking and removes old headings when the post changes", async () => {
		const { rerender, unmount } = render(
			<BlogArticleContent key="first">
				<h2 id="intro">Introduction</h2>
				<h2 id="details">Details</h2>
			</BlogArticleContent>,
		);
		rerender(
			<BlogArticleContent key="second">
				<h2 id="new">New post</h2>
				<h2 id="end">Ending</h2>
			</BlogArticleContent>,
		);
		expect(
			screen.queryByRole("link", { name: "Introduction" }),
		).not.toBeInTheDocument();
		expect(screen.getByRole("link", { name: "New post" })).toBeInTheDocument();
		unmount();
		expect(disconnect).toHaveBeenCalled();
	});
});
