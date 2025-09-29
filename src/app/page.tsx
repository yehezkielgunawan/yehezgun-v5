import FeaturedProjectCard from "@/components/FeaturedProjectCard";
import GeneralWrapper from "@/components/GeneralWrapper";
import { featuredProjects } from "@/services/projects";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<GeneralWrapper>
			<section className="flex flex-wrap-reverse items-center justify-center gap-12 md:flex-nowrap md:justify-between">
				<div className="space-y-4">
					<h1>Hello! I'm Yehez 🙌</h1>
					<p>
						Mainly work in React & Typescript Ecosystem as a frontend engineer,
						and write to remind myself about things that I discovered before.
					</p>
					<div className="flex flex-wrap items-center gap-4">
						<Link
							href="/projects"
							className="btn link-hover rounded-lg bg-base-300 font-bold"
						>
							Projects
						</Link>
						<Link
							href="/about"
							className="btn link-hover rounded-lg bg-base-300 font-bold"
						>
							About Me
						</Link>
						<Link
							href="/resume"
							className="btn link-hover rounded-lg bg-base-300 font-bold"
							data-umami-event="Click Resume Button"
							target="_blank"
						>
							Resume
						</Link>
					</div>
				</div>
				<Image
					src="/yehez-icon.svg"
					width={240}
					height={240}
					alt="icon"
					priority={true}
					className="rounded-full"
				/>
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
							<FeaturedProjectCard {...project} key={project.name} />
						))}
				</div>
			</section>
		</GeneralWrapper>
	);
}
