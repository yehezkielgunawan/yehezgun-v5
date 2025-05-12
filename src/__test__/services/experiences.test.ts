import { describe, it, expect } from "vitest";
import * as experienceService from "@/services/experiences";

describe("Experiences Service", () => {
	it("should transform work experiences data correctly", () => {
		const experienceList = experienceService.experienceList;
		expect(experienceList).toHaveLength(2);

		expect(experienceList[0]).toMatchObject({
			company: "Test Company 1",
			role: "Senior Developer",
			startDate: "2020-01-01",
			endDate: "2023-01-01",
		});

		expect(experienceList[1]).toMatchObject({
			company: "Test Company 2",
			role: "Tech Lead",
			startDate: "2018-01-01",
			endDate: "2019-12-31",
		});
	});
});
