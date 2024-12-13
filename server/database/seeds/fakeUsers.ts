import type { PrismaClient } from "@prisma/client";
import { hash } from "argon2";
import type { ICreateUser, IUser } from "~/types/user";

const fakeUsers: (ICreateUser & { uid: string; verifiedAt?: Date })[] = [
  {
    uid: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    username: "hello.world1",
    email: "hello.world1@gmail.com",
    password: "hello__world1",
    verifiedAt: new Date(),
  },
  {
    uid: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
    username: "hello.world2",
    email: "hello.world2@gmail.com",
    password: "hello__world2",
    verifiedAt: new Date(),
  },
];

async function seed(prisma: PrismaClient) {
  for (const usr of fakeUsers) {
    const userExists = !!await prisma.user.findUnique({
      where: {
        uid: usr.uid,
      },
    });
    const user = await prisma.user.upsert({
      where: {
        uid: usr.uid,
      },
      create: {
        ...usr,
        password: await hash(usr.password),
      },
      update: {
        username: usr.username,
        email: usr.email,
        verifiedAt: usr.verifiedAt,
        password: await hash(usr.password),
      },
    }) as IUser;

    console.log(`👋  "${user.username}" ${userExists ? "updated" : "created"}! (${user.uid})`);
  }
}

export default async (prisma: PrismaClient) => {
  console.log("🌱  Seeding users...");
  await seed(prisma);
  console.log("🎄  Users seeded!");
};
