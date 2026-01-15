import { CustomTheme } from "@/components/CustomTheme";
import GeneralWrapper from "@/components/GeneralWrapper";
import ShareButtonFlex from "@/components/ShareButtonFlex";
import { metadataContent } from "@/services/metadata";
import { getQuickNoteBySlug } from "@/services/quickNotes";

import ClientMDXContent from "@/components/ClientMDXContent";
import type { Metadata } from "next";
import Link from "next/link";
import { BiChevronLeft } from "react-icons/bi";

type DetailQuickNoteProps = {
	params: Promise<{
		slug: string;
	}>;
};

export async function generateMetadata({
	params,
}: DetailQuickNoteProps): Promise<Metadata> {
	const slug = (await params).slug;

	const detailNoteData = getQuickNoteBySlug(slug);

	return metadataContent({
		title: `Quick Notes: ${detailNoteData.title}`,
		description: detailNoteData.subtitle,
		slug: `quick-notes/${slug}`,
	});
}

const SingleNotePage = async ({
	params,
}: {
	params: Promise<{
		slug: string;
	}>;
}) => {
	const noteData = getQuickNoteBySlug((await params).slug);
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
