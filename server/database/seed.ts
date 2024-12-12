import { PrismaClient } from "@prisma/client";
import seedFakeUsers from "./seeds/fakeUsers";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱  Start seeding...");
  console.log("");

  await seedFakeUsers(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
