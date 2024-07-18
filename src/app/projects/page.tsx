import GeneralWrapper from "@/components/GeneralWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Projects",
	description: "Here I will share some of the projects I have worked on.",
};

const ProjectPage = () => {
	return (
		<GeneralWrapper>
			<h1>Projects</h1>
			<p>Here I will share some of the projects I have worked on.</p>
		</GeneralWrapper>
	);
};

export default ProjectPage;
