import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ImageWithLightbox from "@/components/ImageWithLightbox";

// Mock onLoad callback to test loading state
let mockImageOnLoad: (() => void) | undefined;

// Mock the lightbox to prevent errors in test environment
vi.mock("yet-another-react-lightbox", () => ({
	default: ({ open, close }: { open: boolean; close: () => void }) =>
		open ? (
			<div data-testid="lightbox-mock">
				Lightbox Content{" "}
				<button type="button" onClick={close}>
					Close
				</button>
			</div>
		) : null,
}));

vi.mock("yet-another-react-lightbox/plugins/zoom", () => ({
	default: {},
}));

vi.mock("yet-another-react-lightbox/plugins/thumbnails", () => ({
	default: {},
}));

vi.mock("yet-another-react-lightbox/plugins/counter", () => ({
	default: {},
}));

// Mock next/image
vi.mock("next/image", () => ({
	default: ({
		src,
		alt,
		onLoad,
		onError,
		...props
	}: {
		src: string;
		alt: string;
		onLoad?: () => void;
		onError?: () => void;
		[key: string]: unknown;
	}) => {
		// Store the onLoad callback so we can call it manually in tests
		mockImageOnLoad = onLoad;
		return (
			// biome-ignore lint/performance/noImgElement: Using img in test mock for next/image
			<img
				src={src}
				alt={alt}
				data-testid="image-inside-button"
				data-quality={String(props.quality)}
				onLoad={onLoad}
				onError={onError}
				{...props}
			/>
		);
	},
}));

describe("ImageWithLightbox", () => {
	beforeEach(() => {
		mockImageOnLoad = undefined;
	});

	it("renders an image", () => {
		render(<ImageWithLightbox src="/test-image.jpg" alt="Test image" />);
		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
		const image = screen.getByTestId("image-inside-button");
		expect(image).toBeInTheDocument();
	});

	it("shows loading state initially", () => {
		render(<ImageWithLightbox src="/test-image.jpg" alt="Test image" />);

		// The div with loading animation should be present
		const loadingContainer = screen.getByTestId("loading-container");
		expect(loadingContainer).toBeInTheDocument();
	});

	it("hides loading state after image is loaded", async () => {
		render(<ImageWithLightbox src="/test-image.jpg" alt="Test image" />);

		// Verify loading container is initially present
		expect(screen.getByTestId("loading-container")).toBeInTheDocument();

		// Simulate image load with act to handle state updates
		await act(async () => {
			if (mockImageOnLoad) {
				mockImageOnLoad();
			}
			// Wait for state update to complete
			await new Promise((resolve) => setTimeout(resolve, 0));
		});

		// Now the loading container should be removed
		expect(screen.queryByTestId("loading-container")).not.toBeInTheDocument();
	});

	it("opens lightbox when button is clicked", () => {
		render(<ImageWithLightbox src="/test-image.jpg" alt="Test image" />);
		const button = screen.getByRole("button");

		// Initially, lightbox should not be in the document
		expect(screen.queryByTestId("lightbox-mock")).not.toBeInTheDocument();

		// Click the button
		fireEvent.click(button);

		// Lightbox should now be in the document
		expect(screen.getByTestId("lightbox-mock")).toBeInTheDocument();
	});

	it("returns focus to the image button after the lightbox closes", () => {
		render(<ImageWithLightbox src="/test-image.jpg" alt="Test image" />);
		const button = screen.getByRole("button", {
			name: "View larger image: Test image",
		});

		fireEvent.click(button);
		fireEvent.click(screen.getByText("Close"));

		expect(button).toHaveFocus();
	});

	it("closes lightbox when close button is clicked", () => {
		render(<ImageWithLightbox src="/test-image.jpg" alt="Test image" />);
		const button = screen.getByRole("button");

		// Open the lightbox
		fireEvent.click(button);
		expect(screen.getByTestId("lightbox-mock")).toBeInTheDocument();

		// Click the close button
		const closeButton = screen.getByText("Close");
		fireEvent.click(closeButton);

		// Lightbox should no longer be in the document
		expect(screen.queryByTestId("lightbox-mock")).not.toBeInTheDocument();
	});

	it("applies custom quality when provided", () => {
		const customQuality = 90;
		render(
			<ImageWithLightbox
				src="/test-image.jpg"
				alt="Test image"
				quality={customQuality}
			/>,
		);
		expect(screen.getByTestId("image-inside-button")).toHaveAttribute(
			"data-quality",
			String(customQuality),
		);
	});

	it("preserves supplied dimensions and uses lazy, proportional article images", () => {
		render(
			<ImageWithLightbox
				src="/test-image.jpg"
				alt="Test image"
				width={1200}
				height={800}
			/>,
		);

		const image = screen.getByTestId("image-inside-button");
		expect(image).toHaveAttribute("width", "1200");
		expect(image).toHaveAttribute("height", "800");
		expect(image).toHaveAttribute("loading", "lazy");
		expect(image).toHaveStyle({ width: "auto", height: "auto" });
		expect(image).not.toHaveClass("max-h-80");
	});

	it("shows an original-image link when the image fails to load", () => {
		render(<ImageWithLightbox src="/missing.png" alt="Missing image" />);

		fireEvent.error(screen.getByTestId("image-inside-button"));

		expect(screen.queryByTestId("loading-container")).not.toBeInTheDocument();
		expect(screen.queryByRole("button")).not.toBeInTheDocument();
		expect(
			screen.getByRole("link", { name: /open original image/i }),
		).toHaveAttribute("href", "/missing.png");
	});
});
