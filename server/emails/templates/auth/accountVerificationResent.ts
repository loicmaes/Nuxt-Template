import type { IEmailTemplate } from "~/types/email";
import { useFrontPath } from "~/lib/server";

export default (username: string, userUid: string, sessionUid: string): IEmailTemplate => ({
  subject: `Hey ${username} 🎉`,
  text: `The previous verification link expired and have not been used in the given time. There is a new verification link to verify your account (valid for 15min): ${useFrontPath(`/verify/${userUid}/${sessionUid}`)}.`,
});
