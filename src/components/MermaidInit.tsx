"use client";

import { useEffect } from "react";

/**
 * MermaidInit - Client-side mermaid diagram renderer
 *
 * This component initializes mermaid.js and renders any mermaid code blocks
 * found in the page. It should be included on pages that contain mermaid diagrams.
 *
 * Mermaid code blocks are expected to have classes like:
 * - "language-mermaid" -> default responsive behavior
 * - "language-mermaid-overflow" -> always scroll horizontally
 * - "language-mermaid-fit" -> always fit to container width
 */
export default function MermaidInit() {
	useEffect(() => {
		let cancelled = false;
		let isRendering = false;
		let rerenderRequested = false;
		let nextDiagramId = 0;

		const renderMermaid = async () => {
			if (cancelled) return;
			if (isRendering) {
				rerenderRequested = true;
				return;
			}

			// Find all mermaid code blocks (including variants)
			const mermaidBlocks = Array.from(
				document.querySelectorAll<HTMLElement>(
					'pre code[class*="language-mermaid"]',
				),
			);

			if (mermaidBlocks.length === 0) return;
			isRendering = true;

			try {
				// Dynamically import mermaid to reduce initial bundle size
				const mermaid = (await import("mermaid")).default;
				if (cancelled) return;

				// Initialize mermaid with configuration
				mermaid.initialize({
					startOnLoad: false,
					theme: "default",
					flowchart: {
						useMaxWidth: false,
						htmlLabels: true,
					},
					securityLevel: "loose",
				});

				// Process each mermaid block
				for (let i = 0; i < mermaidBlocks.length; i++) {
					if (cancelled) return;

					const codeBlock = mermaidBlocks[i];
					const preElement = codeBlock.parentElement;

					if (preElement?.tagName !== "PRE") continue;

					// Determine the mode from the class name
					const classList = codeBlock.className;
					let mode = "default";

					if (classList.includes("language-mermaid-overflow")) {
						mode = "overflow";
					} else if (classList.includes("language-mermaid-fit")) {
						mode = "fit";
					}

					// Get the mermaid code
					const code = codeBlock.textContent || "";

					// Create a container for the rendered diagram
					const container = document.createElement("div");
					container.className = `mermaid-container mermaid-${mode}`;

					try {
						// Generate unique ID
						const id = `mermaid-diagram-${nextDiagramId}`;
						nextDiagramId += 1;

						// Render the diagram
						const { svg } = await mermaid.render(id, code);

						if (cancelled) return;
						container.innerHTML = svg;

						// Replace the pre element with the rendered diagram
						preElement.replaceWith(container);
					} catch (error) {
						console.error("Mermaid rendering error:", error);
						// Keep the original code block on error
						container.innerHTML = `<div class="text-error p-4 border border-error/30 rounded-md">
							<strong>Mermaid Error:</strong> Failed to render diagram
						</div>`;
						preElement.replaceWith(container);
					}
				}
			} finally {
				isRendering = false;
				if (rerenderRequested) {
					rerenderRequested = false;
					void renderMermaid();
				}
			}
		};

		const observer = new MutationObserver(() => {
			void renderMermaid();
		});
		observer.observe(document.body, { childList: true, subtree: true });
		void renderMermaid();

		return () => {
			cancelled = true;
			observer.disconnect();
		};
	}, []);

	return null;
}
