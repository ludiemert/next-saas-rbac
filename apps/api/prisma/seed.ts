import { faker } from '@faker-js/faker'
import { hash } from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  await prisma.organization.deleteMany()
  await prisma.user.deleteMany()


  const passwordHash = await hash('123456', 1)

  const [user, anotherUser, anotherUser2] = await prisma.user.createMany({
    data:   [
     {
      name: 'Jhon Doe',
      email: 'jhon@gmail.com',
      avatarUrl: 'http://github.com/diego3g.png',
      passwordHash,
    },

    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.image.avatarGitHub(),
      passwordHash,
    },

    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.image.avatarGitHub(),
      passwordHash,
    },
],
  })

  await prisma.organization.create({
    data:{
      name: 'Acme Inc (Admin)',
      domain: 'acme.com',
      slug: 'acme-admin',
      avatarUrl: faker.image.avatarGitHub(),
      shouldAttachUsersByDomain: true,
      owner: user.id,
      projects: {
        createMany: {
          data: [
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.slug(5),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([
                user.id,
                anotherUser.id,
                anotherUser2.id,
              ])
            }
          ]
        }
      }
      members: {
        createMany: {
          data: [
            {
              userId: user.id,
              role: 'ADMIN',

            },
            {
              userId: anotherUser.id,
              role: 'MEMBER',
            },
            {
              userId: anotherUser2.id,
              role: 'MEMBER',
            },
          ],
        },
      },
    },
  })
}

seed().then(() => {
  console.log('Database seeded 😎 !!!!')
})