import argon from "argon2";
import * as userRepository from "~/server/database/repositories/user";
import * as authRepository from "~/server/database/repositories/auth";
import * as authService from "~/server/services/auth";
import type { HttpRequest } from "~/types/http";
import { HttpCode } from "~/types/http";
import type { ICreateUser } from "~/types/user";
import { error } from "~/server/services/http";
import { NotFoundError, UniqueConstraintError } from "~/types/error";

// Authentication
export async function createUserAccount(event: HttpRequest, payload: ICreateUser) {
  try {
    const user = await userRepository.create(payload);

    const { token, userUid } = await authRepository.create({
      userUid: user.uid,
    });
    authService.setCookies(event, {
      token,
      userUid,
    });

    event.node.res.statusCode = HttpCode.Created;
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
export async function loginUser(event: HttpRequest, payload: {
  username: string;
  password: string;
}) {
  try {
    const user = await userRepository.getBackByUsername(payload.username);

    if (!await argon.verify(user.password, payload.password))
      return error(event, {
        code: HttpCode.Unauthorized,
        message: "Wrong credentials used! Try again.",
      });

    const { token, userUid } = await authRepository.create({
      userUid: user.uid,
    });
    authService.setCookies(event, {
      token,
      userUid,
    });

    return await userRepository.get(user.uid);
  }
  catch (e) {
    if (e instanceof NotFoundError)
      return error(event, {
        code: HttpCode.NotFound,
        message: `"${payload.username}" does not belong to any user!`,
      });

    return error(event, {
      message: JSON.stringify(e),
    });
  }
}

export async function revokeSession(event: HttpRequest) {
  const { token, userUid } = authService.getCookies(event) as { token: string; userUid: string };

  try {
    await authRepository.revoke(token, userUid);
    return null;
  }
  catch (e) {
    if (e instanceof NotFoundError)
      return error(event, {
        code: HttpCode.NotFound,
        message: "Session not found!",
      });

    return error(event, {
      message: JSON.stringify(e),
    });
  }
}
// Some other user related stuff
