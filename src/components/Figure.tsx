import type { ReactNode } from "react";
import ImageWithLightbox from "@/components/ImageWithLightbox";

type FigureProps = {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	caption?: ReactNode;
};

export default function Figure({
	src,
	alt,
	width,
	height,
	caption,
}: FigureProps) {
	return (
		<figure className="mx-auto my-8 w-full">
			<ImageWithLightbox
				src={src}
				alt={alt}
				width={width}
				height={height}
				className="my-0"
			/>
			{caption && (
				<figcaption className="mt-3 text-center text-base-content/70 text-sm">
					{caption}
				</figcaption>
			)}
		</figure>
	);
}
