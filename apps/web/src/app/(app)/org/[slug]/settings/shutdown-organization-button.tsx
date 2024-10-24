import { getCurrentOrg } from "@/auth/auth";
import { Button } from "@/components/ui/button";
import { shutdownOrganization } from "@/http/shutdown-organization";
import { XCircle } from "lucide-react";
import { redirect } from "next/navigation";

export function ShutdownOrganizationButton() {
	async function shutdownOrganizationAction() {
		"use server";

		// Chame a função getCurrentOrg para obter o valor
		const currentOrg = getCurrentOrg();

		// Verifique se currentOrg não é null antes de prosseguir
		if (currentOrg) {
			await shutdownOrganization({ org: currentOrg });
			redirect("/");
		} else {
			console.error("Organização não encontrada.");
		}
	}

	return (
		<form action={shutdownOrganizationAction}>
			<Button type="submit" variant="destructive" className="w-56">
				<XCircle className="mr-2 size-4" />
				Shutdown organization 😣
			</Button>
		</form>
	);
}
