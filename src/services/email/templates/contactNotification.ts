import { ContactForm } from "../types";

export function getContactNotificationTemplate(data: ContactForm): string {
  const { name, email, subject, message } = data;
  const timestamp = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "long",
  });

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #333; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px; }
        .header { background-color: #f8fafc; padding: 15px; border-radius: 6px; margin-bottom: 20px; border-bottom: 2px solid #e2e8f0; }
        .field { margin-bottom: 10px; }
        .label { font-weight: bold; color: #64748b; }
        .message-box { background-color: #f1f5f9; padding: 15px; border-radius: 6px; white-space: pre-wrap; margin-top: 10px; border-left: 4px solid #3b82f6; }
        .footer { margin-top: 30px; font-size: 12px; color: #94a3b8; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2 style="margin: 0; color: #0f172a;">New Contact Form Submission</h2>
        </div>
        
        <div class="field">
          <span class="label">Name:</span> ${name}
        </div>
        <div class="field">
          <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
        </div>
        <div class="field">
          <span class="label">Subject:</span> ${subject}
        </div>
        <div class="field">
          <span class="label">Date:</span> ${timestamp}
        </div>
        
        <div class="field" style="margin-top: 20px;">
          <span class="label">Message:</span>
          <div class="message-box">${message}</div>
        </div>
        
        <div class="footer">
          This email was generated from your portfolio contact form.
        </div>
      </div>
    </body>
    </html>
  `;
}
