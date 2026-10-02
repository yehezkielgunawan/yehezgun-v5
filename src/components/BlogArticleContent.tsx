"use client";

import { type ReactNode, useRef } from "react";
import BlogTableOfContents from "@/components/BlogTableOfContents";
import useBlogTableOfContents from "@/components/useBlogTableOfContents";

export default function BlogArticleContent({
	children,
}: {
	children: ReactNode;
}) {
	const bodyRef = useRef<HTMLDivElement>(null);
	const navigation = useBlogTableOfContents(bodyRef);

	return (
		<div className="relative mt-6">
			<div ref={bodyRef} className="blog-article-body min-w-0">
				{children}
			</div>
			<BlogTableOfContents {...navigation} />
		</div>
	);
}
