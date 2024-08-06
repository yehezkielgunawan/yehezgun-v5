import type { Project } from "content-collections";
import Image from "next/image";
import Link from "next/link";

const FeaturedProjectCard = (project: Project) => {
	return (
		<div key={project.name} className="relative">
			<Link
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
			</Link>
		</div>
	);
};

export default FeaturedProjectCard;
