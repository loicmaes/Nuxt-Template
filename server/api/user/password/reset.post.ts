import { resetPassword } from "~/server/services/user";

export default defineEventHandler(async event =>
  await resetPassword(event, await readBody<{ userUid: string; sessionUid: string; password: string }>(event)));
