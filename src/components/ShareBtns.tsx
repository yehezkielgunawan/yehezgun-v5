"use client";
import { FaCopy, FaXTwitter } from "react-icons/fa6";

const ShareBtns = (props: { title?: string; url: string }) => {
	return [
		{
			name: "Twitter (X)",
			icon: FaXTwitter,
			baseUrl: `https://x.com/intent/tweet?text=${props.title}&url=${props.url}&via=yehezgun`,
		},
		{
			name: "Copy Link",
			icon: FaCopy,
			baseUrl: props.url,
			isCopy: true,
		},
	];
};

export default ShareBtns;
