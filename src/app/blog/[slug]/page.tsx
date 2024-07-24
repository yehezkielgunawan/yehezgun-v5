import GeneralWrapper from "@/components/GeneralWrapper";
import { badgeColor } from "@/constants/badgeColor";
import { formatDate, getBlogBySlug } from "@/services/blogs";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { BiChevronLeft } from "react-icons/bi";
import { MDXContent } from "@content-collections/mdx/react";

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
					<h5 className={clsx("badge shadow", badgeColor[blogData.category])}>
						{blogData.category}
					</h5>
				</div>
			</section>
			<hr />
			<section className="mt-6">
				<MDXContent
					code={blogData.mdx}
					components={{
						a: ({ href, children }) => (
							<a
								href={href}
								className="link hover:decoration-dashed hover:underline-offset-2"
								target={String(href).startsWith("http") ? "_blank" : "_self"}
								rel="noreferrer"
							>
								{children}
							</a>
						),
						img: ({ src, alt }) => (
							<Image
								src={src as string}
								alt={alt as string}
								width={500}
								height={300}
								className="m-0 aspect-video h-auto w-full rounded-lg object-contain"
							/>
						),
					}}
				/>
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
