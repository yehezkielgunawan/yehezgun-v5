import GeneralWrapper from "@/components/GeneralWrapper";
import { getBlogBySlug } from "@/services/blogs";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { BiChevronLeft } from "react-icons/bi";
import { MDXContent } from "@content-collections/mdx/react";
import { CustomTheme } from "@/components/CustomTheme";
import { formatDate } from "@/services/formatDate";

const SingeBlogPage = ({
	params,
}: {
	params: {
		slug: string;
	};
}) => {
	const blogData = getBlogBySlug(params.slug);
	return (
		<GeneralWrapper>
			<section>
				<Image
					alt="cover"
					src={blogData.coverImg}
					width={500}
					height={300}
					className="aspect-video h-auto w-full rounded-lg object-fill"
				/>
				<h1>{blogData.title}</h1>
				<div className="flex items-center gap-4">
					<h4 className="m-0">Published Date: {formatDate(blogData.date)}</h4>
					<h5 className={clsx("badge badge-neutral shadow")}>
						{blogData.category}
					</h5>
				</div>
			</section>
			<hr />
			<section className="mt-6">
				<MDXContent code={blogData.mdx} components={CustomTheme} />
			</section>
			<Link
				href="/blog"
				className="btn btn-neutral mt-8 flex w-full items-center"
			>
				<BiChevronLeft size={24} />
				Back to Blog List Page
			</Link>
		</GeneralWrapper>
	);
};

export default SingeBlogPage;
