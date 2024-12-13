import { protectedRoute } from "~/server/services/routing";

export default defineEventHandler(async event =>
  await protectedRoute(event, async user => user, {
    authenticated: true,
    verified: false,
  }));
