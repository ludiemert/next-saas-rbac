import  { FastifyInstance } from "fastify";
import { fastifyPlugin } from "fastify-plugin";

import { UnauthorizedError } from "../routes/_errors/unauthorized-error";
import { prisma } from "src/lib/prisma";



export const auth = fastifyPlugin(async(app: FastifyInstance) => {
  app.addHook('preHandler', async (request) => {    
    console.log(request.headers)

    request.getCurrentUserId = async () => {
      try {
        const { sub } = await request.jwtVerify<{ sub: string}>()
        return sub
      } catch {
        throw new UnauthorizedError('Invalid auth token')
      }

    }

    request.getUserMembership = async (slug: string) => {
      const userId = await request.getCurrentUserId()

      const member = await prisma.member.findFirst({
        where: {
          userId,
          organization: {
            slug,
          },
        },
        include: {
          organization: true,
        },
      })

      if (!member) {
        throw new UnauthorizedError(`You're not a member of this organization...`)
      }

      const { organization, ...membership } = member

      return {
        organization, 
        membership,
      }
    }
  })
})