import GeneralWrapper from "@/components/GeneralWrapper";
import { featuredProjects, nonFeaturedProjects } from "@/services/projects";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

export const metadata: Metadata = {
	title: "Projects",
	description: "Here I will share some of the projects I have worked on.",
};

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
							<Link
								key={project._meta.path}
								href={project.url}
								target="_blank"
								className="group hover:-translate-y-0.5 no-underline transition duration-300 hover:underline"
							>
								<div className="flex h-full flex-col justify-between gap-4 rounded-lg border border-base-content p-2 md:p-4">
									<div className="flex items-center justify-between gap-2">
										<h5 className="font-bold">{project.name}</h5>
										<FaExternalLinkAlt size={12} />
									</div>
									<div className="flex items-center justify-between gap-6">
										<p className="m-0 self-start text-sm">
											{project.description}
										</p>
										<Image
											alt="project-icon"
											src={project.projectIcon}
											width={72}
											height={72}
											className="m-0"
											priority={true}
											blurDataURL="/stacks/light/nextjs.svg"
										/>
									</div>
									<div className="flex items-center gap-4">
										{project.stacks.map((icon) => (
											<Image
												key={icon}
												alt={icon}
												src={`/stacks/light/${icon}.svg`}
												width={32}
												height={32}
												className="m-0"
												priority={true}
												blurDataURL="/stacks/light/nextjs.svg"
											/>
										))}
									</div>
								</div>
							</Link>
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
							<Link
								key={project._meta.path}
								href={project.url}
								target="_blank"
								className="group hover:-translate-y-0.5 no-underline transition duration-300 hover:underline"
							>
								<div className="flex h-full flex-col justify-between gap-4 rounded-lg border border-base-content p-2 md:p-4">
									<div className="flex items-center justify-between gap-2">
										<h5 className="font-bold">{project.name}</h5>
										<FaExternalLinkAlt size={12} />
									</div>
									<div className="flex items-center justify-between gap-6">
										<p className="m-0 self-start text-sm">
											{project.description}
										</p>
										<Image
											alt="project-icon"
											src={project.projectIcon}
											width={72}
											height={72}
											className="m-0"
											priority={true}
											blurDataURL="/stacks/light/nextjs.svg"
										/>
									</div>
									<div className="flex items-center gap-4">
										{project.stacks.map((icon) => (
											<Image
												key={icon}
												alt={icon}
												src={`/stacks/light/${icon}.svg`}
												width={32}
												height={32}
												className="m-0"
												priority={true}
												blurDataURL="/stacks/light/nextjs.svg"
											/>
										))}
									</div>
								</div>
							</Link>
						))}
				</div>
			</section>
		</GeneralWrapper>
	);
};

export default ProjectPage;
