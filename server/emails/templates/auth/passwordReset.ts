import type { IEmailTemplate } from "~/types/email";

export default (username: string): IEmailTemplate => ({
  subject: `Security Alert 🛡️ Password reset`,
  text: `Hey ${username}, your password has been reset! If you're not the source of this update, contact our support without waiting. Otherwise, ignore this email.`,
});
