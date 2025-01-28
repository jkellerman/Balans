import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import { ThemeProvider } from "next-themes";

import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Balans",
	description: "Personal Finance app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${jakarta.className} h-full bg-background text-foreground antialiased`}>
				<ThemeProvider attribute="class" enableSystem>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
