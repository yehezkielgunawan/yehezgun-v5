import { allBlogs } from "content-collections";
import { compareDatesDescending } from "@/services/formatDate";

export const blogList = allBlogs
	.map((post) => ({
		title: post.title,
		summary: post.summary,
		coverImg: post.coverImg,
		date: post.date,
		category: post.category,
		slug: post._meta.path,
	}))
	.sort((firstBlog, secondBlog) =>
		compareDatesDescending(
			firstBlog.date,
			secondBlog.date,
			firstBlog.slug,
			secondBlog.slug,
		),
	);

export const getBlogBySlug = (slug: string) => {
	return allBlogs.find((blog) => blog._meta.path === slug);
};

export const blogCategories = () => {
	const categories = allBlogs.map((post) => post.category);
	return Array.from(new Set(categories));
};
