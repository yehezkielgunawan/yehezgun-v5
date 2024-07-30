import GeneralWrapper from "@/components/GeneralWrapper";
import QuickNotesWrapper from "@/components/QuickNotesWrapper";
import { metadataContent } from "@/services/metadata";
import { quickNotesList } from "@/services/quickNotes";

import type { Metadata } from "next";

export const metadata: Metadata = metadataContent({
	title: "Quick Notes",
	description: "A quick notes from what I've figured out.",
	slug: "quick-notes",
});

const QuickNotesPage = () => {
	return (
		<GeneralWrapper>
			<section>
				<h1>Quick Notes</h1>
				<p>A Quick Notes From What I've Figured Out.</p>
			</section>
			<section className="mt-12">
				<QuickNotesWrapper quickNotesList={quickNotesList} />
			</section>
		</GeneralWrapper>
	);
};

export default QuickNotesPage;
