import type { Metadata } from "next";
import GeneralWrapper from "@/components/GeneralWrapper";
import ProjectCard from "@/components/ProjectCard";
import { metadataContent } from "@/services/metadata";
import { featuredProjects, nonFeaturedProjects } from "@/services/projects";

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
					{featuredProjects.map((project) => (
						<ProjectCard
							key={project._meta.filePath}
							name={project.name}
							description={project.description}
							projectIcon={project.projectIcon}
							stacks={project.stacks}
							url={project.url}
						/>
					))}
				</div>
			</section>
			<section className="mt-12">
				<h2>Other Projects</h2>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					{nonFeaturedProjects.map((project) => (
						<ProjectCard
							key={project._meta.filePath}
							name={project.name}
							description={project.description}
							projectIcon={project.projectIcon}
							stacks={project.stacks}
							url={project.url}
						/>
					))}
				</div>
			</section>
		</GeneralWrapper>
	);
};

export default ProjectPage;
