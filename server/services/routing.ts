import * as authService from "./auth";
import * as authRepository from "~/server/database/repositories/auth";
import * as userRepository from "~/server/database/repositories/user";
import type { HttpError, HttpRequest } from "~/types/http";
import { error } from "~/server/services/http";
import { HttpCode } from "~/types/http";
import type { IUser } from "~/types/user";

interface ProtectedRouteOptions {
  authenticated: boolean;
  verified: boolean;
}

export async function protectedRoute(event: HttpRequest, callback: (userUid?: IUser) => Promise<unknown>, options: ProtectedRouteOptions = {
  authenticated: true,
  verified: true,
}): Promise<unknown> {
  let user;

  // Check session
  if (options.authenticated) {
    const { user: execUser, error: execError } = await isAuthenticated(event);
    if (execError)
      return error(event, execError);
    user = execUser as IUser;

    if (options.verified && !isVerified(user))
      return error(event, {
        code: HttpCode.Forbidden,
        message: "User is not verified!",
      });
  }

  return callback(user);
}

async function isAuthenticated(event: HttpRequest): Promise<{
  user?: IUser;
  error?: HttpError;
}> {
  const { token, userUid } = authService.getCookies(event);

  if (!token || !userUid)
    return {
      error: {
        code: HttpCode.Unauthorized,
        message: "Session credentials not provided!",
      },
    };

  if (!await authRepository.isValid(token, userUid))
    return {
      error: {
        code: HttpCode.Unauthorized,
        message: "Session expired!",
      },
    };

  return {
    user: await userRepository.get(userUid),
  };
}

function isVerified(user: IUser): boolean {
  return !!user.verifiedAt;
}
