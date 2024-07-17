import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Projects",
	description: "Here I will share some of the projects I have worked on.",
};

const ProjectPage = () => {
	return (
		<main>
			<article>
				<h1>Projects</h1>
				<p>Here I will share some of the projects I have worked on.</p>
			</article>
		</main>
	);
};

export default ProjectPage;
