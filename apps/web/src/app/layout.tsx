import type { Metadata } from "next";

import { ThemeProvider } from "next-themes";

import "./globals.css";

export const metadata: Metadata = {
	title: "Project next-saas-rbac App",
	description: "Project Trip - FullStack",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
