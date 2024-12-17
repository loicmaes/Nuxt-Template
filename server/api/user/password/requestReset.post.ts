import { requestPasswordReset } from "~/server/services/user";

export default defineEventHandler(async event =>
  await requestPasswordReset(event, (await readBody<{ email: string }>(event)).email));
