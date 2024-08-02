import { footerMenuList } from "@/constants/footerMenuList";
import Link from "next/link";

const Footer = () => {
	return (
		<footer className="footer footer-center container mx-auto my-12 text-base-content lg:max-w-5xl">
			<hr className="w-full border-[0.5px] border-neutral-content" />
			<nav className="flex flex-wrap items-center gap-4 md:gap-8">
				{footerMenuList.map((menu) => (
					<Link
						key={menu.title}
						href={menu.url}
						target="_blank"
						className="link link-hover font-semibold"
						rel="noreferrer"
					>
						{menu.title}
					</Link>
				))}
			</nav>
			<a
				href="https://yehezgun.com"
				target="_blank"
				className="link link-hover"
				rel="noreferrer"
			>
				© {new Date().getFullYear()} | Yehezgun
			</a>
		</footer>
	);
};

export default Footer;
