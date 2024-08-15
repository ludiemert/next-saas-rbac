import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { prisma } from 'src/lib/prisma'
import { z } from 'zod'

import { BadRequestError } from '../_errors/bad-request-error'
import { auth } from '@/http/middlewares/auth'

export async function rejectInvite(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().register(auth).post(
    '/invites/:inviteId/reject',
    {
      schema: {
        tags: ['invites'],
        summary: 'Reject an invite',
        params: z.object({
          inviteId: z.string().uuid(),
        }),
        response: {
          204:  z.null(),
        },
      },
    },
    async (request, reply) => {
      const userId = await request.getCurrentUserId()
      const { inviteId } = request.params

      const invite = await prisma.invite.findUnique({
        where: {
          id: inviteId,
        },       
      })

      if (!invite) {
        throw new BadRequestError('Invite not found or expired.....')
      }

      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        }
      })

      if (!user) {
        throw new BadRequestError('User not found....')
      }

      if (invite.email !== user.email) {
        throw new BadRequestError('This invite belongs to another use...')
      }


        await prisma.invite.delete({
          where: {
            id: inviteId,
          },
        })      

      return reply.status(204).send()
    }
  )
}
