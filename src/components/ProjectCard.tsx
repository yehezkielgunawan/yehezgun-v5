"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

type ProjectCardProps = {
	name: string;
	description: string;
	projectIcon: string;
	stacks: string[];
	url: string;
};

const ProjectCard = (props: ProjectCardProps) => {
	const { theme } = useTheme();
	return (
		<Link
			href={props.url}
			target="_blank"
			className="group hover:-translate-y-0.5 no-underline transition duration-300 hover:underline"
			data-umami-event={`Click Project: ${props.name}`}
		>
			<div className="flex h-full flex-col justify-between gap-4 rounded-lg border border-base-content p-2 md:p-4">
				<div className="flex items-center justify-between gap-2">
					<h5 className="font-bold">{props.name}</h5>
					<FaExternalLinkAlt size={12} />
				</div>
				<div className="flex items-center justify-between gap-6">
					<p className="m-0 self-start text-sm">{props.description}</p>
					<Image
						alt="project-icon"
						src={props.projectIcon}
						width={72}
						height={72}
						className="m-0"
						priority={true}
						blurDataURL="/stacks/light/nextjs.svg"
					/>
				</div>
				<div className="flex items-center gap-4">
					{props.stacks.map((icon) => (
						<Image
							key={icon}
							alt={icon}
							src={`/stacks/${theme === "dim" ? "dark" : "light"}/${icon}.svg`}
							width={32}
							height={32}
							className="m-0 aspect-square"
							priority={true}
							blurDataURL="/stacks/light/nextjs.svg"
						/>
					))}
				</div>
			</div>
		</Link>
	);
};

export default ProjectCard;
