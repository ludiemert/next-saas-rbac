"use client"; // Esta linha faz com que o código seja executado no cliente

import { z } from "zod";
import { HTTPError } from "ky";
import { createProject } from "@/http/create-project"; // Mantendo o import correto

// Esquema de validação Zod para os dados do projeto
const ProjectSchema = z.object({
	name: z.string().min(4, { message: "Please include at least 4 characters." }),
	description: z.string(),
});

export async function createProjectAction(data: FormData, org: string | null) {
	// Validação dos dados
	const result = ProjectSchema.safeParse(Object.fromEntries(data));

	if (!result.success) {
		const errors = result.error.flatten().fieldErrors;
		return { success: false, message: null, errors, error: null };
	}

	const { name, description } = result.data;

	// Verificar se a organização foi passada
	if (!org) {
		return {
			success: false,
			message: "Organization not found.",
			errors: null,
			error: "Missing organization.",
		};
	}

	try {
		// Enviar a requisição de criação de projeto
		await createProject({
			org,
			name,
			description,
		});
	} catch (err) {
		// Tratar erros HTTP
		if (err instanceof HTTPError) {
			const { message } = await err.response.json();
			return { success: false, message, errors: null, error: null };
		}

		console.error(err);
		return {
			success: false,
			message: "Unexpected error, try again in a few minutes.",
			errors: null,
			error: null,
		};
	}

	// Retornar sucesso ao final da operação
	return {
		success: true,
		message: "Project created successfully!",
		errors: null,
		error: null,
	};
}
