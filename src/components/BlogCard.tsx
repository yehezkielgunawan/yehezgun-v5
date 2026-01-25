import { formatDate } from "@/services/formatDate";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

type BlogCardProps = {
	slug: string;
	coverImg: string;
	date: string;
	category: string;
	title: string;
};

const BlogCard = (blog: BlogCardProps) => {
	return (
		<Link
			href={`/blog/${blog.slug}`}
			className="group bg-base-200 no-underline transition duration-300 hover:-translate-y-0.5 hover:underline hover:shadow-md dark:hover:shadow-neutral-content"
		>
			<div className="h-full w-full rounded-lg border border-base-content">
				<Image
					alt="blog-cover"
					src={blog.coverImg}
					width={360}
					height={240}
					priority={true}
					className="m-0 aspect-video w-full rounded-t-lg object-cover"
				/>
				<div className="p-2">
					<div className="flex items-center gap-2">
						<h5>{formatDate(blog.date)}</h5>
						<h5 className={clsx("badge badge-accent")}>{blog.category}</h5>
					</div>
					<h4 className="m-0 mt-2">{blog.title}</h4>
				</div>
			</div>
		</Link>
	);
};

export default BlogCard;
