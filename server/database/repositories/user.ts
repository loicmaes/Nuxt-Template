import argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/binary";
import type { IBackUser, ICreateUser, IUser } from "~/types/user";
import prisma from "~/server/database";
import { UniqueConstraintError } from "~/types/error";

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
    if (!(e instanceof PrismaClientKnownRequestError))
      throw e;

    switch (e.code) {
      case "P2002":
        throw new UniqueConstraintError();
      default:
        throw e;
    }
  }
}

export async function get(uid: string): Promise<IUser> {
  const user = {
    ...await prisma.user.findUnique({
      where: {
        uid,
      },
    }),
  } as Partial<IBackUser>;
  delete user.password;
  return user as IUser;
}
export async function getByUsername(username: string): Promise<IUser> {
  const user = {
    ...await prisma.user.findUnique({
      where: {
        username,
      },
    }),
  } as Partial<IBackUser>;
  delete user.password;
  return user as IUser;
}
