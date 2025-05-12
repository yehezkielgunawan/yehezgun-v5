import { describe, it, expect } from "vitest";
import * as projectService from "@/services/projects";

describe("Projects Service", () => {
	it("should return only featured projects", () => {
		const featuredProjects = projectService.featuredProjects;
		expect(featuredProjects).toHaveLength(1);
		expect(featuredProjects[0].name).toBe("Featured Project");
		expect(featuredProjects[0].isFeatured).toBe(true);
	});

	it("should return only non-featured projects", () => {
		const nonFeaturedProjects = projectService.nonFeaturedProjects;
		expect(nonFeaturedProjects).toHaveLength(1);
		expect(nonFeaturedProjects[0].name).toBe("Other Project");
		expect(nonFeaturedProjects[0].isFeatured).toBe(false);
	});
});
