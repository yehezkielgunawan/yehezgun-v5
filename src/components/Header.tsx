"use client";
import { IoMoon, IoSunny } from "react-icons/io5";
import { menuList } from "@/constants/menuList";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Header = () => {
	const pathname = usePathname();
	const { setTheme, theme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<header className="bg-base-200">
			<nav className="container mx-auto">
				<div className="navbar px-0">
					<div className="flex-1">
						<a href="/" className="font-bold">
							yehezgun.com
						</a>
					</div>
					<div className="flex-none">
						<ul className="menu menu-horizontal hidden md:flex">
							{menuList.map((menu, index) => (
								<li key={`${menu.title}${index}`}>
									<a
										href={menu.url}
										className={clsx(
											"tooltip tooltip-bottom",
											pathname === menu.url && "active",
										)}
										data-tip={menu.title}
									>
										<menu.icon size={18} />
									</a>
								</li>
							))}
						</ul>
						<ul className="menu menu-horizontal">
							<li>
								{mounted ? (
									<label className={clsx("swap swap-rotate rounded-lg")}>
										<input
											checked={theme === "dim"}
											type="checkbox"
											className="theme-controller"
											value="dim"
											onChange={(e) =>
												setTheme(e.target.checked ? "dim" : "nord")
											}
										/>

										<IoMoon size={18} className="swap-on" />

										<IoSunny size={18} className="swap-off" />
									</label>
								) : (
									<div className="skeleton h-[34px] w-[50px] md:h-8" />
								)}
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Header;
