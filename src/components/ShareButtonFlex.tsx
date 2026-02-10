"use client";
import React from "react";
import ShareBtns from "./ShareBtns";

type ShareButtonFlexProps = {
	title: string;
};

const ShareButtonFlex = ({ title }: ShareButtonFlexProps) => {
	const [isCopied, setIsCopied] = React.useState(false);
	const currentUrl = typeof window !== "undefined" ? window.location.href : "";

	const handleClick = async (btn: {
		name: string;
		baseUrl: string;
		isCopy?: boolean;
	}) => {
		if (btn.isCopy) {
			// copy the current URL to the clipboard
			if (typeof window !== "undefined") {
				await navigator.clipboard.writeText(currentUrl);
			}
			setIsCopied(true);
			setTimeout(() => {
				setIsCopied(false);
			}, 2000);
			return;
		}

		if (typeof window !== "undefined") {
			window.open(btn.baseUrl, "_blank");
		}
	};

	return (
		<div className="flex items-center gap-4">
			{ShareBtns({ title, url: currentUrl as string }).map((btn) => (
				<button
					type="button"
					key={btn.name}
					className="btn btn-neutral btn-xs md:btn-sm flex items-center gap-2 rounded-lg"
					onClick={() => handleClick(btn)}
					data-umami-event={`Click Share Button: ${btn.name}`}
				>
					<btn.icon />
					<span>
						{btn.isCopy
							? isCopied
								? "Copied"
								: btn.name
							: `Share on ${btn.name}`}
					</span>
				</button>
			))}
		</div>
	);
};

export default ShareButtonFlex;
