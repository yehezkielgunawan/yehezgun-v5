import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import QuickNotesWrapper from "@/components/QuickNotesWrapper";

vi.mock("@/components/QuickNotesCard", () => ({
	default: ({ title }: { title: string }) => <article>{title}</article>,
}));

const notes = [
	{
		title: "React Testing",
		subtitle: "Testing notes",
		tags: ["react", "testing"],
		slug: "react-testing",
		date: "2026-01-01",
	},
	{
		title: "Cloudflare Config",
		subtitle: "Runtime notes",
		tags: ["cloudflare"],
		slug: "cloudflare-config",
		date: "2025-01-01",
	},
];

describe("QuickNotesWrapper", () => {
	it("labels search and filters notes by title or tag", () => {
		render(<QuickNotesWrapper quickNotesList={notes} />);

		const search = screen.getByRole("searchbox", { name: "Search Notes" });
		fireEvent.change(search, { target: { value: "cloudflare" } });

		expect(screen.getByText("Cloudflare Config")).toBeInTheDocument();
		expect(screen.queryByText("React Testing")).not.toBeInTheDocument();
	});
});
