import GeneralWrapper from "@/components/GeneralWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Blog",
	description: "Here I will share some of the things I learn on a daily basis.",
};

const BlogPage = () => {
	return (
		<GeneralWrapper>
			<h1>Blog</h1>
			<p>Here I will share some of the things I learn on a daily basis.</p>
		</GeneralWrapper>
	);
};

export default BlogPage;
