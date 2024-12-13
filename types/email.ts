export const useDefaultTo = (): string => useRuntimeConfig().mailerDefaultTo;
export const useDefaultSubject = (): string => useRuntimeConfig().mailerDefaultSubject;
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
