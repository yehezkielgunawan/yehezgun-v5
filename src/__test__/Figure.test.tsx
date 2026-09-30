import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Figure from "@/components/Figure";

vi.mock("@/components/ImageWithLightbox", () => ({
	default: ({ src, alt, width, height }: Record<string, string | number>) => (
		<button
			type="button"
			aria-label={`View larger image: ${alt}`}
			data-src={src}
			data-width={width}
			data-height={height}
		/>
	),
}));

describe("Figure", () => {
	it("renders an accessible lightbox image and optional caption", () => {
		render(
			<Figure
				src="/pipeline.png"
				alt="Rust compilation pipeline"
				width={1200}
				height={800}
				caption="From source code to WebAssembly."
			/>,
		);

		expect(screen.getByRole("figure")).toBeInTheDocument();
		expect(
			screen.getByRole("button", {
				name: "View larger image: Rust compilation pipeline",
			}),
		).toHaveAttribute("data-width", "1200");
		expect(screen.getByText("From source code to WebAssembly.").tagName).toBe(
			"FIGCAPTION",
		);
	});

	it("does not render an empty caption", () => {
		const { container } = render(
			<Figure src="/pipeline.png" alt="Rust compilation pipeline" />,
		);

		expect(screen.queryByRole("figure")).toBeInTheDocument();
		expect(container.querySelector("figcaption")).toBeNull();
	});
});
