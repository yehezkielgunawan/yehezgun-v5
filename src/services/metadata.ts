import type { Metadata } from "next";

type OGImageProps = {
	title: string;
	description: string;
};

export function generateOGImage({ title, description }: OGImageProps) {
	return `https://og-v2.yehezgun.com/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}&siteName=yehezgun.com&socialMedia=Twitter:%20@yehezgun`;
}

export const metadataContent = ({
	title,
	description,
}: OGImageProps): Metadata => ({
	title,
	description,
	category: "personal",
	icons: {
		icon: "/yehez-icon.svg",
		shortcut: "/yehez-icon.svg",
		apple: "/yehez-icon.svg",
		other: {
			rel: "icon",
			url: "/yehez-icon.svg",
		},
	},
	openGraph: {
		type: "website",
		siteName: "YehezGun",
		url: "https://yehezgun.com",
		title,
		description,
		images: [
			{
				url: generateOGImage({
					title,
					description,
				}),
				width: 800,
				height: 600,
			},
		],
	},
	twitter: {
		title,
		description,
		card: "summary_large_image",
		site: "@yehezgun",
		creator: "@yehezgun",
		images: [
			generateOGImage({
				title,
				description,
			}),
		],
	},
});
