import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { getJwtSecret } from "@/lib/env";

const COOKIE_NAME = "admin_session";
const TOKEN_EXPIRY = "24h";

export interface JwtPayload {
  email: string;
  iat?: number;
  exp?: number;
}

/**
 * Create a signed JWT token for admin authentication.
 */
export async function createToken(email: string): Promise<string> {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(getJwtSecret());
}

/**
 * Verify and decode a JWT token.
 */
export async function verifyToken(token: string): Promise<JwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    return payload as unknown as JwtPayload;
  } catch {
    return null;
  }
}

/**
 * Set the admin session cookie with a signed JWT.
 */
export async function setSessionCookie(email: string): Promise<void> {
  const token = await createToken(email);
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });
}

/**
 * Clear the admin session cookie.
 */
export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * Get the current admin email from the session cookie.
 * Returns null if not authenticated.
 */
export async function getSessionEmail(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const payload = await verifyToken(token);
  return payload?.email ?? null;
}

/**
 * Verify admin authentication from a NextRequest (for API route handlers).
 * Checks the cookie-based JWT session.
 */
export async function verifyAuth(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;

  const payload = await verifyToken(token);
  return payload?.email != null;
}
