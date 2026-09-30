import { GET } from "@/app/api/tweet/[id]/route";
import { getTweet } from "react-tweet/api";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("react-tweet/api", () => ({
	getTweet: vi.fn(),
}));

const mockGetTweet = vi.mocked(getTweet);

const getRequest = (id: string) =>
	GET(new Request(`https://example.test/api/tweet/${id}`), {
		params: Promise.resolve({ id }),
	});

describe("GET /api/tweet/[id]", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("returns a cached tweet payload", async () => {
		const tweet = { id_str: "1594612869085233153", text: "A test post" };
		mockGetTweet.mockResolvedValue(tweet as never);

		const response = await getRequest("1594612869085233153");

		expect(response.status).toBe(200);
		expect(response.headers.get("Cache-Control")).toContain("s-maxage=3600");
		expect(await response.json()).toEqual({ data: tweet });
	});

	it("rejects malformed IDs without contacting the upstream service", async () => {
		const response = await getRequest("not-a-tweet");

		expect(response.status).toBe(400);
		expect(mockGetTweet).not.toHaveBeenCalled();
	});

	it("returns not found when X has no matching post", async () => {
		mockGetTweet.mockResolvedValue(null as never);

		const response = await getRequest("1594612869085233153");

		expect(response.status).toBe(404);
	});

	it("returns a controlled server error when the upstream request fails", async () => {
		mockGetTweet.mockRejectedValue(new Error("upstream unavailable"));

		const response = await getRequest("1594612869085233153");

		expect(response.status).toBe(502);
		expect(await response.json()).toEqual({ error: "Tweet unavailable" });
	});
});
