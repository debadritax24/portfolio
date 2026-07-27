import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./jwt";
import { apiError } from "@/services/api";

/**
 * Middleware wrapper that protects an admin API route.
 * Returns 401 if not authenticated, otherwise calls the handler.
 *
 * Usage:
 *   export const GET = withAuth(async (req) => { ... });
 *   export const POST = withAuth(async (req) => { ... });
 */
export function withAuth<T>(
  handler: (req: NextRequest) => Promise<NextResponse<T>>
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    const isAuthed = await verifyAuth(req);
    if (!isAuthed) {
      return apiError("Unauthorized", 401);
    }
    return handler(req);
  };
}
