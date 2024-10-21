import { Header } from "@/components/header";
import { ProjectForm } from "./project-form";
import { ability } from "@/auth/auth";
import { redirect } from "next/navigation";

export default async function CreateProject() {
	// Verificar permissões do usuário
	const permissions = await ability();

	// Redirecionar caso não tenha permissão para criar projeto
	if (permissions?.cannot("create", "Project")) {
		redirect("/");
	}

	return (
		<div className="py-4 space-y-4">
			<Header />
			<main className="mx-auto w-full max-w-[1200px] space-y-4">
				<h1 className="text-2xl font-bold">Create Project😉 😎</h1>

				{/* Renderizar o formulário de criação de projeto */}
				<ProjectForm />
			</main>
		</div>
	);
}
