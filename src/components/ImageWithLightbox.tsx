"use client";
import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";

interface ImageWithLightboxProps {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	quality?: number;
}

const ImageWithLightbox = ({
	src,
	alt,
	width = 1600,
	height = 900,
	quality = 100,
}: ImageWithLightboxProps) => {
	const [open, setOpen] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleImageLoad = () => setIsLoaded(true);

	return (
		<>
			<button
				type="button"
				onClick={handleOpen}
				className="mx-auto my-4 block border-0 bg-transparent p-0"
				aria-label={`View larger image: ${alt}`}
			>
				<div className="relative">
					<Image
						src={src}
						alt={alt}
						width={width}
						height={height}
						quality={quality}
						loading="eager"
						priority
						onLoad={handleImageLoad}
						placeholder="blur"
						blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3C/svg%3E"
						className={`max-h-80 rounded-lg object-contain hover:cursor-pointer ${isLoaded ? "opacity-100" : "opacity-0"}`}
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
					{!isLoaded && (
						<div
							className="absolute inset-0 flex items-center justify-center rounded-lg bg-gray-100"
							data-testid="loading-container"
						>
							<div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-800" />
						</div>
					)}
				</div>
			</button>
			<Lightbox
				open={open}
				close={() => setOpen(false)}
				slides={[{ src, alt }]}
				plugins={[Zoom, Thumbnails, Counter]}
				zoom={{
					maxZoomPixelRatio: 3,
					zoomInMultiplier: 2,
				}}
				carousel={{
					finite: true,
				}}
				render={{
					iconNext: () => null,
					iconPrev: () => null,
				}}
			/>
		</>
	);
};

export default ImageWithLightbox;
