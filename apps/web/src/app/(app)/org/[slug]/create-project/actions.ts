import { z } from "zod";
import { HTTPError } from "ky";
import { createProject } from "@/http/create-project";
//import { getCurrentOrg } from "@/auth/auth";


const ProjectSchema = z
	.object({
		name: z
			.string()
			.min(4, { message: "Please include at least 4 characters." }),
		description: z.string()

  })

export async function createProjectAction(data: FormData) {
	const result = ProjectSchema.safeParse(Object.fromEntries(data));

	if (!result.success) {
		const errors = result.error.flatten().fieldErrors;
		return { success: false, message: null, errors, error: null };
	}

	const { name, description } = result.data;

	try {
  	await createProject({
      org: getCurrentOrg()!, //esta dando um erro qdo carrego a pag apos o import //import { getCurrentOrg } from "@/auth/auth";

			name,
			description
	
		}); 
  
 
	} catch (err) {
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

   // Retorna sucesso ao final da operação bem-sucedida
   return {
    success: true,
    message: "Account created successfully!",
    errors: null,
    error: null,
  };
}
