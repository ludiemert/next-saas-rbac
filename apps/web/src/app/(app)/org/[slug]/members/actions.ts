"use server"; // Esta linha faz com que o código seja executado no servidor

import { getCurrentOrg } from "@/auth/auth";
import { removeMember } from "@/http/remove-member";
import { revokeInvite } from "@/http/revoke-invite";
import { updateMember } from "@/http/update-member";
import { roleSchema, type Role } from "@saas/auth";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { HTTPError } from "ky";
import { createProject } from "@/http/create-project";
import { createInvite } from "@/http/create-invite";

// Esquema de validação Zod para os dados do convite
const inviteSchema = z.object({
	email: z.string().email({ message: "Invalid e-mail address..." }),
	role: roleSchema,
});

export async function createInviteAction(data: FormData, p0: null) {
	const currentOrg = getCurrentOrg();

	// Verificar se a organização atual está disponível
	if (!currentOrg) {
		return {
			success: false,
			message: "Organization not found.",
			errors: null,
			error: "Missing organization.",
		};
	}

	// Validação dos dados com Zod
	const result = inviteSchema.safeParse(Object.fromEntries(data));

	if (!result.success) {
		const errors = result.error.flatten().fieldErrors;
		return { success: false, message: null, errors, error: null };
	}

	const { email, role } = result.data;

	try {
		await createInvite({
			org: currentOrg,
			email,
			role,
		});

		revalidateTag(`${currentOrg}/invites`);
	} catch (err) {
		if (err instanceof HTTPError) {
			try {
				const { message } = await err.response.json();
				return { success: false, message, errors: null, error: null };
			} catch {
				return {
					success: false,
					message: "An error occurred.",
					errors: null,
					error: null,
				};
			}
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
		message: "Successfully created the invite 🤓🥳!",
		errors: null,
		error: null,
	};
}

export async function removeMemberAction(memberId: string) {
	const currentOrg = getCurrentOrg();

	if (!currentOrg) {
		console.error("Organization not found.");
		return;
	}

	await removeMember({
		org: currentOrg,
		memberId,
	});

	revalidateTag(`${currentOrg}/members`);
}

export async function updateMemberAction(memberId: string, role: Role) {
	const currentOrg = getCurrentOrg();

	if (!currentOrg) {
		console.error("Organization not found.");
		return;
	}

	await updateMember({
		org: currentOrg,
		memberId,
		role,
	});

	revalidateTag(`${currentOrg}/members`);
}

export async function revokeInviteAction(inviteId: string) {
	const currentOrg = getCurrentOrg();

	if (!currentOrg) {
		console.error("Organization not found.");
		return;
	}

	await revokeInvite({
		org: currentOrg,
		inviteId,
	});

	revalidateTag(`${currentOrg}/invites`);
}
