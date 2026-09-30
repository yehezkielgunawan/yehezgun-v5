const TWEET_ID_PATTERN = /^\d{10,40}$/;
const TWEET_HOSTS = new Set([
	"x.com",
	"www.x.com",
	"twitter.com",
	"www.twitter.com",
	"mobile.twitter.com",
]);

export function extractTweetId(value: string): string | null {
	const input = value.trim();
	if (TWEET_ID_PATTERN.test(input)) return input;

	let url: URL;
	try {
		url = new URL(input);
	} catch {
		return null;
	}

	if (!TWEET_HOSTS.has(url.hostname.toLowerCase())) return null;

	const segments = url.pathname.split("/").filter(Boolean);
	if (segments[1]?.toLowerCase() !== "status") return null;

	const tweetId = segments[2];
	return tweetId && TWEET_ID_PATTERN.test(tweetId) ? tweetId : null;
}
