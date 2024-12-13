import { whoAmI } from "~/server/services/user";

export default defineEventHandler(async event =>
  await whoAmI(event));
