/**
 * Shared contact form domain types.
 *
 * Used by the ContactForm (home section) and SendEmailPage (/send-email).
 */

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/** Extended form with honeypot field for the full send-email page. */
export interface ContactFormDataWithHoneypot extends ContactFormData {
  company: string;
}

export type ContactFormStatus = "idle" | "submitting" | "success" | "error";
