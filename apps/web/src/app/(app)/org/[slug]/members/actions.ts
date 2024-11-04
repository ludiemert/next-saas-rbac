"use server";

import { getCurrentOrg } from "@/auth/auth";
import { removeMember } from "@/http/remove-member";
import { updateMember } from "@/http/update-member";
import type { Role } from "@saas/auth";
import { revalidateTag } from "next/cache";

export async function removeMemberAction(memberId: string) {
	const currentOrg = getCurrentOrg();

	await removeMember({
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		org: currentOrg!,
		memberId,
	});

	revalidateTag(`${currentOrg}/members`);
}

export async function updateMemberAction(memberId: string, role: Role) {
	const currentOrg = getCurrentOrg();

	await updateMember({
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		org: currentOrg!,
		memberId,
		role,
	});

	revalidateTag(`${currentOrg}/members`);
}
