"use client";

import clsx from "clsx";
import Image from "next/image";
import { useRef, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

interface ImageWithLightboxProps {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	quality?: number;
	className?: string;
}

const ImageWithLightbox = ({
	src,
	alt,
	width = 1600,
	height = 900,
	quality = 75,
	className,
}: ImageWithLightboxProps) => {
	const [open, setOpen] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	const [hasError, setHasError] = useState(false);
	const triggerRef = useRef<HTMLButtonElement>(null);

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		triggerRef.current?.focus();
	};

	if (hasError) {
		return (
			<a
				href={src}
				target="_blank"
				rel="noreferrer"
				className="my-4 inline-flex rounded-lg border border-base-300 px-4 py-3 text-base-content/70 text-sm no-underline hover:bg-base-200"
			>
				Image unavailable{" "}
				<span className="ml-1 underline">(open original image)</span>
			</a>
		);
	}

	return (
		<>
			<button
				ref={triggerRef}
				type="button"
				onClick={handleOpen}
				className={clsx(
					"group mx-auto my-6 block max-w-full border-0 bg-transparent p-0 text-left focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4",
					className,
				)}
				aria-label={`View larger image: ${alt || "article image"}`}
			>
				<span className="relative block max-w-full">
					<Image
						src={src}
						alt={alt}
						width={width}
						height={height}
						quality={quality}
						loading="lazy"
						onLoad={() => setIsLoaded(true)}
						onError={() => setHasError(true)}
						placeholder="blur"
						blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3C/svg%3E"
						className={clsx(
							"block h-auto w-auto max-w-full rounded-lg object-contain shadow-sm transition-shadow group-hover:shadow-md",
							isLoaded ? "opacity-100" : "opacity-0",
						)}
						style={{ width: "auto", height: "auto", maxWidth: "100%" }}
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 960px"
					/>
					{!isLoaded && (
						<span
							className="absolute inset-0 flex min-h-36 items-center justify-center rounded-lg bg-base-200"
							data-testid="loading-container"
							role="status"
						>
							<span
								className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-800"
								aria-hidden="true"
							/>
							<span className="sr-only">Loading image</span>
						</span>
					)}
				</span>
			</button>
			<Lightbox
				open={open}
				close={handleClose}
				slides={[{ src, alt }]}
				plugins={[Zoom, Thumbnails, Counter]}
				zoom={{
					maxZoomPixelRatio: 3,
					zoomInMultiplier: 2,
				}}
				carousel={{ finite: true }}
				render={{
					iconNext: () => null,
					iconPrev: () => null,
				}}
			/>
		</>
	);
};

export default ImageWithLightbox;
