import argon from "argon2";
import * as userRepository from "~/server/database/repositories/user";
import * as authRepository from "~/server/database/repositories/auth";
import * as accountVerificationRepository from "~/server/database/repositories/accountVerification";
import * as passwordResetRepository from "~/server/database/repositories/passwordRequest";
import * as authService from "~/server/services/auth";
import type { HttpRequest } from "~/types/http";
import { HttpCode } from "~/types/http";
import type { ICreateUser } from "~/types/user";
import { error } from "~/server/services/http";
import { NotFoundError, UniqueConstraintError } from "~/types/error";
import * as emailService from "~/server/services/email";
import useAccountCreated from "~/server/emails/templates/auth/accountCreated";
import useAccountVerified from "~/server/emails/templates/auth/accountVerified";
import useAccountVerificationResent from "~/server/emails/templates/auth/accountVerificationResent";
import usePasswordReset from "~/server/emails/templates/auth/passwordReset";
import usePasswordResetRequestSent from "~/server/emails/templates/auth/passwordResetRequestSent";

// Authentication
export async function createUserAccount(event: HttpRequest, payload: ICreateUser) {
  try {
    const user = await userRepository.create(payload);

    const accountVerification = await accountVerificationRepository.create(user.uid);

    const template = useAccountCreated(user.username, accountVerification.userUid, accountVerification.uid);
    emailService.sendMail({
      to: user.email,
      template,
    }).then().catch(console.error);

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

    if (!user.verifiedAt) {
      if (!await accountVerificationRepository.hasValidSession(user.uid)) {
        const accountVerification = await accountVerificationRepository.create(user.uid);

        const template = useAccountVerificationResent(user.username, accountVerification.userUid, accountVerification.uid);
        emailService.sendMail({
          to: user.email,
          template,
        }).then();
      }

      return error(event, {
        code: HttpCode.Forbidden,
        message: "Your account is not verified!",
      });
    }

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

type UserRequestPayload = {
  userUid: string;
  sessionUid: string;
};
export async function verifyAccount(event: HttpRequest, payload: UserRequestPayload) {
  try {
    if (await userRepository.isVerified(payload.userUid))
      return error(event, {
        code: HttpCode.Conflict,
        message: "User is already verified!",
      });

    if (!await accountVerificationRepository.isValid(payload.sessionUid, payload.userUid))
      return error(event, {
        code: HttpCode.Forbidden,
        message: "This account verification request is no longer valid!",
      });

    await accountVerificationRepository.verify(payload.sessionUid, payload.userUid);
    const user = await userRepository.update(payload.userUid, { verifiedAt: new Date() });

    const template = useAccountVerified(user.username);
    emailService.sendMail({
      to: user.email,
      template,
    }).then();

    event.node.res.statusCode = HttpCode.Accepted;
    return;
  }
  catch (e) {
    if (e instanceof NotFoundError)
      return error(event, {
        code: HttpCode.NotFound,
        message: "User not found!",
      });

    return error(event, {
      message: JSON.stringify(e),
    });
  }
}
export async function requestPasswordReset(event: HttpRequest, email: string) {
  try {
    const user = await userRepository.getByEmail(email);
    const session = await passwordResetRepository.create(user.uid);

    const template = usePasswordResetRequestSent(user.uid, session.uid);
    emailService.sendMail({
      to: user.email,
      template,
    }).then();

    event.node.res.statusCode = HttpCode.Accepted;
    return;
  }
  catch (e) {
    if (e instanceof NotFoundError) {
      event.node.res.statusCode = HttpCode.Accepted;
      return;
    }
    return error(event, {
      message: JSON.stringify(e),
    });
  }
}
export async function resetPassword(event: HttpRequest, payload: UserRequestPayload & { password: string }) {
  try {
    if (!await passwordResetRepository.isValid(payload.sessionUid, payload.userUid))
      return error(event, {
        code: HttpCode.Forbidden,
        message: "This account verification request is no longer valid!",
      });

    await passwordResetRepository.apply(payload.sessionUid, payload.userUid);
    const user = await userRepository.update(payload.userUid, {
      password: await argon.hash(payload.password),
    });

    const template = usePasswordReset(user.username);
    emailService.sendMail({
      to: user.email,
      template,
    }).then();

    event.node.res.statusCode = HttpCode.Ok;
    return;
  }
  catch (e) {
    if (e instanceof NotFoundError)
      return error(event, {
        code: HttpCode.NotFound,
        message: "User not found!",
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

    authService.setCookies(event, {
      token: null,
      userUid: null,
    });

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
