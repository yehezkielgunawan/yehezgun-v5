"use client";

import { badgeColor } from "@/constants/badgeColor";
import { formatDate } from "@/services/blogs";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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

	const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchKeyword(e.target.value);
	};

	return (
		<>
			<input
				type="text"
				placeholder="Search Blog..."
				className="input input-bordered w-full rounded-lg border-2"
				onChange={onChangeSearch}
			/>
			<div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
				{blogList
					.filter((blog) =>
						blog.title.toLowerCase().includes(searchKeyword.toLowerCase()),
					)
					.sort(
						(a, b) =>
							(new Date(b.date) as unknown as number) -
							(new Date(a.date) as unknown as number),
					)
					.map((blog) => (
						<Link
							key={blog.slug}
							href={`/blog/${blog.slug}`}
							className="group hover:-translate-y-0.5 bg-base-200 no-underline transition duration-300 hover:underline hover:shadow-md dark:hover:shadow-neutral-content"
						>
							<div className="rounded-lg border border-base-content">
								<Image
									alt="blog-cover"
									src={blog.coverImg}
									width={360}
									height={240}
									priority={true}
									className="m-0 aspect-video w-full rounded-lg object-cover"
								/>
								<div className="p-2">
									<div className="flex items-center gap-2">
										<h5>{formatDate(blog.date)}</h5>
										<h5 className={clsx("badge", badgeColor[blog.category])}>
											{blog.category}
										</h5>
									</div>
									<h4 className="m-0 mt-2">{blog.title}</h4>
								</div>
							</div>
						</Link>
					))}
			</div>
		</>
	);
};

export default BlogWrapper;
