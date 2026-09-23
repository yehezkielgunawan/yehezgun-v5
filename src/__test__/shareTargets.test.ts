import { describe, expect, it } from "vitest";
import { getShareButtons } from "@/services/shareTargets";

describe("share targets", () => {
	it("encodes the title and current URL for X", () => {
		const [twitterButton] = getShareButtons("A & B");

		expect(twitterButton.getUrl("https://example.com/post?a=1&b=2")).toBe(
			"https://x.com/intent/tweet?text=A+%26+B&url=https%3A%2F%2Fexample.com%2Fpost%3Fa%3D1%26b%3D2&via=yehezgun",
		);
	});

	it("returns the current URL for the copy target", () => {
		const [, copyButton] = getShareButtons("A title");

		expect(copyButton.getUrl("https://example.com/post")).toBe(
			"https://example.com/post",
		);
	});
});
