import { menuList } from "@/constants/menuList";

const MobileBottomNav = () => {
	return (
		// with glassmorphism effect
		<nav className="-translate-x-1/2 fixed bottom-2 left-1/2 flex w-full items-center justify-around">
			<ul className="menu menu-horizontal flex rounded bg-neutral/60 bg-clip-padding backdrop-blur-sm backdrop-filter md:hidden">
				{menuList.map((menu, index) => (
					<li key={`${menu.title}${index}`}>
						<a href={menu.url} className="tooltip" data-tip={menu.title}>
							<menu.icon size={20} />
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default MobileBottomNav;
