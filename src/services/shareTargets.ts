import type { IconType } from "react-icons";
import { FaCopy, FaXTwitter } from "react-icons/fa6";

export type ShareButton = {
	name: string;
	icon: IconType;
	isCopy?: boolean;
	getUrl: (currentUrl: string) => string;
};

export const getShareButtons = (title: string): ShareButton[] => [
	{
		name: "Twitter (X)",
		icon: FaXTwitter,
		getUrl: (currentUrl) => {
			const params = new URLSearchParams({
				text: title,
				url: currentUrl,
				via: "yehezgun",
			});
			return `https://x.com/intent/tweet?${params.toString()}`;
		},
	},
	{
		name: "Copy Link",
		icon: FaCopy,
		isCopy: true,
		getUrl: (currentUrl) => currentUrl,
	},
];
