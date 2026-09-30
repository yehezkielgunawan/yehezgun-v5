"use client";

import { EmbeddedTweet, TweetSkeleton, useTweet } from "react-tweet";
import { useTheme } from "next-themes";
import { extractTweetId } from "@/services/tweet";

type TweetEmbedProps = {
	id?: string;
	url?: string;
};

export default function TweetEmbed({ id, url }: TweetEmbedProps) {
	const tweetId = extractTweetId(id ?? url ?? "");
	const { data, error, isLoading } = useTweet(
		tweetId ?? undefined,
		tweetId ? `/api/tweet/${tweetId}` : undefined,
	);
	const { theme, resolvedTheme } = useTheme();
	const activeTheme = resolvedTheme ?? theme;
	const tweetTheme =
		activeTheme === "dim" || activeTheme === "dark" ? "dark" : "light";
	const sourceUrl = tweetId ? `https://x.com/i/status/${tweetId}` : null;

	return (
		<figure
			className="not-prose mx-auto my-8 w-full max-w-[550px]"
			data-testid="tweet-embed"
			data-theme={tweetTheme}
			aria-busy={isLoading}
		>
			{isLoading ? (
				<div role="status" aria-label="Loading X post">
					<TweetSkeleton />
				</div>
			) : data && !error ? (
				<EmbeddedTweet tweet={data} />
			) : (
				<div className="rounded-xl border border-base-300 bg-base-200 p-5 text-base-content/75 text-sm">
					<p className="m-0">This X post could not be embedded right now.</p>
					{sourceUrl && (
						<a
							href={sourceUrl}
							target="_blank"
							rel="noreferrer"
							className="link mt-3 inline-block"
						>
							View this post on X
						</a>
					)}
				</div>
			)}
		</figure>
	);
}
