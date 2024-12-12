import * as userRepository from "~/server/database/repositories/user";
import type { HttpRequest } from "~/types/http";
import { HttpCode } from "~/types/http";
import type { ICreateUser } from "~/types/user";
import { error } from "~/server/services/http";
import { UniqueConstraintError } from "~/types/error";

export async function createUserAccount(event: HttpRequest, payload: ICreateUser) {
  try {
    const user = await userRepository.create(payload);
    // todo: create session
    console.log(`👋  "${user.username}" created at ${user.createdAt.toUTCString()}! (${user.uid})`);
    return user;
  }
  catch (e) {
    if (e instanceof UniqueConstraintError)
      return error(event, {
        code: HttpCode.Conflict,
        message: `Username "${payload.username}" already taken!`,
      });

    return error(event, {
      message: JSON.stringify(e),
    });
  }
}
