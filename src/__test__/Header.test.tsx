import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Header from "@/components/Header";

vi.mock("next/link", () => ({
	default: ({
		href,
		children,
		...props
	}: {
		href: string;
		children: React.ReactNode;
		[key: string]: unknown;
	}) => (
		<a href={href} {...props}>
			{children}
		</a>
	),
}));

vi.mock("next/navigation", () => ({
	usePathname: () => "/blog",
}));

vi.mock("next-themes", () => ({
	useTheme: () => ({ theme: "nord", setTheme: vi.fn() }),
}));

describe("Header", () => {
	it("names navigation links and marks the current route", () => {
		render(<Header />);

		const blogLink = screen.getAllByRole("link", { name: "Blog" })[0];
		expect(blogLink).toHaveAttribute("aria-current", "page");
		expect(
			screen.getAllByRole("link", { name: "Projects" })[0],
		).toBeInTheDocument();
	});

	it("names the theme toggle", () => {
		render(<Header />);

		expect(
			screen.getByRole("checkbox", { name: "Toggle dark mode" }),
		).toBeInTheDocument();
	});
});
