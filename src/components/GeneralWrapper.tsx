import type React from "react";
import Header from "./Header";
import MobileBottomNav from "./MobileBottomNav";
import Footer from "./Footer";

const GeneralWrapper = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<>
			<Header />
			<main>
				<article>{children}</article>
			</main>
			<MobileBottomNav />
			<Footer />
		</>
	);
};

export default GeneralWrapper;
