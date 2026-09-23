import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import BlogWrapper from "@/components/BlogWrapper";

vi.mock("@/components/BlogCard", () => ({
	default: ({ title }: { title: string }) => <article>{title}</article>,
}));

const blogs = [
	{
		title: "React Testing",
		coverImg: "/react.png",
		date: "2026-01-01",
		category: "Development",
		slug: "react-testing",
	},
	{
		title: "Design Notes",
		coverImg: "/design.png",
		date: "2025-01-01",
		category: "Design",
		slug: "design-notes",
	},
];

describe("BlogWrapper", () => {
	it("labels search and filters posts by title", () => {
		render(
			<BlogWrapper blogList={blogs} categoryList={["Development", "Design"]} />,
		);

		const search = screen.getByRole("searchbox", { name: "Search Blog" });
		fireEvent.change(search, { target: { value: "react" } });

		expect(screen.getByText("React Testing")).toBeInTheDocument();
		expect(screen.queryByText("Design Notes")).not.toBeInTheDocument();
	});

	it("filters posts by the selected category", () => {
		render(
			<BlogWrapper blogList={blogs} categoryList={["Development", "Design"]} />,
		);

		fireEvent.click(screen.getByRole("button", { name: "Design" }));

		expect(screen.getByText("Design Notes")).toBeInTheDocument();
		expect(screen.queryByText("React Testing")).not.toBeInTheDocument();
	});
});
