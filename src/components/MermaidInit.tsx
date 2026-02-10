"use client";

import { useEffect } from "react";

/**
 * MermaidInit - Client-side mermaid diagram renderer
 *
 * This component initializes mermaid.js and renders any mermaid code blocks
 * found in the page. It should be included on pages that contain mermaid diagrams.
 *
 * Mermaid code blocks are expected to have the class "language-mermaid" and
 * be wrapped in a <pre> tag (standard MDX code block output).
 */
export default function MermaidInit() {
	useEffect(() => {
		const renderMermaid = async () => {
			// Find all mermaid code blocks
			const mermaidBlocks = document.querySelectorAll(
				"pre code.language-mermaid",
			);

			if (mermaidBlocks.length === 0) return;

			// Dynamically import mermaid to reduce initial bundle size
			const mermaid = (await import("mermaid")).default;

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
				const codeBlock = mermaidBlocks[i];
				const preElement = codeBlock.parentElement;

				if (!preElement || preElement.tagName !== "PRE") continue;

				// Get the mermaid code
				const code = codeBlock.textContent || "";

				// Create a container for the rendered diagram
				const container = document.createElement("div");
				container.className = "mermaid-container mermaid-default";

				try {
					// Generate unique ID
					const id = `mermaid-diagram-${i}`;

					// Render the diagram
					const { svg } = await mermaid.render(id, code);

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
		};

		// Small delay to ensure DOM is ready after MDX hydration
		const timeoutId = setTimeout(renderMermaid, 100);

		return () => clearTimeout(timeoutId);
	}, []);

	return null;
}
