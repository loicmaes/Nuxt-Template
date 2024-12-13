import { useMailer } from "#mailer";
import { type IEmail, useDefaultAttachments, useDefaultSubject, useDefaultTo } from "~/types/email";

const transporter = () => {
  const config = useRuntimeConfig();
  return useMailer().customTransporter({
    auth: {
      user: config.mailerUser,
      pass: config.mailerPass,
    },
    host: config.mailerHost,
    port: Number(config.mailerPort as string),
    secure: true,
  });
};
export async function sendMail(email: IEmail) {
  const config = useRuntimeConfig();
  return useMailer().sendMail({
    transporter: transporter(),
    requestId: "test-id",
    options: {
      fromEmail: config.mailerFromAddress,
      fromName: config.mailerFromName,
      to: email.to ?? email.template.to ?? useDefaultTo(),
      subject: email.subject ?? email.template.subject ?? useDefaultSubject(),
      html: email.template.html ?? "",
      text: email.template.text,
      attachments: email.attachments ?? email.template.attachments ?? useDefaultAttachments(),
    },
  });
}
