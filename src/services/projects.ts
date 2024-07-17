import { allProjects } from "content-collections";

export const featuredProjects = allProjects.filter(
	(project) => project.isFeatured,
);

export const nonFeaturedProjects = allProjects.filter(
	(project) => !project.isFeatured,
);
