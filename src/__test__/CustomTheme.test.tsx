import { describe, expect, it, vi } from "vitest";

vi.mock("next/dynamic", () => ({
	default: () =>
		function DynamicMock(props: Record<string, unknown>) {
			return (
				<div
					data-testid="dynamic-component"
					data-width={String(props.width)}
					data-height={String(props.height)}
					data-width-type={typeof props.width}
				/>
			);
		},
}));

import { render, screen } from "@testing-library/react";
import type { ComponentType } from "react";
import { CustomTheme } from "@/components/CustomTheme";

describe("CustomTheme MDX components", () => {
	it("registers image and figure renderers for article MDX", () => {
		expect(CustomTheme.img).toBeTypeOf("function");
		expect(CustomTheme.Figure).toBeTypeOf("function");
		expect(CustomTheme.Tweet).toBeTypeOf("function");
	});

	it("passes Markdown image dimensions to the lightbox image", () => {
		const MarkdownImage = CustomTheme.img as ComponentType<{
			src: string;
			alt: string;
			width: string | number;
			height: string | number;
		}>;

		render(
			<MarkdownImage
				src="/diagram.png"
				alt="A diagram"
				width={1269}
				height={1027}
			/>,
		);

		expect(screen.getByTestId("dynamic-component")).toHaveAttribute(
			"data-width",
			"1269",
		);
		expect(screen.getByTestId("dynamic-component")).toHaveAttribute(
			"data-height",
			"1027",
		);
		expect(screen.getByTestId("dynamic-component")).toHaveAttribute(
			"data-width-type",
			"number",
		);
	});

	it("normalizes numeric string dimensions from raw MDX images", () => {
		const MarkdownImage = CustomTheme.img as ComponentType<{
			src: string;
			alt: string;
			width: string | number;
			height: string | number;
		}>;

		render(
			<MarkdownImage
				src="/diagram.png"
				alt="A diagram"
				width="640"
				height="480"
			/>,
		);

		expect(screen.getByTestId("dynamic-component")).toHaveAttribute(
			"data-width",
			"640",
		);
		expect(screen.getByTestId("dynamic-component")).toHaveAttribute(
			"data-width-type",
			"number",
		);
	});
});
