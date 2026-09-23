import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ClientMDXContent from "@/components/ClientMDXContent";

vi.mock("@content-collections/mdx/react", () => ({
	MDXContent: ({ code }: { code: unknown }) => (
		<article data-testid="mdx-runtime">{String(code)}</article>
	),
}));

describe("ClientMDXContent", () => {
	it("shares the client runtime import across concurrent instances", async () => {
		render(
			<>
				<ClientMDXContent code="first content" placeholder={<p>Loading</p>} />
				<ClientMDXContent code="second content" placeholder={<p>Loading</p>} />
			</>,
		);

		await waitFor(() => {
			expect(screen.getByText("first content")).toBeInTheDocument();
			expect(screen.getByText("second content")).toBeInTheDocument();
		});
		expect(screen.getAllByTestId("mdx-runtime")).toHaveLength(2);
	});
});
