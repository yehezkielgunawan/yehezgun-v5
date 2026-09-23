import { allWorkExperiences } from "content-collections";
import { compareDatesDescending } from "@/services/formatDate";

export const experienceList = allWorkExperiences
	.map((experience) => ({
		company: experience.company,
		role: experience.title,
		startDate: experience.startDate,
		endDate: experience.endDate,
		slug: experience._meta.path,
	}))
	.sort((firstExperience, secondExperience) =>
		compareDatesDescending(
			firstExperience.startDate,
			secondExperience.startDate,
			firstExperience.slug,
			secondExperience.slug,
		),
	);
