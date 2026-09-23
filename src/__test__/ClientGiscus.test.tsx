import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ClientGiscus from "@/components/ClientGiscus";

vi.mock("@giscus/react", () => ({
	default: () => <div data-testid="giscus" />,
}));

vi.mock("next-themes", () => ({
	useTheme: () => ({ theme: "nord" }),
}));

vi.mock("@/constants/baseConst", () => ({
	repoName: undefined,
	repoId: undefined,
	categoryId: undefined,
}));

describe("ClientGiscus configuration", () => {
	it("does not render comments when its public configuration is incomplete", () => {
		render(<ClientGiscus />);

		expect(screen.queryByTestId("giscus")).not.toBeInTheDocument();
	});
});
