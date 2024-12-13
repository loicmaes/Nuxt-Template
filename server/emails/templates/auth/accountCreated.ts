import type { IEmailTemplate } from "~/types/email";
import { useFrontPath } from "~/lib/server";

export default (username: string, userUid: string, sessionUid: string): IEmailTemplate => ({
  subject: `Hey ${username} 🎉`,
  text: `Welcome on My Nuxt Application! Your account has been successfully created! You need to verify your account by following this link (valid for 15min): ${useFrontPath(`/verify/${userUid}/${sessionUid}`)}.`,
});
