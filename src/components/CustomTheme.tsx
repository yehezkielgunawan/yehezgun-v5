"use client";
import dynamic from "next/dynamic";
import type {
	AnchorHTMLAttributes,
	DetailedHTMLProps,
	HTMLAttributes,
	ImgHTMLAttributes,
} from "react";

const SyntaxComponent = dynamic(() => import("./SyntaxComponent"), {
	ssr: false,
});
const ImageWithLightbox = dynamic(() => import("./ImageWithLightbox"), {
	ssr: false,
});
const FigureComponent = dynamic(() => import("./Figure"), {
	ssr: false,
});
const normalizeImageDimension = (value: string | number | undefined) => {
	const dimension = typeof value === "number" ? value : Number(value);
	return Number.isFinite(dimension) && dimension > 0 ? dimension : undefined;
};

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
		width,
		height,
	}: DetailedHTMLProps<
		ImgHTMLAttributes<HTMLImageElement>,
		HTMLImageElement
	>) => (
		<ImageWithLightbox
			src={typeof src === "string" ? src : ""}
			alt={alt ?? ""}
			width={normalizeImageDimension(width)}
			height={normalizeImageDimension(height)}
		/>
	),
	Figure: FigureComponent,

	code: (
		props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
	) => <SyntaxComponent props={props} />,
	pre: (
		props: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>,
	) => <pre className="bg-transparent p-0">{props.children}</pre>,
};
