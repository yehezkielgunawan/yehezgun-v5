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
							className="btn rounded-lg bg-base-300 font-bold"
						>
							Projects
						</Link>
						<Link
							href="/about"
							className="btn rounded-lg bg-base-300 font-bold"
						>
							About Me
						</Link>
						<a
							href="/resume"
							className="btn rounded-lg bg-base-300 font-bold"
							target="_blank"
							rel="noreferrer"
						>
							Resume
						</a>
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
							<div key={project.name} className="relative">
								<a
									href={project.url}
									target="_blank"
									className="group"
									rel="noreferrer"
								>
									<figure className="h-52 w-full">
										<Image
											src={project.projectHero}
											width={320}
											height={320}
											alt={project.name}
											className="h-full w-full rounded-lg object-cover blur-none brightness-90 transition duration-300 hover:outline hover:outline-secondary hover:blur-none md:blur-[2px]"
											priority={true}
										/>

										<figcaption className="-translate-x-1/2 absolute bottom-0 left-1/2 w-full text-center font-bold text-base-content">
											{project.name}
										</figcaption>
									</figure>
								</a>
							</div>
						))}
				</div>
			</section>
		</GeneralWrapper>
	);
}
