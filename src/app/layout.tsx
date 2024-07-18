import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MobileBottomNav from "@/components/MobileBottomNav";
import { ThemeProvider } from "@/context/ThemeProvider";

const inter = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Yehezkiel Gunawan",
	description: "This is my online portfolio website.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/yehez-icon.svg" sizes="any" />
			</head>
			<body className={`min-h-screen antialiased ${inter.className}`}>
				<ThemeProvider
					defaultTheme="system"
					enableSystem
					themes={["nord", "dim"]}
				>
					<Header />
					{children}
					<MobileBottomNav />
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
