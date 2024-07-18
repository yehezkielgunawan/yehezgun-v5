import GeneralWrapper from "@/components/GeneralWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "About",
	description: "A little bit about me.",
};

const About = () => {
	return (
		<GeneralWrapper>
			<h1>About</h1>
			<p>Here I will share some information about myself.</p>
		</GeneralWrapper>
	);
};

export default About;
