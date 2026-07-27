import { NextRequest } from "next/server";
import { verifyAuth } from "@/lib/auth/jwt";
import { apiSuccess, apiError } from "@/services/api";
import { siteConfig } from "@/config/site";

export const runtime = "nodejs";

/**
 * POST /api/indexnow — Notify search engines about URL changes.
 *
 * Security:
 * - Requires authenticated admin session
 * - IndexNow key loaded from environment variable
 * - Submitted URLs validated against canonical domain
 */
export async function POST(req: NextRequest) {
  // Require admin authentication
  if (!(await verifyAuth(req))) {
    return apiError("Unauthorized", 401);
  }

  try {
    const body = await req.json();
    const { url } = body;

    // Validate URL
    if (!url || typeof url !== "string") {
      return apiError("URL is required", 400);
    }

    // Validate URL format
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return apiError("URL must be absolute", 400);
    }

    // Validate URL belongs to our domain
    try {
      const parsedUrl = new URL(url);
      const siteUrl = new URL(siteConfig.url);
      if (
        parsedUrl.hostname !== siteUrl.hostname &&
        parsedUrl.hostname !== siteUrl.hostname.replace("www.", "")
      ) {
        return apiError("URL must belong to the site domain", 400);
      }
    } catch {
      return apiError("Invalid URL format", 400);
    }

    const key = process.env.INDEXNOW_KEY;
    if (!key) {
      console.error("[IndexNow] INDEXNOW_KEY environment variable is not set");
      return apiError("IndexNow is not configured", 500);
    }

    // Extract host from siteConfig (without protocol)
    const host = new URL(siteConfig.url).hostname;

    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        host,
        key,
        urlList: [url],
      }),
    });

    if (process.env.NODE_ENV === "development") {
      console.log(`[IndexNow] ${response.status} - ${url}`);
    }

    if (response.ok) {
      return apiSuccess({
        status: response.status,
        message: "Search engines notified successfully",
      });
    }

    if (response.status === 429) {
      return apiError("Rate limited by IndexNow. Please wait.", 429);
    }

    return apiError("Failed to notify search engines", response.status);
  } catch (error) {
    console.error("[IndexNow]", error);
    return apiError("Internal server error", 500);
  }
}
