import { describe, expect, it } from "vitest";
import {
	contentDateSchema,
	externalUrlSchema,
} from "@/services/contentValidation";

describe("content validation", () => {
	it("accepts zero-padded ISO calendar dates and rejects malformed dates", () => {
		expect(contentDateSchema.safeParse("2026-03-16").success).toBe(true);
		expect(contentDateSchema.safeParse("2026-3-16").success).toBe(false);
		expect(contentDateSchema.safeParse("2026-02-31").success).toBe(false);
	});

	it("accepts HTTP URLs and rejects non-web URLs", () => {
		expect(externalUrlSchema.safeParse("https://example.com").success).toBe(
			true,
		);
		expect(externalUrlSchema.safeParse("http://localhost:3000").success).toBe(
			true,
		);
		expect(externalUrlSchema.safeParse("javascript:alert(1)").success).toBe(
			false,
		);
	});
});
