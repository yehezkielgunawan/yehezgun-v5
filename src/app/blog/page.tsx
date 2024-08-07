import BlogWrapper from "@/components/BlogWrapper";
import GeneralWrapper from "@/components/GeneralWrapper";
import { blogList } from "@/services/blogs";
import { metadataContent } from "@/services/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = metadataContent({
	title: "Blog",
	description:
		"Here, I will share some of the things I learn on a daily basis.",
	slug: "blog",
});

const BlogPage = () => {
	return (
		<GeneralWrapper>
			<section>
				<h1>Blog</h1>
				<p>Here, I will share some of the things I learn on a daily basis.</p>
			</section>
			<section className="mt-12">
				<BlogWrapper blogList={blogList} />
			</section>
		</GeneralWrapper>
	);
};

export default BlogPage;
