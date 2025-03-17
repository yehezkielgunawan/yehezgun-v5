"use client";
import { menuList } from "@/constants/menuList";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileBottomNav = () => {
	const pathname = usePathname();
	return (
		// with glassmorphism effect
		<nav className="-translate-x-1/2 fixed bottom-2 left-1/2 flex w-full items-center justify-around">
			<ul className="menu menu-horizontal flex rounded-sm bg-neutral/60 bg-clip-padding backdrop-blur-xs backdrop-filter md:hidden">
				{menuList.map((menu, index) => (
					<li key={`${menu.title}${index}`}>
						<Link
							href={menu.url}
							className={clsx("tooltip", pathname === menu.url && "active")}
							data-tip={menu.title}
						>
							<menu.icon size={20} />
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default MobileBottomNav;
