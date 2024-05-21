import { compare } from "bcryptjs";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "src/lib/prisma";
import z from "zod";


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
      },
    },
    async (request, reply) => {
      const { email,password } = request.body
      const userFormEmail = await prisma.user.findUnique({
        where: { email },
        })

        if (!userFormEmail) {
          return reply.status(400).send({ message: 'Invalid credentials....userFormEmail'})
        }

        if (userFormEmail.passwordHash === null) {
          return reply
          .status(400)
          .send({message: 'User does not have a password, use social login..'})
        }

        const isPasswordValid = await compare(
          password,
          userFormEmail.passwordHash
        )
        if (!isPasswordValid){
          return reply.status(400).send({ message: 'Invalid credentials....isPasswordValid'})
        }

        return 'Logged in'
    },
  )
}