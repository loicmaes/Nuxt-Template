import { loginUser } from "~/server/services/user";

export default defineEventHandler(async event =>
  await loginUser(event, await readBody<{ username: string; password: string }>(event)));
