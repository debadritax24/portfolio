import { NextRequest, NextResponse } from "next/server";
import { getTotalViewCount, incrementViewCount } from "@/lib/db/queries/views";

export const runtime = "nodejs";

const VIEW_COOKIE = "hero_viewed";
const VIEW_COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours

// Simple bot detection
const BOT_PATTERN =
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegrambot|discordbot|googlebot|yandex|baidu|semrush|ahrefs/i;

function isBot(ua: string): boolean {
  return BOT_PATTERN.test(ua);
}

function isAdminRoute(route: string): boolean {
  return route.startsWith("/admin") || route.startsWith("/api/admin");
}

/**
 * GET /api/view-count — Return total view count.
 */
export async function GET(req: NextRequest) {
  try {
    const ua = req.headers.get("user-agent") ?? "";

    // Don't count bots
    if (isBot(ua)) {
      const count = await getTotalViewCount();
      return NextResponse.json({ count });
    }

    const alreadyViewed = req.cookies.get(VIEW_COOKIE)?.value === "1";
    const route = req.nextUrl.searchParams.get("route") || "/";

    // Don't count admin routes
    if (isAdminRoute(route)) {
      const count = await getTotalViewCount();
      return NextResponse.json({ count });
    }

    // Increment if not already counted in the last 24h
    if (!alreadyViewed) {
      await incrementViewCount(route);
    }

    const count = await getTotalViewCount();
    const response = NextResponse.json({ count });

    // Set 24h deduplication cookie
    if (!alreadyViewed) {
      response.cookies.set(VIEW_COOKIE, "1", {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: VIEW_COOKIE_MAX_AGE,
      });
    }

    return response;
  } catch (error) {
    console.error("[ViewCount]", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve view count" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/view-count — Also returns count (legacy compatibility).
 */
export async function POST(req: NextRequest) {
  return GET(req);
}
