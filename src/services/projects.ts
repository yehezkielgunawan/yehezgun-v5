import { allProjects } from "content-collections";
import { compareDatesDescending } from "@/services/formatDate";

export const featuredProjects = allProjects
	.filter((project) => project.isFeatured)
	.sort((firstProject, secondProject) =>
		compareDatesDescending(
			firstProject.date,
			secondProject.date,
			firstProject._meta.path,
			secondProject._meta.path,
		),
	);

export const nonFeaturedProjects = allProjects
	.filter((project) => !project.isFeatured)
	.sort((firstProject, secondProject) =>
		compareDatesDescending(
			firstProject.date,
			secondProject.date,
			firstProject._meta.path,
			secondProject._meta.path,
		),
	);
