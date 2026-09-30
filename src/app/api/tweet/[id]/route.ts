import { getTweet } from "react-tweet/api";
import { extractTweetId } from "@/services/tweet";

type TweetRouteContext = {
	params: Promise<{ id: string }>;
};

const successCacheControl =
	"public, max-age=0, s-maxage=3600, stale-while-revalidate=86400";

export async function GET(_request: Request, { params }: TweetRouteContext) {
	const { id } = await params;
	const tweetId = extractTweetId(id);
	if (!tweetId) {
		return Response.json(
			{ error: "Invalid tweet ID" },
			{ status: 400, headers: { "Cache-Control": "no-store" } },
		);
	}

	try {
		const tweet = await getTweet(tweetId);
		if (!tweet) {
			return Response.json(
				{ data: null },
				{
					status: 404,
					headers: { "Cache-Control": "public, max-age=0, s-maxage=300" },
				},
			);
		}

		return Response.json(
			{ data: tweet },
			{ headers: { "Cache-Control": successCacheControl } },
		);
	} catch {
		return Response.json(
			{ error: "Tweet unavailable" },
			{ status: 502, headers: { "Cache-Control": "no-store" } },
		);
	}
}
