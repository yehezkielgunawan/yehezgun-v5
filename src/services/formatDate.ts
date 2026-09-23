export const formatDate = (
	date: string,
	dateFormat: {
		year?: "numeric" | "2-digit";
		month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
		day?: "numeric" | "2-digit";
	} = {},
) => {
	const options: Intl.DateTimeFormatOptions = {
		year: dateFormat.year || "numeric",
		month: dateFormat.month || "short",
		day: dateFormat.day,
	};
	return new Date(date).toLocaleDateString("en-US", options);
};

export const compareDatesDescending = (
	firstDate: string,
	secondDate: string,
	firstTieBreaker = "",
	secondTieBreaker = "",
) => {
	const dateComparison = Date.parse(secondDate) - Date.parse(firstDate);

	return dateComparison !== 0
		? dateComparison
		: firstTieBreaker.localeCompare(secondTieBreaker);
};
