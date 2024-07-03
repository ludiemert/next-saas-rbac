import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { auth } from "src/http/middlewares/auth";
import { prisma } from "src/lib/prisma";
import { z } from "zod";
import { BadRequestError } from "../_errors/bad-request-error";
import { createSlug } from "src/utils/create-slug";

export async function createOrganization(app: FastifyInstance) {
<<<<<<< HEAD
  app.withTypeProvider<ZodTypeProvider>().register(auth).post('/organizations', {
=======
  app.withTypeProvider<ZodTypeProvider>().register(auth).post('/organization', {
>>>>>>> 2ad20ea1129be1f9076a5115def4f6a3884f008a
    schema: {
      tags: ['organizations'],
      summary: 'Create a new organization',
      security: [{ bearerAuth: [] }],
      body: z.object({
        name: z.string(),
        domain: z.string().nullish(),
        shouldAttachUsersByDomain: z.boolean().optional(),
      }),
      response: {
        201: z.object({
          organizationId: z.string().uuid(),
        })
      }
    },
  },
  async (request, reply) =>{
    const userId = await request.getCurrentUserId()
    const { name, domain, shouldAttachUsersByDomain } = request.body

    if (domain) {
      const organizationByDomain = await prisma.organization.findUnique({
        where: { domain },
      })

      if (organizationByDomain) {
        throw new BadRequestError(
          'Another organization with same domain already exists...'
        )
      }
    }

    const organization = await prisma.organization.create({
      data: {
        name,
        slug: createSlug(name),
        domain,
        shouldAttachUsersByDomain, 
        ownerId: userId,
        members: {
          create: {
            userId,
            role: 'ADMIN',
          },
        },
      },
    })

    return reply.status(201).send({
      organizationId: organization.id,
    })
  },

)
}