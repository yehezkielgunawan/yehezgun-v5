"use client";
import { useState } from "react";
import BlogCard from "./BlogCard";
import { blogCategories } from "@/services/blogs";
import clsx from "clsx";

type BlogWrapperProps = {
	blogList: {
		slug: string;
		coverImg: string;
		date: string;
		category: string;
		title: string;
	}[];
};

const BlogWrapper = ({ blogList }: BlogWrapperProps) => {
	const [searchKeyword, setSearchKeyword] = useState<string>("");
	const [selectedCategory, setSelectedCategory] = useState<string>("");
	const categoryList = blogCategories();

	const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchKeyword(e.target.value);
	};

	const handleChangeCategory = (category: string) => {
		setSelectedCategory(category === selectedCategory ? "" : category);
	};

	return (
		<>
			<input
				type="text"
				placeholder="Search Blog..."
				className="input input-bordered w-full rounded-lg border-2"
				onChange={handleChangeSearch}
			/>
			<div className="mt-4 flex items-center gap-4">
				<h4 className="m-0">Category: </h4>
				{categoryList.map((category) => (
					<button
						type="button"
						key={category}
						onClick={() => handleChangeCategory(category)}
						className={clsx(
							"btn btn-sm rounded-lg",
							selectedCategory === category ? "btn-primary" : "btn-neutral",
						)}
					>
						{category}
					</button>
				))}
			</div>
			<div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
				{blogList
					.filter((blog) =>
						blog.title.toLowerCase().includes(searchKeyword.toLowerCase()),
					)
					.filter((blog) =>
						selectedCategory ? blog.category === selectedCategory : true,
					)
					.sort(
						(a, b) =>
							(new Date(b.date) as unknown as number) -
							(new Date(a.date) as unknown as number),
					)
					.map((blog) => (
						<BlogCard
							key={blog.slug}
							slug={blog.slug}
							coverImg={blog.coverImg}
							date={blog.date}
							category={blog.category}
							title={blog.title}
						/>
					))}
			</div>
		</>
	);
};

export default BlogWrapper;
