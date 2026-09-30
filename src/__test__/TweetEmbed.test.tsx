import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
	useTweet: vi.fn(),
}));

vi.mock("react-tweet", () => ({
	useTweet: mocks.useTweet,
	EmbeddedTweet: ({ tweet }: { tweet: { text: string } }) => (
		<div data-testid="embedded-tweet">{tweet.text}</div>
	),
	TweetSkeleton: () => <div data-testid="tweet-skeleton">Loading post</div>,
}));

vi.mock("next-themes", () => ({
	useTheme: () => ({ theme: "nord", resolvedTheme: "dim" }),
}));

import TweetEmbed from "@/components/TweetEmbed";

describe("TweetEmbed", () => {
	beforeEach(() => {
		mocks.useTweet.mockReset();
	});

	it("fetches the tweet through the same-origin API and follows the site theme", () => {
		const id = "1594612869085233153";
		mocks.useTweet.mockReturnValue({
			data: { text: "A post worth embedding" },
			error: undefined,
			isLoading: false,
		});

		render(<TweetEmbed url={`https://x.com/username/status/${id}`} />);

		expect(mocks.useTweet).toHaveBeenCalledWith(id, `/api/tweet/${id}`);
		expect(screen.getByTestId("embedded-tweet")).toHaveTextContent(
			"A post worth embedding",
		);
		expect(screen.getByTestId("tweet-embed")).toHaveAttribute(
			"data-theme",
			"dark",
		);
	});

	it("shows a loading skeleton while the post is being fetched", () => {
		mocks.useTweet.mockReturnValue({
			data: undefined,
			error: undefined,
			isLoading: true,
		});

		render(<TweetEmbed id="1594612869085233153" />);

		expect(screen.getByTestId("tweet-skeleton")).toBeInTheDocument();
	});

	it("links to the source post when fetching fails", () => {
		mocks.useTweet.mockReturnValue({
			data: undefined,
			error: new Error("unavailable"),
			isLoading: false,
		});

		render(<TweetEmbed id="1594612869085233153" />);

		expect(
			screen.getByRole("link", { name: /view this post on x/i }),
		).toHaveAttribute("href", "https://x.com/i/status/1594612869085233153");
	});
});
