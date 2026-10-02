import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import BlogTableOfContents from "@/components/BlogTableOfContents";

const headings = [
	{ id: "intro", title: "Introduction", level: 2 as const },
	{ id: "details", title: "Details", level: 3 as const },
];

describe("compact table of contents", () => {
	beforeEach(() => {
		window.history.replaceState(null, "", "/blog/test");
		HTMLElement.prototype.scrollIntoView = vi.fn();
		vi.stubGlobal(
			"matchMedia",
			vi.fn(() => ({
				matches: true,
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
			})),
		);
	});
	afterEach(() => vi.unstubAllGlobals());

	it("dismisses with Escape and restores trigger focus", () => {
		render(
			<BlogTableOfContents headings={headings} activeId="intro" isReading />,
		);
		const trigger = screen.getByRole("button", { name: "On this page" });
		fireEvent.click(trigger);
		expect(trigger).toHaveAttribute("aria-expanded", "true");
		const panel = screen.getByRole("navigation", { name: "Article sections" });
		within(panel).getByRole("link", { name: "Introduction" }).focus();
		fireEvent.keyDown(document, { key: "Escape" });
		expect(trigger).toHaveAttribute("aria-expanded", "false");
		expect(trigger).toHaveFocus();
	});

	it("navigates to a section with reduced motion and closes the panel", () => {
		render(
			<>
				<h2 id="details">Target heading</h2>
				<BlogTableOfContents headings={headings} activeId="intro" isReading />
			</>,
		);
		const trigger = screen.getByRole("button", { name: "On this page" });
		fireEvent.click(trigger);
		const panel = screen.getByRole("navigation", { name: "Article sections" });
		fireEvent.click(within(panel).getByRole("link", { name: "Details" }));
		expect(window.location.hash).toBe("#details");
		expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalledWith({
			behavior: "auto",
			block: "start",
		});
		expect(trigger).toHaveAttribute("aria-expanded", "false");
		expect(
			screen.getByRole("heading", { name: "Target heading" }),
		).toHaveFocus();
	});

	it("dismisses when clicking outside", () => {
		render(
			<BlogTableOfContents headings={headings} activeId="intro" isReading />,
		);
		const trigger = screen.getByRole("button", { name: "On this page" });
		fireEvent.click(trigger);
		fireEvent.pointerDown(document.body);
		expect(trigger).toHaveAttribute("aria-expanded", "false");
	});
});
