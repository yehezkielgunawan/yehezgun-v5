import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ShareButtonFlex from "@/components/ShareButtonFlex";

describe("ShareButtonFlex", () => {
	beforeEach(() => {
		window.history.pushState({}, "", "/blog/shareable-post");
		vi.restoreAllMocks();
	});

	it("opens an encoded share URL using the current browser URL", () => {
		const open = vi.spyOn(window, "open").mockImplementation(() => null);
		render(<ShareButtonFlex title="A & B" />);

		fireEvent.click(
			screen.getByRole("button", { name: "Share on Twitter (X)" }),
		);

		expect(open).toHaveBeenCalledWith(
			"https://x.com/intent/tweet?text=A+%26+B&url=http%3A%2F%2Flocalhost%3A3000%2Fblog%2Fshareable-post&via=yehezgun",
			"_blank",
			"noopener,noreferrer",
		);
	});

	it("shows copied only after the clipboard succeeds", async () => {
		Object.defineProperty(navigator, "clipboard", {
			configurable: true,
			value: { writeText: vi.fn().mockResolvedValue(undefined) },
		});
		render(<ShareButtonFlex title="A title" />);

		fireEvent.click(screen.getByRole("button", { name: "Copy Link" }));

		expect(await screen.findByText("Copied")).toBeInTheDocument();
	});

	it("keeps the copy button unchanged when the clipboard rejects", async () => {
		Object.defineProperty(navigator, "clipboard", {
			configurable: true,
			value: { writeText: vi.fn().mockRejectedValue(new Error("denied")) },
		});
		render(<ShareButtonFlex title="A title" />);

		fireEvent.click(screen.getByRole("button", { name: "Copy Link" }));

		expect(
			await screen.findByRole("button", { name: "Copy Link" }),
		).toHaveTextContent("Copy Link");
	});
});
