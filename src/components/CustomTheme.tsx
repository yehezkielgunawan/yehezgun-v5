import Image from "next/image";
import type {
	AnchorHTMLAttributes,
	DetailedHTMLProps,
	ImgHTMLAttributes,
} from "react";

export const CustomTheme = {
	a: ({
		href,
		children,
	}: DetailedHTMLProps<
		AnchorHTMLAttributes<HTMLAnchorElement>,
		HTMLAnchorElement
	>) => (
		<a
			href={href}
			className="link hover:decoration-dashed hover:underline-offset-2"
			target={String(href).startsWith("http") ? "_blank" : "_self"}
			rel="noreferrer"
		>
			{children}
		</a>
	),
	img: ({
		src,
		alt,
	}: DetailedHTMLProps<
		ImgHTMLAttributes<HTMLImageElement>,
		HTMLImageElement
	>) => (
		<Image
			src={src as string}
			alt={alt as string}
			width={500}
			height={300}
			className="m-0 aspect-video h-auto w-full rounded-lg object-contain"
		/>
	),
};
