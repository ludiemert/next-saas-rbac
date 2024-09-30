import { getMembership } from "@/http/get-membership";
import { getProfile } from "@/http/get-profile";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

//funcoes de autenticacao

export function isAuthenticated() {
	return !!cookies().get("token")?.value;
}

export function getCurrentOrg() {
	return cookies().get("org")?.value ?? null;
}

export async function getCurrentMembership() {
	const org = getCurrentOrg();

	if (!org) {
		return null;
	}

	const { membership } = await getMembership(org);
	return membership;
}

//busca os dados do usuarios logados  e trazer as permissoes desse usuario
export async function ability() {}

export async function auth() {
	const token = cookies().get("token")?.value;

	if (!token) {
		redirect("/auth/sign-in");
	}

	try {
		const { user } = await getProfile();

		return { user };
	} catch {}
	redirect("/api/auth/sign-out");
}
