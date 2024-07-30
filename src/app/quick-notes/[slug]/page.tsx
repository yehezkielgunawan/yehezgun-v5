import { CustomTheme } from "@/components/CustomTheme";
import GeneralWrapper from "@/components/GeneralWrapper";
import { getQuickNoteBySlug } from "@/services/quick-notes";

import { MDXContent } from "@content-collections/mdx/react";
import Link from "next/link";
import { BiChevronLeft } from "react-icons/bi";

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
				href="/til"
				className="btn btn-neutral mt-8 w-full flex-items-center rounded-lg"
			>
				<BiChevronLeft size={24} />
				Back to TIL Page
			</Link>
		</GeneralWrapper>
	);
};

export default SingleNotePage;
