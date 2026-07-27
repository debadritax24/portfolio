import nodemailer from "nodemailer";
import { validateEmailEnv } from "./utils/validateEnv";
import { ContactForm, MailOptions } from "./types";
import { getContactNotificationTemplate } from "./templates/contactNotification";
import { getAutoReplyTemplate } from "./templates/autoReply";

// Initialize the transporter lazily so environment variables are validated
// only when the email service is actually used, avoiding build-time crashes.
let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    const { user, pass } = validateEmailEnv();
    transporter = nodemailer.createTransport({
      service: "gmail",
      pool: true,
      auth: {
        user,
        pass,
      },
    });
  }
  return transporter;
}

/**
 * Core generic sendMail function.
 */
export async function sendMail(options: MailOptions): Promise<void> {
  const mailTransporter = getTransporter();
  const { user } = validateEmailEnv();
  
  try {
    await mailTransporter.sendMail({
      from: user,
      ...options,
    });
    console.log(`[Email Service] Email sent successfully to: ${options.to}`);
  } catch (error) {
    console.error(`[Email Service] Failed to send email to: ${options.to}`, error);
    throw new Error("Unable to send email due to an internal error.");
  }
}

/**
 * Sends a notification email to the site owner containing the contact form details.
 */
export async function sendContactNotification(data: ContactForm): Promise<void> {
  const { user } = validateEmailEnv();
  
  await sendMail({
    to: user, // Send to yourself
    subject: `New Contact from ${data.name}: ${data.subject}`,
    html: getContactNotificationTemplate(data),
    replyTo: data.email,
  });
}

/**
 * Sends a professional auto-reply to the person who filled out the contact form.
 */
export async function sendAutoReply(data: ContactForm): Promise<void> {
  await sendMail({
    to: data.email,
    subject: "Thank you for reaching out - Debadrita Goswami",
    html: getAutoReplyTemplate(data.name),
  });
}
