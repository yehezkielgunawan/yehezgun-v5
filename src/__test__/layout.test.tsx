import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import RootLayout from "@/app/layout";

// Mock the dependencies
vi.mock("next/font/google", () => ({
	Plus_Jakarta_Sans: () => ({
		className: "mocked-font-class",
		subsets: ["latin"],
	}),
}));

vi.mock("@/context/ThemeProvider", () => ({
	ThemeProvider: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="theme-provider-mock">{children}</div>
	),
}));

vi.mock("next/script", () => ({
	__esModule: true,
	// biome-ignore lint/suspicious/noExplicitAny: Mock component needs any for props
	default: (props: any) => <div data-testid="next-script-mock" {...props} />,
}));

vi.mock("@/services/metadata", () => ({
	metadataContent: vi.fn().mockReturnValue({
		title: "Mocked Title",
		description: "Mocked Description",
	}),
}));

vi.mock("@/constants/baseConst", () => ({
	umamiId: "mocked-umami-id",
	umamiURL: "https://mocked-umami-url.com",
}));

vi.mock("./globals.css", () => ({}));

describe("RootLayout", () => {
	it("renders its children properly", () => {
		const testContent = <div data-testid="test-child">Test Content</div>;

		const { getByTestId } = render(<RootLayout>{testContent}</RootLayout>);

		// Verify child content is rendered
		expect(getByTestId("test-child")).toBeInTheDocument();
		// Verify it's wrapped in the mocked ThemeProvider
		expect(getByTestId("theme-provider-mock")).toBeInTheDocument();
	});

	it("renders the script component with umami props", () => {
		const { getByTestId } = render(
			<RootLayout>
				<div>Test Content</div>
			</RootLayout>,
		);

		const scriptElement = getByTestId("next-script-mock");
		expect(scriptElement).toBeInTheDocument();
		expect(scriptElement).toHaveAttribute("data-website-id", "mocked-umami-id");
		expect(scriptElement).toHaveAttribute(
			"src",
			"https://mocked-umami-url.com",
		);
		expect(scriptElement).toHaveAttribute("defer");
	});
});
