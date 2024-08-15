import { compare } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { prisma } from 'src/lib/prisma'
import z from 'zod'
import { BadRequestError } from '../_errors/bad-request-error'

export async function authenticateWithPassword(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions/password',
    {
      schema: {
        tags: ['auth'],
        summary: 'Authenticate with e-mail @ password',
        body: z.object({
          email: z.string().email(),
          password: z.string(),
        }),

        response: {
          201: z.object({
            token: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body
      const userFormEmail = await prisma.user.findUnique({
        where: { email },
      })

      if (!userFormEmail) {
        throw new BadRequestError('Invalid credentials....userFormEmail')
      }

      if (userFormEmail.passwordHash === null) {
        throw new BadRequestError(
          'User does not have a password, use social login..'
        )
      }

      const isPasswordValid = await compare(
        password,
        userFormEmail.passwordHash
      )
      if (!isPasswordValid) {
        throw new BadRequestError('Invalid credentials....isPasswordValid')
      }

      const token = await reply.jwtSign(
        {
          sub: userFormEmail.id,
        },
        {
          sign: {
            expiresIn: '10d',
          },
        }
      )

      return reply.status(201).send({ token })
    }
  )
}
