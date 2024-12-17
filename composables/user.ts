import { FetchError } from "ofetch";
import type { ICreateUser, IUser } from "~/types/user";
import type { InternationalizationTool } from "~/types/i18n";
import { HttpCode } from "~/types/http";

export const useUser = () => useState<IUser | undefined>("user", () => undefined);

export async function getWhoAmI(t: InternationalizationTool) {
  try {
    const { data } = await useFetch<IUser>("/api/user/whoami", {
      headers: useRequestHeaders(["cookie"]),
    });
    if (!data.value)
      return;
    useUser().value = data.value;
  }
  catch (e) {
    if (!(e instanceof FetchError))
      return toasterServerError(t);

    switch (e.statusCode) {
      case HttpCode.NotFound:
        return toasterError(useToastBody(t, "globals.toasts.sessionExpired"));
      default:
        return toasterServerError(t);
    }
  }
}

export async function registerUser(t: InternationalizationTool, payload: ICreateUser) {
  try {
    const user = await $fetch<IUser>("/api/user/create", {
      method: "POST",
      body: payload,
    });
    return toasterSuccess(useToastBody(t, "auth.register.toasts.userRegistered", {
      description: {
        username: user.username,
      },
    }), false);
  }
  catch (e) {
    if (!(e instanceof FetchError))
      return toasterServerError(t);

    switch (e.statusCode) {
      case HttpCode.Conflict:
        return toasterError(useToastBody(t, "auth.register.toasts.usernameAlreadyUsed", {
          description: {
            username: payload.username,
          },
        }));
      default:
        return toasterServerError(t);
    }
  }
}
export async function loginUser(t: InternationalizationTool, payload: {
  username: string;
  password: string;
}) {
  try {
    const user = await $fetch<IUser>("/api/user/login", {
      method: "POST",
      body: payload,
    });
    useUser().value = user;
    return toasterSuccess(useToastBody(t, "auth.login.toasts.userLoggedIn", {
      title: {
        username: user.username,
      },
    }));
  }
  catch (e) {
    if (!(e instanceof FetchError))
      return toasterServerError(t);

    switch (e.statusCode) {
      case HttpCode.Unauthorized: case HttpCode.NotFound:
        return toasterError(useToastBody(t, "auth.login.toasts.wrongCredentials"));
      case HttpCode.Forbidden:
        return toasterError(useToastBody(t, "auth.login.toasts.notVerified"));
      default:
        return toasterServerError(t);
    }
  }
}
export async function logout(t: InternationalizationTool) {
  try {
    await $fetch("/api/user/session/revoke", {
      method: "POST",
      headers: useRequestHeaders(["cookie"]),
    });
    useUser().value = undefined;
    return true;
  }
  catch (e) {
    if (!(e instanceof FetchError))
      return toasterServerError(t);

    switch (e.statusCode) {
      case HttpCode.NotFound:
        return toasterError(useToastBody(t, "globals.toasts.sessionExpired"));
      default:
        return toasterServerError(t);
    }
  }
}

export async function sendPasswordRequest(t: InternationalizationTool, email: string) {
  try {
    await $fetch("/api/user/password/requestReset", {
      method: "POST",
      body: {
        email,
      },
    });
    return toasterSuccess(useToastBody(t, "auth.resetPassword.request.toasts.emailSent"));
  }
  catch (e) {
    if (!(e instanceof FetchError))
      return toasterServerError(t);
    return toasterServerError(t);
  }
}
export async function sendNewPassword(t: InternationalizationTool, password: string) {
  const { params } = useRoute();
  const userUid = params.user as string;
  const sessionUid = params.session as string;

  try {
    await $fetch("/api/user/password/reset", {
      method: "POST",
      body: {
        userUid,
        sessionUid,
        password,
      },
    });
    return toasterSuccess(useToastBody(t, "auth.resetPassword.newPassword.toasts.passwordReset"));
  }
  catch (e) {
    if (!(e instanceof FetchError))
      return toasterServerError(t);

    switch (e.statusCode) {
      case HttpCode.NotFound:
        return toasterError(useToastBody(t, "auth.resetPassword.newPassword.toasts.sessionNotFound"), true);
      default:
        return toasterServerError(t);
    }
  }
}
