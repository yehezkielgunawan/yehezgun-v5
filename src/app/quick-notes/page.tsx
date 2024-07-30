import GeneralWrapper from "@/components/GeneralWrapper";
import QuickNotesWrapper from "@/components/QuickNotesWrapper";
import { quickNotesList } from "@/services/quick-notes";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Today I Learned",
	description: "A quick collection of things I learn on a daily basis.",
};
const QuickNotesPage = () => {
	return (
		<GeneralWrapper>
			<section>
				<h1>Today I Learned</h1>
				<p>A Quick Notes From What I've Figured Out.</p>
			</section>
			<section className="mt-12">
				<QuickNotesWrapper quickNotesList={quickNotesList} />
			</section>
		</GeneralWrapper>
	);
};

export default QuickNotesPage;
