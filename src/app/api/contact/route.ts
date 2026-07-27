import { NextRequest } from "next/server";
import * as z from "zod/v4";
import { sendContactNotification, sendAutoReply } from "@/services/email/mailer";
import { apiSuccess, apiError } from "@/services/api";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

// Header injection detection
const headerInjectionRegex = /[\r\n]/;

// Validation schema for incoming contact form requests
const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.email("Invalid email address"),
  subject: z.string().min(1, "Subject is required").max(150, "Subject is too long"),
  message: z.string().min(1, "Message is required").max(5000, "Message is too long"),
  // Honeypot field — must be empty
  company: z.string().max(0).optional(),
});

/**
 * POST /api/contact — Handle contact form submissions.
 *
 * Security:
 * - Rate limited: 3 submissions per IP per hour
 * - Zod validation on all fields
 * - Honeypot field to catch bots
 * - Header injection protection
 * - Generic error messages to avoid leaking internals
 */
export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  // Rate limiting — 3 per IP per hour
  const limit = rateLimit(ip, {
    name: "contact-form",
    max: 3,
    windowMs: 60 * 60 * 1000, // 1 hour
  });

  if (!limit.success) {
    return apiError("Too many submissions. Please try again later.", 429);
  }

  try {
    const body = await req.json();

    // Validate the request payload
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return apiError("Invalid form data.", 400);
    }

    const { name, email, subject, message, company } = parsed.data;

    // Honeypot check — if the hidden field is filled, silently accept
    if (company) {
      return apiSuccess({ message: "Message sent successfully." });
    }

    // Header injection check
    if (headerInjectionRegex.test(email) || headerInjectionRegex.test(subject)) {
      return apiError("Invalid characters detected.", 400);
    }

    // Execute both emails concurrently
    await Promise.all([
      sendContactNotification({ name, email, subject, message }),
      sendAutoReply({ name, email, subject, message }),
    ]);

    return apiSuccess({ message: "Message sent successfully." });
  } catch (error) {
    console.error("[API/Contact]", error);
    return apiError("Unable to send message.", 500);
  }
}
