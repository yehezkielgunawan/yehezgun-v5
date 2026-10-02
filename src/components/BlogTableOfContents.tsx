"use client";

import clsx from "clsx";
import { type MouseEvent, useEffect, useId, useRef, useState } from "react";
import { BiChevronDown, BiListUl } from "react-icons/bi";
import type { BlogHeading } from "@/components/useBlogTableOfContents";

type BlogTableOfContentsProps = {
	headings: BlogHeading[];
	activeId: string;
	isReading: boolean;
};

function HeadingList({
	headings,
	activeId,
	onNavigate,
}: Pick<BlogTableOfContentsProps, "headings" | "activeId"> & {
	onNavigate?: () => void;
}) {
	const navigate = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
		if (
			event.button !== 0 ||
			event.metaKey ||
			event.ctrlKey ||
			event.shiftKey ||
			event.altKey
		)
			return;
		const target = document.getElementById(id);
		if (!target) return;
		event.preventDefault();
		const hash = `#${encodeURIComponent(id)}`;
		if (window.location.hash !== hash) window.history.pushState(null, "", hash);
		const hadTabIndex = target.hasAttribute("tabindex");
		if (!hadTabIndex) {
			target.setAttribute("tabindex", "-1");
			target.addEventListener(
				"blur",
				() => target.removeAttribute("tabindex"),
				{ once: true },
			);
		}
		target.focus({ preventScroll: true });
		target.scrollIntoView({
			behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
				? "auto"
				: "smooth",
			block: "start",
		});
		onNavigate?.();
	};

	return (
		<ol className="m-0 space-y-1 p-0">
			{headings.map((heading) => (
				<li key={heading.id} className="m-0 list-none p-0">
					<a
						href={`#${encodeURIComponent(heading.id)}`}
						aria-current={activeId === heading.id ? "location" : undefined}
						onClick={(event) => navigate(event, heading.id)}
						className={clsx(
							"block border-l-2 px-3 py-2 text-sm leading-snug no-underline transition-colors focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 motion-reduce:transition-none",
							heading.level === 3 && "pl-6",
							activeId === heading.id
								? "border-primary bg-primary/10 font-medium text-primary"
								: "border-base-300 text-base-content/65 hover:border-base-content/40 hover:bg-base-200 hover:text-base-content",
						)}
					>
						<span className="wrap-break-word">{heading.title}</span>
					</a>
				</li>
			))}
		</ol>
	);
}

function CompactTableOfContents(
	props: Pick<BlogTableOfContentsProps, "headings" | "activeId">,
) {
	const [open, setOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const panelId = useId();

	useEffect(() => {
		if (!open) return;
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key !== "Escape") return;
			setOpen(false);
			triggerRef.current?.focus();
		};
		const onOutside = (event: Event) => {
			if (
				event.target instanceof Node &&
				!containerRef.current?.contains(event.target)
			)
				setOpen(false);
		};
		const breakpoint = window.matchMedia("(min-width: 96rem)");
		const onBreakpoint = () => setOpen(false);
		breakpoint.addEventListener("change", onBreakpoint);
		document.addEventListener("keydown", onKeyDown);
		document.addEventListener("pointerdown", onOutside);
		document.addEventListener("focusin", onOutside);
		return () => {
			breakpoint.removeEventListener("change", onBreakpoint);
			document.removeEventListener("keydown", onKeyDown);
			document.removeEventListener("pointerdown", onOutside);
			document.removeEventListener("focusin", onOutside);
		};
	}, [open]);

	return (
		<div
			ref={containerRef}
			className="blog-toc-floating not-prose fixed right-4 z-20 flex flex-col items-end gap-3 2xl:hidden"
		>
			<nav
				id={panelId}
				hidden={!open}
				aria-label="Article sections"
				className="w-80 max-w-[calc(100vw-2rem)] rounded-xl border border-base-300 bg-base-100 p-4 shadow-xl"
			>
				<p className="mb-3 font-semibold text-base-content/60 text-xs uppercase tracking-widest">
					On this page
				</p>
				<div className="blog-toc-compact-list overflow-y-auto overscroll-contain">
					<HeadingList {...props} onNavigate={() => setOpen(false)} />
				</div>
			</nav>
			<button
				ref={triggerRef}
				type="button"
				aria-expanded={open}
				aria-controls={panelId}
				onClick={() => setOpen((previous) => !previous)}
				className="btn gap-2 rounded-full border-base-300 bg-base-100 px-4 text-base-content shadow-lg hover:bg-base-200"
			>
				<BiListUl size={20} aria-hidden="true" />
				On this page
				<BiChevronDown
					size={18}
					aria-hidden="true"
					className={clsx(
						"transition-transform motion-reduce:transition-none",
						open && "rotate-180",
					)}
				/>
			</button>
		</div>
	);
}

export default function BlogTableOfContents({
	headings,
	activeId,
	isReading,
}: BlogTableOfContentsProps) {
	if (headings.length < 2) return null;
	return (
		<>
			<div className="not-prose absolute top-0 bottom-0 left-[calc(100%+1.5rem)] hidden w-56 2xl:block">
				<nav aria-label="On this page" className="sticky top-24">
					<p className="mb-4 font-semibold text-base-content/60 text-xs uppercase tracking-widest">
						On this page
					</p>
					<div className="max-h-[calc(100dvh-8rem)] overflow-y-auto overscroll-contain pr-1">
						<HeadingList headings={headings} activeId={activeId} />
					</div>
				</nav>
			</div>
			{isReading && (
				<CompactTableOfContents headings={headings} activeId={activeId} />
			)}
		</>
	);
}
