import { CustomTheme } from "@/components/CustomTheme";
import GeneralWrapper from "@/components/GeneralWrapper";
import { metadataContent } from "@/services/metadata";
import { getQuickNoteBySlug } from "@/services/quickNotes";

import { MDXContent } from "@content-collections/mdx/react";
import type { Metadata } from "next";
import Link from "next/link";
import { BiChevronLeft } from "react-icons/bi";

type DetailQuickNoteProps = {
	params: {
		slug: string;
	};
};

export async function generateMetadata({
	params,
}: DetailQuickNoteProps): Promise<Metadata> {
	const slug = params.slug;

	const detailNoteData = getQuickNoteBySlug(slug);

	return metadataContent({
		title: `Quick Notes: ${detailNoteData.title}`,
		description: detailNoteData.subtitle,
	});
}

const SingleNotePage = ({
	params,
}: {
	params: {
		slug: string;
	};
}) => {
	const noteData = getQuickNoteBySlug(params.slug);
	return (
		<GeneralWrapper>
			<section>
				<h1>{noteData.title}</h1>
				<h3>{noteData.subtitle}</h3>
			</section>

			<hr />

			<section className="mt-8">
				<MDXContent code={noteData.mdx} components={CustomTheme} />
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
