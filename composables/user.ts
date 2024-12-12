import { FetchError } from "ofetch";
import type { ICreateUser, IUser } from "~/types/user";

export const useUser = () => useState<IUser | undefined>("user", () => undefined);

export async function registerUser(payload: ICreateUser) {
  try {
    useUser().value = await $fetch<IUser>("/api/user/create", {
      method: "POST",
      body: payload,
    });

    // todo: toast user created
  }
  catch (e) {
    if (!(e instanceof FetchError))
      return;

    switch (e.statusCode) {
      case 409:
        break;
      default:
        break;
    }
  }
}
