import type { IEmailTemplate } from "~/types/email";

export default (username: string): IEmailTemplate => ({
  subject: `Hey ${username} 🎉`,
  text: "Welcome on My Nuxt Application! Your account has been successfully created and is automatically verified, you can now access to the app.",
});
