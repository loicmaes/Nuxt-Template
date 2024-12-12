import type { PrismaClient } from "@prisma/client";
import { hash } from "argon2";
import type { ICreateUser, IUser } from "~/types/user";

const fakeUsers: (ICreateUser & { uid: string })[] = [
  {
    uid: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    username: "hello.world1",
    password: "hello__world1",
  },
  {
    uid: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
    username: "hello.world2",
    password: "hello__world2",
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
        uid: usr.uid,
        username: usr.username,
        password: await hash(usr.password),
      },
      update: {
        username: usr.username,
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
