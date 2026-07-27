import { type NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { getJwtSecret } from "@/lib/env";

// ---------------------------------------------------------------------------
// Environment detection
// ---------------------------------------------------------------------------
type Environment = "development" | "preview" | "production";

function getEnvironment(): Environment {
  if (process.env.NODE_ENV === "development") return "development";
  if (process.env.VERCEL_ENV === "preview") return "preview";
  return "production";
}

// ---------------------------------------------------------------------------
// Social crawler detection
// ---------------------------------------------------------------------------
function isSocialBot(userAgent: string): boolean {
  return /facebookexternalhit|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|TelegramBot/i.test(
    userAgent
  );
}

// ---------------------------------------------------------------------------
// Admin auth check
// ---------------------------------------------------------------------------
const COOKIE_NAME = "admin_session";

async function isAdminAuthenticated(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    return payload?.email != null;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Admin route protection ──────────────────────────────────────────
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const isAuthed = await isAdminAuthenticated(request);
    if (!isAuthed) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect authenticated users away from login page
  if (pathname === "/admin/login") {
    const isAuthed = await isAdminAuthenticated(request);
    if (isAuthed) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  // ── CSP middleware ──────────────────────────────────────────────────
  const nonce = crypto.randomUUID().replace(/-/g, "");
  const env = getEnvironment();
  const ua = request.headers.get("user-agent") ?? "";

  const scriptHosts = [
    "https://www.googletagmanager.com",
    "https://va.vercel-scripts.com",
    "https://cdn.databuddy.cc",
  ];

  if (env !== "production") {
    scriptHosts.push("https://vercel.live");
  }

  const connectHosts = [
    "https://www.google-analytics.com",
    "https://analytics.google.com",
    "https://api.databuddy.cc",
    "https://basket.databuddy.cc",
    "https://vitals.vercel-insights.com",
  ];

  if (env !== "production") {
    connectHosts.push("https://vercel.live");
  }

  const frameHosts: string[] = [
    "https://www.googletagmanager.com",
  ];

  if (env !== "production") {
    frameHosts.push("https://vercel.live");
  }

  const evalPolicy = env === "development" ? " 'unsafe-eval'" : "";

  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${evalPolicy} ${scriptHosts.join(" ")}`,
    "script-src-attr 'none'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "style-src-attr 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data: https://fonts.gstatic.com",
    `connect-src 'self' ${connectHosts.join(" ")}`,
    "media-src 'self'",
    frameHosts.length > 0
      ? `frame-src 'self' ${frameHosts.join(" ")}`
      : "frame-src 'self'",
    "object-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "upgrade-insecure-requests",
  ].join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  // Security Tradeoff: We skip CSP for social media bots (Twitterbot, etc.) 
  // because strict nonces and 'strict-dynamic' can sometimes block their headless 
  // metadata crawlers from rendering OpenGraph images correctly.
  // Normal browsers will always receive the strict CSP.
  if (!isSocialBot(ua)) {
    response.headers.set("Content-Security-Policy", csp);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:png|jpg|jpeg|webp|avif|svg|ico|woff2?|mp3|wav|aac|m4a)).*)",
  ],
};
