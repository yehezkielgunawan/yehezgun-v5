type OGImageProps = {
	title: string;
	description: string;
};

export function generateOGImage({ title, description }: OGImageProps) {
	return `https://og-v2.yehezgun.com/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}&siteName=yehezgun.com&socialMedia=Twitter:%20@yehezgun`;
}

export const metadataContent = ({ title, description }: OGImageProps) => ({
	title,
	description,
	openGraph: {
		type: "website",
		url: "https://yehezgun.com",
		title,
		description,
		images: [
			generateOGImage({
				title,
				description,
			}),
		],
	},
	twitter: {
		title,
		description,
		card: "summary_large_image",
		site: "@yehezgun",
		images: [
			generateOGImage({
				title,
				description,
			}),
		],
	},
});
