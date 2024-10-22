import { Header } from "@/components/header";
import { Tabs } from "@/components/tabs";

export default async function OrgLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="pt-6">
			<div>
				<Header />
				<Tabs />
			</div>
			<main className="mx-auto w-full max-w-[1200px] px-4">{children}</main>
		</div>
	);
}