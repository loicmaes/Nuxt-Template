import argon from "argon2";
import type { PrismaClientKnownRequestError } from "@prisma/client/runtime/binary";
import type { IBackUser, ICreateUser, IUser } from "~/types/user";
import prisma from "~/server/database";
import { UniqueConstraintError, NotFoundError } from "~/types/error";

export async function create(payload: ICreateUser): Promise<IUser> {
  try {
    const user = {
      ...await prisma.user.create({
        data: {
          ...payload,
          password: await argon.hash(payload.password),
        },
      }),
    } as Partial<IBackUser>;
    delete user.password;
    return user as IUser;
  }
  catch (e) {
    switch ((e as PrismaClientKnownRequestError).code) {
      case "P2002":
        throw new UniqueConstraintError();
      default:
        throw e;
    }
  }
}

export async function get(uid: string): Promise<IUser> {
  const dbUser = await prisma.user.findUnique({
    where: {
      uid,
    },
  });
  if (!dbUser)
    throw new NotFoundError("user");

  const user = { ...dbUser } as Partial<IBackUser>;
  delete user.password;
  return user as IUser;
}
export async function getByUsername(username: string): Promise<IUser> {
  const user = { ...await getBackByUsername(username) } as Partial<IBackUser>;
  delete user.password;
  return user as IUser;
}
export async function getBackByUsername(username: string): Promise<IBackUser> {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (!user)
    throw new NotFoundError("user");
  return user;
}
