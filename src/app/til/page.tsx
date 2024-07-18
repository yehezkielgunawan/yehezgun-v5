import GeneralWrapper from "@/components/GeneralWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Today I Learned",
	description: "A quick collection of things I learn on a daily basis.",
};
const TILPage = () => {
	return (
		<GeneralWrapper>
			<h1>Today I Learned</h1>
			<p>Here I will share some of the things I learn on a daily basis.</p>
		</GeneralWrapper>
	);
};

export default TILPage;
