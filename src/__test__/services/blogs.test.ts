import { describe, expect, it } from "vitest";
import * as blogService from "@/services/blogs";

describe("Blogs Service", () => {
	describe("blogList", () => {
		it("should return blog list with the correct structure", () => {
			const blogList = blogService.blogList;

			// Verify the structure, not the exact test data
			expect(Array.isArray(blogList)).toBe(true);
			expect(blogList.length).toBeGreaterThan(0);

			// Check the structure of a blog item
			const firstBlog = blogList[0];
			expect(firstBlog).toHaveProperty("title");
			expect(firstBlog).toHaveProperty("summary");
			expect(firstBlog).toHaveProperty("coverImg");
			expect(firstBlog).toHaveProperty("date");
			expect(firstBlog).toHaveProperty("category");
			expect(firstBlog).toHaveProperty("slug");
		});
	});

	describe("getBlogBySlug", () => {
		it("should return a blog by slug", () => {
			// Get a valid slug from the blogList to test with
			const blogList = blogService.blogList;
			const testSlug = blogList[0].slug;

			const blog = blogService.getBlogBySlug(testSlug);
			expect(blog).toHaveProperty("title");
			expect(blog).toHaveProperty("mdx");
		});

		it("should return undefined if blog is not found", () => {
			expect(blogService.getBlogBySlug("non-existent-blog")).toBeUndefined();
		});
	});

	describe("blogCategories", () => {
		it("should return array of blog categories", () => {
			const categories = blogService.blogCategories();
			expect(Array.isArray(categories)).toBe(true);
		});
	});
});
