"use client";

import dynamic from "next/dynamic";

// Dynamically import MermaidInit with no SSR to prevent mermaid library from being bundled into server
const MermaidInit = dynamic(() => import("./MermaidInit"), {
	ssr: false,
	loading: () => null,
});

/**
 * MermaidWrapper - Client-side wrapper for lazy loading mermaid
 *
 * This wrapper ensures that the mermaid library is only loaded on the client
 * and never bundled into the server bundle, reducing the server bundle size.
 */
export default function MermaidWrapper() {
	return <MermaidInit />;
}
