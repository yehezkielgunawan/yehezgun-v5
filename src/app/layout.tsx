import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeProvider";
import { metadataContent } from "@/services/metadata";
import { umamiId, umamiURL } from "@/constants/baseConst";
import Script from "next/script";

const inter = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = metadataContent({
	title: "Yehezkiel Gunawan",
	description:
		"A personal website by Yehezkiel Gunawan. A showcase about my projects, thoughts, and experiences.",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`min-h-screen antialiased ${inter.className}`}>
				<ThemeProvider
					defaultTheme="system"
					enableSystem
					themes={["nord", "dim"]}
				>
					{children}
				</ThemeProvider>
			</body>
			<Script defer src={umamiURL} data-website-id={umamiId} />
		</html>
	);
}
