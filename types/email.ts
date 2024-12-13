export const useDefaultTo = (): string => useRuntimeConfig().mailerDefaultTo as string;
export const useDefaultSubject = (): string => useRuntimeConfig().mailerDefaultSubject as string;
export const useDefaultAttachments = (): IEmailAttachment[] => [];

export interface IEmail {
  subject?: string;
  to?: string;
  template: IEmailTemplate;
  attachments?: IEmailAttachment[];
}
export interface IEmailTemplate {
  to?: string;
  subject?: string;
  text: string;
  html?: string;
  attachments?: IEmailAttachment[];
}
export interface IEmailAttachment {
  filename: string;
  path: string;
  contentType: string;
}
