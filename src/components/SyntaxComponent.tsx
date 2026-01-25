"use client";
import clsx from "clsx";
import { useTheme } from "next-themes";
import {
	type DetailedHTMLProps,
	type HTMLAttributes,
	useState,
	useSyncExternalStore,
} from "react";
import { BiCheckCircle } from "react-icons/bi";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
	atomOneLight,
	nord,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";

const SyntaxComponent = ({
	props,
}: {
	props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
}) => {
	const [isCopied, setIsCopied] = useState(false);
	const childrenValue = String(props.children).replace(/\n$/, "");
	const language = props.className?.replace(/language-/, "");
	const { theme } = useTheme();
	const isClient = useSyncExternalStore(
		() => () => {},
		() => true,
		() => false,
	);

	const handleCopyText = () => {
		navigator.clipboard.writeText(childrenValue);
		setIsCopied(true);
		setTimeout(() => {
			setIsCopied(false);
		}, 2000);
	};

	if (isClient) {
		if (!language) return <code>{childrenValue}</code>;
		// check if the parent is pre tag
		return (
			<div className="space-y-0">
				<div className="flex items-center justify-between">
					<p className="badge badge-secondary dark:badge-neutral m-0">
						{language}
					</p>
					<button
						type="button"
						onClick={handleCopyText}
						className={clsx("btn btn-info btn-xs")}
						aria-label={
							isCopied ? "Copied to clipboard" : "Copy code to clipboard"
						}
					>
						{isCopied ? <BiCheckCircle size={16} aria-hidden="true" /> : "Copy"}
					</button>
				</div>
				<SyntaxHighlighter
					language={language}
					style={theme === "dim" ? nord : atomOneLight}
					showInlineLineNumbers={false}
					className="rounded-md"
				>
					{String(childrenValue)}
				</SyntaxHighlighter>
			</div>
		);
	}
	return null;
};

export default SyntaxComponent;
