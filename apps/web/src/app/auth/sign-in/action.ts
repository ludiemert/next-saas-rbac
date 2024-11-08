"use server";

import { z } from "zod";

import { signInWithPassword } from "@/http/sign-in-with-password";
import { HTTPError } from "ky";
import { cookies } from "next/headers";
import { acceptInvite } from "@/http/accept-invite";

const signInSchema = z.object({
	email: z
		.string()
		.email({ message: "Please, provide a valid e-mail address...🧐🧐🧐" }),
	password: z
		.string()
		.min(1, { message: "Please, provide your password....🤓🤓🤓🤓" }),
});

export async function signInWithEmailAndPassword(data: FormData) {
	const result = signInSchema.safeParse(Object.fromEntries(data));

	// Verifique se o resultado de 'safeParse' é um objeto e tem a estrutura esperada
	if (!result || typeof result !== "object" || !("success" in result)) {
		return {
			success: false,
			message: "Invalid data structure returned by validation.",
			errors: null,
			error: null,
		};
	}

	if (!result.success) {
		const errors = result.error?.flatten()?.fieldErrors || {};
		return { success: false, message: null, errors, error: null };
	}

	const { email, password } = result.data;

	try {
		const { token } = await signInWithPassword({
			email,
			password,
		});

		cookies().set("token", token, {
			path: "/",
			maxAge: 60 * 60 * 24 * 7, // 7 dias
		});

		const inviteId = cookies().get("inviteId")?.value;

		if (inviteId) {
			try {
				await acceptInvite(inviteId);
				cookies().delete("inviteId");
			} catch {}
		}
		return { success: true, message: null, errors: null, error: null }; //add essa linha devido a erro
	} catch (err) {
		if (err instanceof HTTPError) {
			const { message } = await err.response.json();

			return { success: false, message, errors: null, error: null };
		}

		console.error(err);

		return {
			success: false,
			message: "Unexpected error, try again in a few minutes....",
			errors: null,
			error: null,
		};
	}
}
