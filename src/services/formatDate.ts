export const formatDate = (
	date: string,
	dateFormat?: {
		year?: "numeric" | "2-digit";
		month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
		day?: "numeric" | "2-digit";
	},
) => {
	const options: Intl.DateTimeFormatOptions = {
		year: dateFormat?.year || "numeric",
		month: dateFormat?.month || "short",
		day: dateFormat?.day || "numeric",
	};
	return new Date(date).toLocaleDateString("en-US", options);
};
