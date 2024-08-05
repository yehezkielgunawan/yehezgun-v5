import ExperienceCard from "@/components/ExperienceCard";
import GeneralWrapper from "@/components/GeneralWrapper";
import { codingChallengeAccounts, socialMedias } from "@/constants/socialMedia";
import { experienceList } from "@/services/experiences";
import { metadataContent } from "@/services/metadata";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = metadataContent({
	title: "About",
	description: "A little bit about me.",
	slug: "about",
});

const About = () => {
	return (
		<GeneralWrapper>
			<h1>✋Hello There!</h1>
			<section className="mt-8 flex flex-wrap-reverse justify-between gap-4 md:flex-nowrap">
				<p>
					You can call me Yehez. Mostly working as a Frontend Engineer using
					React and its ecosystem. To sharpen my understanding of something, I
					usually write about it through my blog or notes.
					<br /> <br />
					Besides the programming stuff, I also like to watch some animes, read
					mangas, and go to some local cosplay or Japanese Culture events on the
					weekend😅. I currently using my Sony A6000 as my main camera to do
					some potrait photography.
				</p>

				<Image
					src="/yehez-pic.png"
					width={500}
					height={300}
					alt="profile-pic"
					className="h-full max-w-full rounded-lg md:max-w-sm"
				/>
			</section>

			<section className="mt-4 flex flex-wrap items-center gap-4 md:mt-0 md:justify-between">
				<div className="flex items-center gap-4">
					{socialMedias.map((socialMedia) => {
						const Icon = socialMedia.icon;
						return (
							<Link
								key={socialMedia.name}
								href={socialMedia.url}
								data-tip={socialMedia.name}
								className="tooltip"
								target="_blank"
								data-umami-event={`Click Social Media: ${socialMedia.name}`}
							>
								<Icon size={24} className="aspect-square" />
							</Link>
						);
					})}
				</div>
				<div className="flex items-center gap-4">
					{codingChallengeAccounts.map((codingChallenge) => {
						const Icon = codingChallenge.icon;
						return (
							<Link
								key={codingChallenge.name}
								href={codingChallenge.url}
								data-tip={codingChallenge.name}
								className="tooltip"
								target="_blank"
							>
								<Icon size={24} className="aspect-square" />
							</Link>
						);
					})}
				</div>
			</section>
			<hr className="mt-2" />
			<section className="mt-4">
				<h2>Work Experiences</h2>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					{experienceList
						.sort(
							// sort based on the start date
							(a, b) =>
								new Date(b.startDate).getTime() -
								new Date(a.startDate).getTime(),
						)
						.map((experience) => (
							<ExperienceCard
								key={experience.company}
								company={experience.company}
								role={experience.role}
								startDate={experience.startDate}
								endDate={experience.endDate}
							/>
						))}
				</div>
			</section>
		</GeneralWrapper>
	);
};

export default About;
