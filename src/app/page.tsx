import GeneralWrapper from "@/components/GeneralWrapper";
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
		</GeneralWrapper>
	);
}
