import { createUserAccount } from "~/server/services/user";
import type { ICreateUser } from "~/types/user";

export default defineEventHandler(async event =>
  await createUserAccount(event, await readBody<ICreateUser>(event)));
