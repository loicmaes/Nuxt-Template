import { verifyAccount } from "~/server/services/user";

export default defineEventHandler(async event =>
  await verifyAccount(event, await readBody<{ sessionUid: string; userUid: string }>(event)));
