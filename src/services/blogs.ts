import { allBlogs } from "content-collections";

export const blogList = allBlogs.map((post) => ({
	title: post.title,
	summary: post.summary,
	coverImg: post.coverImg,
	date: post.date,
	category: post.category,
	slug: post._meta.path,
}));

export const getBlogBySlug = (slug: string) => {
	const post = allBlogs.find((blog) => blog._meta.path === slug);
	if (!post) {
		throw new Error(`No post found for slug: ${slug}`);
	}
	return post;
};

export const blogCategories = () => {
	const categories = allBlogs.map((post) => post.category);
	return Array.from(new Set(categories));
};

export const formatDate = (date: string) => {
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "short",
		day: "numeric",
	};
	return new Date(date).toLocaleDateString("en-US", options);
};
