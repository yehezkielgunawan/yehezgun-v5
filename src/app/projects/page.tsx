import GeneralWrapper from "@/components/GeneralWrapper";
import ProjectCard from "@/components/ProjectCard";
import { metadataContent } from "@/services/metadata";
import { featuredProjects, nonFeaturedProjects } from "@/services/projects";
import type { Metadata } from "next";

export const metadata: Metadata = metadataContent({
	title: "Projects",
	description: "A showcase of some of the projects I have worked on.",
	slug: "projects",
});

const ProjectPage = () => {
	return (
		<GeneralWrapper>
			<section>
				<h1>Projects</h1>
				<p>Here I will share some of the projects I have worked on.</p>
			</section>
			<section className="mt-12">
				<h2>Featured Projects</h2>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					{featuredProjects
						.sort(
							(a, b) =>
								(new Date(b.date) as unknown as number) -
								(new Date(a.date) as unknown as number),
						)
						.map((project) => (
							<ProjectCard key={project._meta.filePath} {...project} />
						))}
				</div>
			</section>
			<section className="mt-12">
				<h2>Other Projects</h2>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					{nonFeaturedProjects
						.sort(
							(a, b) =>
								(new Date(b.date) as unknown as number) -
								(new Date(a.date) as unknown as number),
						)
						.map((project) => (
							<ProjectCard key={project._meta.filePath} {...project} />
						))}
				</div>
			</section>
		</GeneralWrapper>
	);
};

export default ProjectPage;
