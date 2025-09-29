import { describe, it, expect } from "vitest";
import { generateOGImage, metadataContent } from "@/services/metadata";

describe("Metadata Service", () => {
	describe("generateOGImage", () => {
		it("should generate a correct OG image URL", () => {
			const title = "Test Title";
			const description = "Test Description";

			const ogImageUrl = generateOGImage({ title, description });

			// Check the URL structure
			expect(ogImageUrl).toContain("https://og-image-rev.yehez.workers.dev/og");
			expect(ogImageUrl).toContain(`title=${encodeURIComponent(title)}`);
			expect(ogImageUrl).toContain(
				`description=${encodeURIComponent(description)}`,
			);
			expect(ogImageUrl).toContain("siteName=yehezgun.com");
			expect(ogImageUrl).toContain("social=Twitter:%20@yehezgun");
		});

		it("should encode special characters in the URL", () => {
			const title = "Test & Title with spaces";
			const description = "Special characters: <>&?";

			const ogImageUrl = generateOGImage({ title, description });

			expect(ogImageUrl).toContain(`title=${encodeURIComponent(title)}`);
			expect(ogImageUrl).toContain(
				`description=${encodeURIComponent(description)}`,
			);
		});
	});

	describe("metadataContent", () => {
		it("should generate complete metadata with slug", () => {
			const title = "Test Page";
			const description = "Test Description";
			const slug = "test-page";

			const metadata = metadataContent({ title, description, slug });

			// Basic metadata
			expect(metadata.title).toBe(title);
			expect(metadata.description).toBe(description);
			expect(metadata.category).toBe("personal");

			// Icons
			expect(metadata.icons).toBeDefined();

			// OpenGraph
			expect(metadata.openGraph).toBeDefined();
			expect(metadata.openGraph?.url).toBe(`https://yehezgun.com/${slug}`);
			expect(metadata.openGraph?.title).toBe(title);
			expect(metadata.openGraph?.description).toBe(description);

			// Twitter
			expect(metadata.twitter).toBeDefined();
			expect(metadata.twitter?.title).toBe(title);
			expect(metadata.twitter?.description).toBe(description);

			// Check that Twitter card type exists (without checking specific value)
			expect(metadata.twitter).toHaveProperty("card");
		});

		it("should generate metadata without slug", () => {
			const title = "Home Page";
			const description = "Home Description";

			const metadata = metadataContent({ title, description });

			// Check URL without slug
			expect(metadata.openGraph?.url).toBe("https://yehezgun.com");
		});
	});
});
