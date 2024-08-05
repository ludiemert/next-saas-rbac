import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { auth } from "src/http/middlewares/auth";
import { prisma } from "src/lib/prisma";
import { z } from "zod";

import { createSlug } from "src/utils/create-slug";
import { getUserPermissions } from "src/utils/get-user-permissions";
import { UnauthorizedError } from "../_errors/unauthorized-error";
import { BadRequestError } from "../_errors/bad-request-error";

export async function getProject(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().register(auth)
  .get(
    '/organizations/:orgSlug/projects/:projectSlug',
     {
    schema: {
      tags: ['projects'],
      summary: 'Get projects details',
      security: [{ bearerAuth: [] }],
      params: z.object({
        orgSlug: z.string(),
        projectSlug: z.string().uuid(),
      }),
      response: {
       200: z.object({
         project: z.object({
          description: z.string(),
          id: z.string().uuid(),
           name: z.string(),
           slug: z.string(),
           avatarUrl: z.string().nullable(),
            organizationId: z.string().uuid(),
           ownerId: z.string().uuid(),
       owner: z.object({
           id: z.string().uuid(),
           name: z.string().nullable(),
           avatarUrl:  z.string().nullable(),
         }),
         }),
       }),
      },
    },
  },
  async (request, reply) => {
    const { orgSlug, projectSlug  } = request.params
    const userId = await request.getCurrentUserId() 
    const { organization, membership } = 
    await request.getUserMembership(orgSlug)

    const { cannot } = getUserPermissions(userId, membership.role)

    if (cannot('get', 'Project')) {
      throw new UnauthorizedError(
        `You're not allowed to see this project...`,
      )
    }

    const project = await prisma.project.findUnique({
      select: {
        id: true,
        name: true,
        description: true,
        slug: true,
        ownerId: true,
        avatarUrl: true,
        organizationId: true,
        owner: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },

        },

      },
      where: {
        slug: projectSlug,
        organizationId: organization.id,
      },
    })

    if (!project) {
      throw new BadRequestError( 'Project not found....')
    }

    return reply.send({ project })


  },
);
}
