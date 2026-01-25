"use client";
import type {
	AnchorHTMLAttributes,
	DetailedHTMLProps,
	HTMLAttributes,
	ImgHTMLAttributes,
} from "react";
import ImageWithLightbox from "./ImageWithLightbox";
import SyntaxComponent from "./SyntaxComponent";

export const CustomTheme = {
	a: ({
		href,
		children,
	}: DetailedHTMLProps<
		AnchorHTMLAttributes<HTMLAnchorElement>,
		HTMLAnchorElement
	>) => {
		const isExternal = String(href).startsWith("http");
		return (
			<a
				href={href}
				className="link wrap-break-word hover:decoration-dashed hover:underline-offset-2"
				target={isExternal ? "_blank" : "_self"}
				rel="noreferrer"
			>
				{children}
				{isExternal && <span className="sr-only"> (opens in a new tab)</span>}
			</a>
		);
	},
	img: ({
		src,
		alt,
	}: DetailedHTMLProps<
		ImgHTMLAttributes<HTMLImageElement>,
		HTMLImageElement
	>) => <ImageWithLightbox src={src as string} alt={alt as string} />,

	code: (
		props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
	) => <SyntaxComponent props={props} />,
	pre: (
		props: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>,
	) => <pre className="bg-transparent p-0">{props.children}</pre>,
};
