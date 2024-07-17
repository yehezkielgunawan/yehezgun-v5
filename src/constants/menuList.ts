import { FaStickyNote } from "react-icons/fa";
import { IoHomeSharp, IoRocket, IoPencil, IoPerson } from "react-icons/io5";

export const menuList = [
	{
		icon: IoHomeSharp,
		title: "Home",
		url: "/",
	},
	{
		icon: IoRocket,
		title: "Projects",
		url: "/projects",
	},
	{
		icon: IoPencil,
		title: "Blog",
		url: "/blog",
	},
	{
		icon: FaStickyNote,
		title: "TIL",
		url: "/til",
	},
	{
		icon: IoPerson,
		title: "About",
		url: "/about",
	},
];
