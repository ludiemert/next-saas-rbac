import { OrganizationForm } from "./organization-form";
import { Header } from "@/components/header";

export default function CreateOrganization() {
	return (
		<div className="py-4 space-y-4">
			<Header />
			<main className="mx-auto w-full max-w-[1200px]">
				<h1 className="text-2xl font-bold">Create Organization 😎</h1>
				<OrganizationForm />
			</main>
		</div>
	);
}
