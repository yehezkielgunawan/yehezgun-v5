import GeneralWrapper from "@/components/GeneralWrapper";
import TILWrapper from "@/components/TILWrapper";
import { allTILNotes } from "@/services/til-notes";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Today I Learned",
	description: "A quick collection of things I learn on a daily basis.",
};
const TILPage = () => {
	return (
		<GeneralWrapper>
			<section>
				<h1>Today I Learned</h1>
				<p>A Quick Notes From What I've Figured Out.</p>
			</section>
			<section className="mt-12">
				<TILWrapper TILNoteList={allTILNotes} />
			</section>
		</GeneralWrapper>
	);
};

export default TILPage;
