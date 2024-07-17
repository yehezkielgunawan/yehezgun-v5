import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "About",
	description: "A little bit about me.",
};

const About = () => {
	return (
		<main>
			<article>
				<h1>About</h1>
				<p>Here I will share some information about myself.</p>
			</article>
		</main>
	);
};

export default About;
