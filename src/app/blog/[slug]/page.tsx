import GeneralWrapper from "@/components/GeneralWrapper";
import { getBlogBySlug, getBlogMetadataBySlug } from "@/services/blogs";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { BiChevronLeft } from "react-icons/bi";
import ClientMDXContent from "@/components/ClientMDXContent";
import { formatDate } from "@/services/formatDate";
import { metadataContent } from "@/services/metadata";
import type { Metadata } from "next";
import ShareButtonFlex from "@/components/ShareButtonFlex";
import ClientGiscus from "@/components/ClientGiscus";
import { CustomTheme } from "@/components/CustomTheme";

type DetailBlogProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: DetailBlogProps): Promise<Metadata> {
  const slug = (await params).slug;

  const detailBlogData = getBlogMetadataBySlug(slug);

  return metadataContent({
    title: detailBlogData.title,
    description: detailBlogData.summary,
    slug: `blog/${slug}`,
  });
}

const SingeBlogPage = async ({ params }: DetailBlogProps) => {
  const blogData = getBlogBySlug((await params).slug);
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
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h4 className="m-0">Published Date: {formatDate(blogData.date)}</h4>
            <h5 className={clsx("badge badge-neutral shadow-sm")}>
              {blogData.category}
            </h5>
          </div>
          <ShareButtonFlex title={blogData.title} />
        </div>
      </section>
      <hr className="mt-4" />
      <section className="mt-6">
        <ClientMDXContent
          code={blogData.mdx}
          components={CustomTheme}
          placeholder={<p>Loading content...</p>}
        />
      </section>
      <Link
        href="/blog"
        className="btn btn-neutral mt-8 flex w-full items-center rounded-lg"
      >
        <BiChevronLeft size={24} />
        Back to Blog List Page
      </Link>
      <ClientGiscus />
    </GeneralWrapper>
  );
};

export default SingeBlogPage;
