import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

import { auth } from "src/http/middlewares/auth";
import { z } from "zod";
import { roleSchema } from "@saas/auth";

export async function getMembership(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.get(
			"/organizations/:slug/membership",
			{
				schema: {
					tags: ["organizations"],
					security: [{ bearerAuth: [] }],
					params: z.object({
						slug: z.string(),
					}),
					response: {
						200: z.object({
							membership: z.object({
								id: z.string().uuid(),
								role: roleSchema,
								userId: z.string().uuid(),
								organizationId: z.string().uuid(),
							}),
						}),
					},
				},
			},
			async (request) => {
				const { slug } = request.params;
				const { membership } = await request.getUserMembership(slug);

				return {
					membership: {
						id: membership.id,
						role: roleSchema.parse(membership.role),
						userId: membership.userId,
						organizationId: membership.organizationId,
					},
				};
			},
		);
}
