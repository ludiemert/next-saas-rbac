import { faker } from "@faker-js/faker";
import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createUser(name: string, email: string) {
    const passwordHash = await hash("123456", 10);
    return await prisma.user.create({
        data: {
            name,
            email,
            avatarUrl: faker.image.avatar(),
            passwordHash,
        },
    });
}

async function createOrganization(name: string, slug: string, ownerId: string) {
    return await prisma.organization.create({
        data: {
            name,
            slug,
            avatarUrl: faker.image.avatar(),
            shouldAttachUsersByDomain: true,
            ownerId,
            projects: {
                createMany: {
                    data: Array.from({ length: 3 }, () => ({
                        name: faker.lorem.words(5),
                        slug: faker.lorem.slug(5),
                        description: faker.lorem.paragraph(),
                        avatarUrl: faker.image.avatar(),
                        ownerId: faker.helpers.arrayElement([ownerId]),
                    })),
                },
            },
            members: {
                createMany: {
                    data: [
                        { userId: ownerId, role: "MEMBER" },
                        { userId: faker.helpers.arrayElement([ownerId]), role: "ADMIN" },
                        { userId: faker.helpers.arrayElement([ownerId]), role: "MEMBER" },
                    ],
                },
            },
        },
    });
}

async function seed() {
    await prisma.organization.deleteMany();
    await prisma.user.deleteMany();

    const users = await Promise.all([
        createUser("Jhon Doe", "jhon@gmail.com"),
        createUser(faker.person.fullName(), faker.internet.email()),
        createUser(faker.person.fullName(), faker.internet.email()),
    ]);

    const userIds = users.map(user => user.id);

    await Promise.all([
        createOrganization("Acme Inc (Member)", "acme-member", userIds[0]),
        createOrganization("Acme Inc (Admin)", "acme-admin", userIds[0]),
        createOrganization("Acme Inc (Billing)", "acme-billing", userIds[0]),
    ]);
}

seed()
    .then(() => {
        console.log("Database seeded 😎 !!!!");
    })
    .catch((error) => {
        console.error("Error seeding database: ", error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
