import { PrismaClient } from "./src/generated/prisma/client";

const db = new PrismaClient();

const main = async () => {
  const user = await db.user.create({
    data: {
      name: "Steave Clark",
      email: "SC@mail.com",
      password: "12345",
      events: {
        create: {
          title: "Coffee breake",
          description: "just nothing",
          date: new Date(),
        },
      },
    },
    select: {
      id: true,
      name: true,
      events: {
        select: {
          id: true,
          date: true,
        },
      },
    },
  });

  console.log(user);
};

main()
  .then(() => db.$disconnect())
  .catch(async (e) => {
    console.log(e);
    await db.$disconnect();
    process.exit(1);
  });
