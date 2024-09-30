//rota que tras o detalhes da membership

import { Role } from "@saas/auth";
import { api } from "./api-client";

interface GetMembershipResponse {
	membership: {
		id: string;
		//	role: "ADMIN" | "MEMBER" | "BILLING";
		role: Role;
		organizationId: string;
		userId: string;
	};
}

export async function getMembership(org: string) {
	const result = await api
		.get(`/organizations/${org}/membership`)
		.json<GetMembershipResponse>();

	// console.log('result', result)

	return result;
}