import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BiChevronLeft } from "react-icons/bi";
import ClientMDXContent from "@/components/ClientMDXContent";
import { CustomTheme } from "@/components/CustomTheme";
import GeneralWrapper from "@/components/GeneralWrapper";
import ShareButtonFlex from "@/components/ShareButtonFlex";
import { metadataContent } from "@/services/metadata";
import { getQuickNoteBySlug, quickNotesList } from "@/services/quickNotes";

type DetailQuickNoteProps = {
	params: Promise<{
		slug: string;
	}>;
};

export const dynamicParams = false;

export function generateStaticParams() {
	return quickNotesList.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
	params,
}: DetailQuickNoteProps): Promise<Metadata> {
	const slug = (await params).slug;

	const detailNoteData = getQuickNoteBySlug(slug);
	if (!detailNoteData) notFound();

	return metadataContent({
		title: `Quick Notes: ${detailNoteData.title}`,
		description: detailNoteData.subtitle,
		slug: `quick-notes/${slug}`,
	});
}

const SingleNotePage = async ({ params }: DetailQuickNoteProps) => {
	const noteData = getQuickNoteBySlug((await params).slug);
	if (!noteData) notFound();
	return (
		<GeneralWrapper>
			<section className="flex flex-wrap items-end justify-between gap-4">
				<div>
					<h1>{noteData.title}</h1>
					<h3>{noteData.subtitle}</h3>
				</div>
				<ShareButtonFlex title={noteData.title} />
			</section>

			<hr />

			<section className="mt-8">
				<ClientMDXContent
					code={noteData.mdx}
					components={CustomTheme}
					placeholder={<p>Loading content...</p>}
				/>
			</section>

			<Link
				href="/quick-notes"
				className="btn btn-neutral mt-8 w-full flex-items-center rounded-lg"
			>
				<BiChevronLeft size={24} />
				Back to TIL Page
			</Link>
		</GeneralWrapper>
	);
};

export default SingleNotePage;
