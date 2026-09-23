import { describe, expect, it } from "vitest";
import { compareDatesDescending, formatDate } from "@/services/formatDate";

describe("FormatDate Service", () => {
	it("should format date with default options", () => {
		const date = "2023-01-15";
		const formattedDate = formatDate(date);

		// Default format is "Jan 2023" (month short, year numeric)
		expect(formattedDate).toBe("Jan 2023");
	});

	it("should format date with custom year format", () => {
		const date = "2023-01-15";
		const formattedDate = formatDate(date, { year: "2-digit" });

		// With year as 2-digit: "Jan 23"
		expect(formattedDate).toBe("Jan 23");
	});

	it("should format date with custom month format", () => {
		const date = "2023-01-15";
		const formattedDate = formatDate(date, { month: "long" });

		// With month as long: "January 2023"
		expect(formattedDate).toBe("January 2023");
	});

	it("should format date with day included", () => {
		const date = "2023-01-15";
		const formattedDate = formatDate(date, { day: "numeric" });

		// With day as numeric: "Jan 15, 2023"
		expect(formattedDate).toBe("Jan 15, 2023");
	});

	it("should format date with all custom options", () => {
		const date = "2023-01-15";
		const formattedDate = formatDate(date, {
			year: "2-digit",
			month: "numeric",
			day: "2-digit",
		});

		// With all custom options: "1/15/23"
		expect(formattedDate).toBe("1/15/23");
	});

	it("should compare dates from newest to oldest without changing the input", () => {
		const dates = ["2023-01-15", "2025-01-15", "2024-01-15"];

		const sortedDates = [...dates].sort(compareDatesDescending);

		expect(sortedDates).toEqual(["2025-01-15", "2024-01-15", "2023-01-15"]);
		expect(dates).toEqual(["2023-01-15", "2025-01-15", "2024-01-15"]);
	});

	it("uses a stable tie breaker for equal dates", () => {
		expect(
			compareDatesDescending("2024-01-01", "2024-01-01", "second", "first"),
		).toBeGreaterThan(0);
	});
});
