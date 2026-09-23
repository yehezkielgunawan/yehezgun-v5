import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ClientMDXContent from "@/components/ClientMDXContent";

const runtimeError = vi.hoisted(() => new Error("MDX runtime unavailable"));

vi.mock("@content-collections/mdx/react", () => {
	return {
		get MDXContent() {
			throw runtimeError;
		},
	};
});

describe("ClientMDXContent errors", () => {
	it("renders an inline fallback when the runtime import fails", async () => {
		render(<ClientMDXContent code="content" />);

		await waitFor(() => {
			expect(screen.getByText("MDX render error:")).toBeInTheDocument();
			expect(screen.getByText("MDX runtime unavailable")).toBeInTheDocument();
		});
	});
});
