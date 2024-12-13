import prisma from "~/server/database";
import type { IAuthSession, ICreateAuthSession } from "~/types/auth";
import { NotFoundError } from "~/types/error";

const defaultExpiration = 60 * 60;

export async function create(payload: ICreateAuthSession): Promise<IAuthSession> {
  return prisma.authSession.create({
    data: {
      userUid: payload.userUid,
      expiresAt: new Date(Date.now() + ((payload.expiresIn ?? defaultExpiration) * 1000)),
    },
  });
}

export async function get(token: string, userUid: string): Promise<IAuthSession> {
  const session = await prisma.authSession.findUnique({
    where: {
      token_userUid: {
        token,
        userUid,
      },
      expiresAt: {
        gt: new Date(),
      },
    },
  });
  if (!session)
    throw new NotFoundError("authSession");
  return session;
}
export async function isValid(token: string, userUid: string): Promise<boolean> {
  try {
    return !!await get(token, userUid);
  }
  catch (e) {
    console.error(e);
    return false;
  }
}
