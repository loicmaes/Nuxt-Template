import { FetchError } from "ofetch";
import type { ICreateUser, IUser } from "~/types/user";
import type { InternationalizationTool } from "~/types/i18n";

export const useUser = () => useState<IUser | undefined>("user", () => undefined);

export async function registerUser(t: InternationalizationTool, payload: ICreateUser) {
  try {
    const user = await $fetch<IUser>("/api/user/create", {
      method: "POST",
      body: payload,
    });
    useUser().value = user;
    return toasterSuccess(useToastBody(t, "auth.register.toasts.userRegistered", {
      description: {
        username: user.username,
      },
    }));
  }
  catch (e) {
    if (!(e instanceof FetchError))
      return toasterServerError(t);

    switch (e.statusCode) {
      case 409:
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
      case 401: case 404:
        return toasterError(useToastBody(t, "auth.login.toasts.wrongCredentials"));
      default:
        return toasterServerError(t);
    }
  }
}
