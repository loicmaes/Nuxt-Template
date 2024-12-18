import type { IEmailTemplate } from "~/types/email";
import { useFrontPath } from "~/lib/server";

export default (userUid: string, sessionUid: string): IEmailTemplate => ({
  subject: `Security Request 🛡️ Password Reset`,
  text: `You requested a password reset link. ${useFrontPath(`/reset-password/${userUid}/${sessionUid}`)} (expires in 15min). If you're not at the origin of this request, contact the support.`,
});
