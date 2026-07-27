import { NextRequest } from "next/server";
import { loginSchema } from "@/lib/validation/schemas";
import { verifyAdminCredentials } from "@/lib/db/queries/admin";
import { setSessionCookie, clearSessionCookie } from "@/lib/auth/jwt";
import { apiSuccess, apiError } from "@/services/api";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

/**
 * POST /api/admin/login — Authenticate admin user.
 *
 * Security:
 * - Rate limited: 5 failed attempts per IP per minute
 * - All credentials verified via bcrypt against database
 * - Generic error messages to prevent user enumeration
 */
export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  // Rate limiting — 5 failed attempts per IP per minute
  const limit = rateLimit(ip, {
    name: "admin-login",
    max: 5,
    windowMs: 60_000,
  });

  if (!limit.success) {
    return apiError("Too many login attempts. Please try again later.", 429);
  }

  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return apiError("Invalid credentials", 400);
    }

    const { email, password } = parsed.data;

    // Verify credentials via bcrypt-hashed database check
    const isValid = await verifyAdminCredentials(email, password);

    if (!isValid) {
      return apiError("Invalid credentials", 401);
    }

    // Set JWT session cookie
    await setSessionCookie(email.toLowerCase());

    return apiSuccess({ message: "Login successful" });
  } catch (error) {
    console.error("[Admin/Login]", error);
    return apiError("Invalid request", 400);
  }
}

/**
 * DELETE /api/admin/login — Logout (clear session cookie).
 */
export async function DELETE() {
  await clearSessionCookie();
  return apiSuccess({ message: "Logged out" });
}
