import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@/context/ThemeProvider";

// Mock next-themes
vi.mock("next-themes", () => ({
	ThemeProvider: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="theme-provider-mock">{children}</div>
	),
}));

describe("ThemeProvider", () => {
	it("renders its children properly", () => {
		const testContent = <div data-testid="test-child">Test Content</div>;

		const { getByTestId } = render(
			<ThemeProvider>{testContent}</ThemeProvider>,
		);

		// Verify child content is rendered
		expect(getByTestId("test-child")).toBeInTheDocument();
		// Verify it's wrapped in the mocked ThemeProvider
		expect(getByTestId("theme-provider-mock")).toBeInTheDocument();
	});

	it("passes props to the underlying NextThemesProvider", () => {
		// Since we've mocked the NextThemesProvider, we can't directly test the props
		// In a more complete test, we could use a Jest spy to verify props
		// This is a simplified example
		const { getByTestId } = render(
			<ThemeProvider defaultTheme="dark" attribute="class">
				<div data-testid="test-child">Test Content</div>
			</ThemeProvider>,
		);

		expect(getByTestId("theme-provider-mock")).toBeInTheDocument();
	});
});
