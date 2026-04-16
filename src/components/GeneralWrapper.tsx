import type React from "react";
import Footer from "./Footer";
import Header from "./Header";
import MobileBottomNav from "./MobileBottomNav";

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
