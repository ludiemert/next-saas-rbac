import { Header } from "@/components/header";

export default async function Home() {
	return (
		<div className="py-4 space-y-4">
			<Header />
			<main className="mx-auto w-full max-w-[1200px] space-y-4">
				<p>Select an organization.</p>
			</main>
		</div>
	);
}
