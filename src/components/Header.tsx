"use client";
import { IoMoon, IoSunny } from "react-icons/io5";
import { menuList } from "@/constants/menuList";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

const Header = () => {
	const pathname = usePathname();
	const { setTheme } = useTheme();

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
								<label className="swap swap-rotate rounded-lg">
									<input
										type="checkbox"
										className="theme-controller"
										value="dim"
										onChange={(e) =>
											setTheme(e.target.checked ? "dim" : "nord")
										}
									/>

									<IoSunny size={18} className="swap-off" />
									<IoMoon size={18} className="swap-on" />
								</label>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Header;
