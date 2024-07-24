import Image from "next/image";
import type {
	AnchorHTMLAttributes,
	DetailedHTMLProps,
	ImgHTMLAttributes,
} from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const CustomTheme = {
	a: ({
		href,
		children,
	}: DetailedHTMLProps<
		AnchorHTMLAttributes<HTMLAnchorElement>,
		HTMLAnchorElement
	>) => (
		<a
			href={href}
			className="link hover:decoration-dashed hover:underline-offset-2"
			target={String(href).startsWith("http") ? "_blank" : "_self"}
			rel="noreferrer"
		>
			{children}
		</a>
	),
	img: ({
		src,
		alt,
	}: DetailedHTMLProps<
		ImgHTMLAttributes<HTMLImageElement>,
		HTMLImageElement
	>) => (
		<Image
			src={src as string}
			alt={alt as string}
			width={500}
			height={300}
			className="m-0 aspect-video h-auto w-full rounded-lg object-contain"
		/>
	),
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	code: (props: any) => {
		const childrenValue = String(props.children).replace(/\n$/, "");
		const language = props.className?.replace(/language-/, "");

		if (!language) {
			return <code>{props.children}</code>;
		}

		return (
			<SyntaxHighlighter
				language={language}
				style={nord}
				showInlineLineNumbers={false}
				className="rounded-md"
			>
				{childrenValue}
			</SyntaxHighlighter>
		);
	},
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	pre: (props: any) => (
		<pre className="bg-transparent p-0">{props.children}</pre>
	),
};
