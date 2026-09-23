"use client";
import { useState } from "react";
import { getShareButtons, type ShareButton } from "@/services/shareTargets";

type ShareButtonFlexProps = {
	title: string;
};

const ShareButtonFlex = ({ title }: ShareButtonFlexProps) => {
	const [isCopied, setIsCopied] = useState(false);

	const handleClick = async (btn: ShareButton) => {
		if (typeof window === "undefined") return;

		const currentUrl = window.location.href;
		if (btn.isCopy) {
			if (!navigator.clipboard) return;

			try {
				await navigator.clipboard.writeText(currentUrl);
				setIsCopied(true);
				setTimeout(() => {
					setIsCopied(false);
				}, 2000);
			} catch {
				setIsCopied(false);
			}
			return;
		}

		window.open(btn.getUrl(currentUrl), "_blank", "noopener,noreferrer");
	};

	return (
		<div className="flex items-center gap-4">
			{getShareButtons(title).map((btn) => (
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
