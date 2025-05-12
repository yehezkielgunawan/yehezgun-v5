import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import GeneralWrapper from "@/components/GeneralWrapper";

// Mock child components
vi.mock("@/components/Header", () => ({
	default: () => <div data-testid="mock-header">Header</div>,
}));

vi.mock("@/components/MobileBottomNav", () => ({
	default: () => <div data-testid="mock-mobile-nav">Mobile Nav</div>,
}));

vi.mock("@/components/Footer", () => ({
	default: () => <div data-testid="mock-footer">Footer</div>,
}));

describe("GeneralWrapper", () => {
	it("renders all layout components", () => {
		render(
			<GeneralWrapper>
				<div>Test Content</div>
			</GeneralWrapper>,
		);

		expect(screen.getByTestId("mock-header")).toBeInTheDocument();
		expect(screen.getByTestId("mock-mobile-nav")).toBeInTheDocument();
		expect(screen.getByTestId("mock-footer")).toBeInTheDocument();
	});

	it("renders children content", () => {
		render(
			<GeneralWrapper>
				<div>Test Content</div>
			</GeneralWrapper>,
		);

		expect(screen.getByText("Test Content")).toBeInTheDocument();
	});

	it("wraps content in main and article tags", () => {
		render(
			<GeneralWrapper>
				<div>Test Content</div>
			</GeneralWrapper>,
		);

		const main = screen.getByRole("main");
		expect(main).toBeInTheDocument();
		expect(main.querySelector("article")).toBeInTheDocument();
	});
});
