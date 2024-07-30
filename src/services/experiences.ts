import { allWorkExperiences } from "content-collections";

export const experienceList = allWorkExperiences.map((experience) => ({
	company: experience.company,
	role: experience.title,
	startDate: experience.startDate,
	endDate: experience.endDate,
}));
