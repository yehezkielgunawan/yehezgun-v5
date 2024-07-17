"use client";
import useIsDark from "@/hooks/useIsDark";
import { FaGithub } from "react-icons/fa";
import { IoMoon, IoSunny } from "react-icons/io5";

const Header = () => {
	const { setIsDark } = useIsDark();

	return (
		<header className="bg-base-200">
			<nav className="container mx-auto">
				<div className="navbar px-0">
					<div className="flex-1">
						<a href="/">NextJS 14 Template</a>
					</div>
					<div className="flex-none">
						<ul className="menu menu-horizontal">
							<li>
								<a
									href="https://github.com/yehezkielgunawan/next14-starter"
									target="_blank"
									className="btn btn-ghost btn-sm"
									rel="noreferrer"
								>
									<FaGithub size={20} />
								</a>
							</li>
							<li>
								<label className="swap swap-rotate btn btn-ghost btn-sm">
									<input
										type="checkbox"
										className="theme-controller"
										value="dim"
										onChange={(e) => setIsDark(e.target.checked)}
									/>

									<IoSunny size={20} className="swap-off" />
									<IoMoon size={20} className="swap-on" />
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
