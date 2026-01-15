"use client";

/**
 * ClientMDXContent
 * -----------------
 * Cloudflare Workers (and some other restricted runtimes) disallow dynamic code
 * generation (eval / new Function). The server-side render path of
 * @content-collections/mdx/react's <MDXContent /> may internally rely on that
 * when hydrating compiled MDX, which triggers:
 *
 *   EvalError: Code generation from strings disallowed for this context
 *
 * To avoid that, we defer loading and rendering the MDX runtime completely to
 * the browser by dynamically importing the renderer inside a useEffect. This
 * ensures no evaluation happens during the server / edge execution phase.
 *
 * Usage:
 *   <ClientMDXContent code={post.mdx} components={CustomTheme} />
 *
 * (Later, replace direct <MDXContent ... /> usages in server components / pages
 * with this wrapper.)
 */

import { useEffect, useState, type ReactNode, type ComponentType } from "react";

/**
 * Keep the runtime component props intentionally broad to avoid depending on the
 * global JSX namespace (which triggered a build-time "Cannot find namespace 'JSX'" error
 * in the constrained Cloudflare build setup).
 */
type MDXRuntimeComponent = ComponentType<{
	code: unknown;
	// biome-ignore lint/suspicious/noExplicitAny: MDX components can be any React component
	components?: Record<string, any>;
}>;

export interface ClientMDXContentProps {
	code: unknown;
	// biome-ignore lint/suspicious/noExplicitAny: MDX components can be any React component
	components?: Record<string, any>;
	/**
	 * Optional placeholder (skeleton / spinner) while the client bundle for
	 * MDX runtime is loading.
	 */
	placeholder?: ReactNode;
	/**
	 * Render a simple error UI instead of throwing to the nearest error boundary.
	 * Default: false (rethrow so Next.js error boundary can catch).
	 */
	inlineErrorFallback?: boolean;
	/**
	 * Custom inline error fallback node (used only if inlineErrorFallback=true).
	 */
	errorFallback?: (error: Error) => ReactNode;
	className?: string;
}

/**
 * A very small in-component cache so multiple instances on a single page
 * don't each trigger a fresh dynamic import.
 */
let cachedMDXRuntime: MDXRuntimeComponent | null = null;
let cachedError: Error | null = null;
let pendingImport: Promise<void> | null = null;

export default function ClientMDXContent({
	code,
	components,
	placeholder = null,
	inlineErrorFallback = true,
	errorFallback,
	className,
}: ClientMDXContentProps) {
	const [mdxComp, setMdxComp] = useState<MDXRuntimeComponent | null>(
		() => cachedMDXRuntime,
	);
	const [error, setError] = useState<Error | null>(() => cachedError);

	useEffect(() => {
		if (cachedMDXRuntime || cachedError) {
			// Already resolved (success or failure) from a previous instance.
			return;
		}

		if (!pendingImport) {
			pendingImport = import("@content-collections/mdx/react")
				.then((mod) => {
					cachedMDXRuntime = mod.MDXContent as MDXRuntimeComponent;
					setMdxComp(() => cachedMDXRuntime);
				})
				.catch((err) => {
					const e = err instanceof Error ? err : new Error(String(err));
					cachedError = e;
					setError(e);
				})
				.finally(() => {
					pendingImport = null;
				});
		} else {
			// Another instance is already importing; attach listeners through state update when resolved.
			pendingImport
				.then(() => {
					if (cachedMDXRuntime) setMdxComp(() => cachedMDXRuntime);
					if (cachedError) setError(cachedError);
				})
				.catch(() => {
					// Error already captured in the primary promise.
				});
		}
	}, []);

	// Error handling
	if (error) {
		if (!inlineErrorFallback) {
			throw error;
		}
		return (
			<div className="rounded-md border border-error/30 bg-error/5 p-4 text-error text-sm">
				{errorFallback ? (
					errorFallback(error)
				) : (
					<>
						<strong>MDX render error:</strong>{" "}
						<code className="break-all">{error.message}</code>
					</>
				)}
			</div>
		);
	}

	// Still loading runtime
	if (!mdxComp) {
		return placeholder ?? null;
	}

	const Runtime = mdxComp;

	return (
		<div className={className}>
			<Runtime code={code} components={components} />
		</div>
	);
}
