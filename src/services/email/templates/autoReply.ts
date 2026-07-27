export function getAutoReplyTemplate(name: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #333; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #eaeaea; border-radius: 8px; }
        .content { margin-top: 10px; }
        .signature { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eaeaea; }
        .name { font-weight: bold; color: #0f172a; margin-bottom: 2px; }
        .title { color: #64748b; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="content">
          <p>Hello ${name},</p>
          <p>Thank you for reaching out.</p>
          <p>I have received your message and will respond as soon as possible.</p>
        </div>
        
        <div class="signature">
          <p style="margin:0;">Regards,</p>
          <p class="name" style="margin:5px 0;">Debadrita Goswami</p>
          <p class="title" style="margin:0;">Developer Community Coordinator</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
