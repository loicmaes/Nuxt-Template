import type { IAccountVerification } from "~/types/user";
import { NotFoundError } from "~/types/error";
import prisma from "~/server/database";

const accountVerificationDuration = 15 * 60;

export async function isValid(uid: string, userUid: string): Promise<boolean> {
  return !!await prisma.accountVerification.findUnique({
    where: {
      uid_userUid: {
        uid,
        userUid,
      },
      expiresAt: {
        gt: new Date(),
      },
      usedAt: null,
    },
  });
}
export async function hasValidSession(userUid: string): Promise<boolean> {
  return !!await prisma.accountVerification.findFirst({
    where: {
      userUid,
      expiresAt: {
        gt: new Date(),
      },
      usedAt: null,
    },
  });
}

export async function create(userUid: string, expiresIn?: number): Promise<IAccountVerification> {
  return await prisma.accountVerification.create({
    data: {
      userUid,
      expiresAt: new Date(Date.now() + ((expiresIn ?? accountVerificationDuration) * 1000)),
    },
  }) as IAccountVerification;
}
export async function verify(uid: string, userUid: string): Promise<IAccountVerification> {
  const verification = await prisma.accountVerification.update({
    where: {
      uid_userUid: {
        uid,
        userUid,
      },
      expiresAt: {
        gt: new Date(),
      },
      usedAt: null,
    },
    data: {
      usedAt: new Date(),
    },
  });
  if (!verification)
    throw new NotFoundError("accountVerification");
  return verification as IAccountVerification;
}

export async function prune(): Promise<number> {
  const { count } = await prisma.accountVerification.deleteMany({
    where: {
      OR: [
        {
          NOT: {
            usedAt: null,
          },
        },
        {
          expiresAt: {
            lte: new Date(),
          },
        },
      ],
    },
  });
  return count;
}
