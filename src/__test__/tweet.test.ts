import { describe, expect, it } from "vitest";
import { extractTweetId } from "@/services/tweet";

describe("extractTweetId", () => {
	it("accepts numeric IDs and X status URLs", () => {
		expect(extractTweetId("1594612869085233153")).toBe("1594612869085233153");
		expect(
			extractTweetId("https://x.com/username/status/1594612869085233153?s=20"),
		).toBe("1594612869085233153");
	});

	it("accepts legacy Twitter status URLs", () => {
		expect(
			extractTweetId("https://twitter.com/username/status/1594612869085233153"),
		).toBe("1594612869085233153");
	});

	it("rejects unrelated hosts, non-status paths, and invalid IDs", () => {
		expect(
			extractTweetId("https://example.com/user/status/1234567890"),
		).toBeNull();
		expect(
			extractTweetId("https://x.com/username/likes/1234567890"),
		).toBeNull();
		expect(extractTweetId("https://x.com/username/status/abc")).toBeNull();
		expect(extractTweetId("123")).toBeNull();
	});
});
