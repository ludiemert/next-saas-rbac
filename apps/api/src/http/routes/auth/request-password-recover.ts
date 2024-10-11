import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

import { prisma } from "src/lib/prisma";
import { z } from "zod";

export async function requestPasswordRecover(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/password/recover",
		{
			schema: {
				tags: ["auth"],
				summary: "Get authenticated user profile",
				body: z.object({
					email: z.string().email(),
				}),
				response: {
					201: z.null(),
				},
			},
		},
		async (request, reply) => {
			const { email } = request.body;

			const userFromEmail = await prisma.user.findUnique({
				where: { email },
			});

			if (!userFromEmail) {
				//we don't want people to know if user really exist
				return reply.status(201).send();
			}

			const { id: code } = await prisma.token.create({
				data: {
					type: "PASSWORD_RECOVER",
					userId: userFromEmail.id,
				},
			});

			//Send e-mail with password recover link

			console.log("Recover password token:", code);

			return reply.status(201).send();
		},
	);
}
