import { protectedRoute } from "~/server/services/routing";
import { revokeSession } from "~/server/services/user";

export default defineEventHandler(async event =>
  await protectedRoute(event, async () =>
    await revokeSession(event)));
