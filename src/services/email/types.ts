export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface MailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}
