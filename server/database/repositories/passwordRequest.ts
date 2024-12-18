import type { IPasswordRequest } from "~/types/user";
import { NotFoundError } from "~/types/error";
import prisma from "~/server/database";

const passwordResetDuration = 15 * 60;

export async function isValid(uid: string, userUid: string): Promise<boolean> {
  return !!await prisma.passwordReset.findUnique({
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
  return !!await prisma.passwordReset.findFirst({
    where: {
      userUid,
      expiresAt: {
        gt: new Date(),
      },
      usedAt: null,
    },
  });
}

export async function create(userUid: string, expiresIn?: number): Promise<IPasswordRequest> {
  return await prisma.passwordReset.create({
    data: {
      userUid,
      expiresAt: new Date(Date.now() + ((expiresIn ?? passwordResetDuration) * 1000)),
    },
  }) as IPasswordRequest;
}
export async function apply(uid: string, userUid: string): Promise<IPasswordRequest> {
  const verification = await prisma.passwordReset.update({
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
  return verification as IPasswordRequest;
}

export async function prune(): Promise<number> {
  const { count } = await prisma.passwordReset.deleteMany({
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
