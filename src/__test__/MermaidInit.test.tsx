import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import MermaidInit from "@/components/MermaidInit";

const mermaid = vi.hoisted(() => ({
	initialize: vi.fn(),
	render: vi.fn().mockResolvedValue({ svg: "<svg data-testid='diagram' />" }),
}));

vi.mock("mermaid", () => ({ default: mermaid }));

const appendMermaidBlock = (code: string) => {
	const pre = document.createElement("pre");
	pre.dataset.testid = "mermaid-input";
	pre.innerHTML = `<code class="language-mermaid">${code}</code>`;
	document.body.appendChild(pre);
};

describe("MermaidInit", () => {
	beforeEach(() => {
		mermaid.initialize.mockClear();
		mermaid.render.mockReset();
		mermaid.render.mockResolvedValue({ svg: "<svg data-testid='diagram' />" });
	});

	afterEach(() => {
		document
			.querySelectorAll('[data-testid="mermaid-input"], .mermaid-container')
			.forEach((node) => {
				node.remove();
			});
	});

	it("renders Mermaid code blocks added after the client DOM is ready", async () => {
		render(<MermaidInit />);
		appendMermaidBlock("graph TD; A--&gt;B;");

		await waitFor(() => {
			expect(screen.getByTestId("diagram")).toBeInTheDocument();
		});
		expect(mermaid.initialize).toHaveBeenCalledWith(
			expect.objectContaining({
				startOnLoad: false,
				securityLevel: "loose",
			}),
		);
	});

	it("renders diagrams that appear after the initial observation window", async () => {
		render(<MermaidInit />);
		await new Promise((resolve) => setTimeout(resolve, 150));
		appendMermaidBlock("graph TD; C--&gt;D;");

		await waitFor(() => {
			expect(screen.getByTestId("diagram")).toBeInTheDocument();
		});
	});

	it("uses a unique Mermaid ID across observer render passes", async () => {
		render(<MermaidInit />);
		appendMermaidBlock("graph TD; A--&gt;B;");

		await waitFor(() => {
			expect(mermaid.render).toHaveBeenCalledTimes(1);
		});

		appendMermaidBlock("graph TD; C--&gt;D;");

		await waitFor(() => {
			expect(mermaid.render).toHaveBeenCalledTimes(2);
		});
		expect(mermaid.render.mock.calls.map(([id]) => id)).toEqual([
			"mermaid-diagram-0",
			"mermaid-diagram-1",
		]);
	});

	it("replaces invalid diagrams with a visible error", async () => {
		mermaid.render.mockRejectedValueOnce(new Error("invalid diagram"));
		const consoleError = vi
			.spyOn(console, "error")
			.mockImplementation(() => {});
		render(<MermaidInit />);
		appendMermaidBlock("invalid");

		await waitFor(() => {
			expect(screen.getByText("Mermaid Error:")).toBeInTheDocument();
		});
		expect(consoleError).toHaveBeenCalledWith(
			"Mermaid rendering error:",
			expect.any(Error),
		);
	});
});
