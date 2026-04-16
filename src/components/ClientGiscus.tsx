"use client";
import Giscus from "@giscus/react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { categoryId, repoId, repoName } from "@/constants/baseConst";

const ClientGiscus = () => {
	const isClient = useSyncExternalStore(
		() => () => {},
		() => true,
		() => false,
	);
	const { theme } = useTheme();

	if (!isClient) return null;

	return (
		<section className="mt-12">
			<Giscus
				repo={repoName}
				repoId={repoId}
				category="General"
				categoryId={categoryId}
				mapping="pathname"
				strict="0"
				reactionsEnabled="1"
				emitMetadata="0"
				inputPosition="bottom"
				theme={theme === "dim" ? "dark" : "light"}
				lang="en"
			/>
		</section>
	);
};

export default ClientGiscus;
