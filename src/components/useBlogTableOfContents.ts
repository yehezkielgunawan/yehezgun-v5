"use client";

import { type RefObject, useEffect, useState } from "react";

export type BlogHeading = {
	id: string;
	title: string;
	level: 2 | 3;
};

// Matches the blog heading scroll margin and leaves space below the fixed header.
const readingOffset = 96;

export default function useBlogTableOfContents(
	bodyRef: RefObject<HTMLDivElement | null>,
) {
	const [headings, setHeadings] = useState<BlogHeading[]>([]);
	const [activeId, setActiveId] = useState("");
	const [isReading, setIsReading] = useState(false);

	useEffect(() => {
		const body = bodyRef.current;
		if (!body) return;

		let elements: HTMLHeadingElement[] = [];
		let frame: number | null = null;
		let resolvedHash = "";

		const updatePosition = () => {
			const bounds = body.getBoundingClientRect();
			setIsReading(
				bounds.top < window.innerHeight && bounds.bottom > readingOffset,
			);
			let current: HTMLHeadingElement | undefined = elements[0];
			for (const heading of elements) {
				if (heading.getBoundingClientRect().top > readingOffset + 1) break;
				current = heading;
			}
			// The last section may be too short to reach the reading line.
			if (bounds.top < readingOffset && bounds.bottom <= window.innerHeight) {
				current = elements.at(-1);
			}
			setActiveId(current?.id ?? "");
		};

		const schedulePositionUpdate = () => {
			if (frame === null) {
				frame = window.requestAnimationFrame(() => {
					frame = null;
					updatePosition();
				});
			}
		};

		const resolveHash = () => {
			const hash = window.location.hash;
			if (!hash || hash === resolvedHash) return;
			let id: string;
			try {
				id = decodeURIComponent(hash.slice(1));
			} catch {
				return;
			}
			const target = elements.find((element) => element.id === id);
			if (!target) return;
			resolvedHash = hash;
			target.scrollIntoView({ behavior: "auto", block: "start" });
			schedulePositionUpdate();
		};

		const intersection =
			typeof IntersectionObserver === "undefined"
				? null
				: new IntersectionObserver(schedulePositionUpdate, {
						rootMargin: `-${readingOffset}px 0px 0px 0px`,
					});

		const collectHeadings = () => {
			elements = Array.from(
				body.querySelectorAll<HTMLHeadingElement>("h2[id], h3[id]"),
			).filter((element) => element.id && element.textContent?.trim());
			const next = elements.map(
				(element): BlogHeading => ({
					id: element.id,
					title: element.textContent?.replace(/\s+/g, " ").trim() ?? "",
					level: element.tagName === "H2" ? 2 : 3,
				}),
			);
			setHeadings((previous) =>
				previous.length === next.length &&
				previous.every(
					(heading, index) =>
						heading.id === next[index].id &&
						heading.title === next[index].title &&
						heading.level === next[index].level,
				)
					? previous
					: next,
			);
			intersection?.disconnect();
			intersection?.observe(body);
			for (const element of elements) intersection?.observe(element);
			resolveHash();
			updatePosition();
		};

		const mutation = new MutationObserver(collectHeadings);
		mutation.observe(body, {
			childList: true,
			subtree: true,
			characterData: true,
			attributes: true,
			attributeFilter: ["id"],
		});
		const resize =
			typeof ResizeObserver === "undefined"
				? null
				: new ResizeObserver(schedulePositionUpdate);
		resize?.observe(body);
		collectHeadings();
		// rAF-throttled scroll updates also handle jumps that skip observer boundaries.
		window.addEventListener("scroll", schedulePositionUpdate, {
			passive: true,
		});
		window.addEventListener("resize", schedulePositionUpdate);
		window.addEventListener("hashchange", resolveHash);

		return () => {
			mutation.disconnect();
			intersection?.disconnect();
			resize?.disconnect();
			if (frame !== null) window.cancelAnimationFrame(frame);
			window.removeEventListener("scroll", schedulePositionUpdate);
			window.removeEventListener("resize", schedulePositionUpdate);
			window.removeEventListener("hashchange", resolveHash);
		};
	}, [bodyRef]);

	return { headings, activeId, isReading };
}
