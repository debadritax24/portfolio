import { NextResponse } from "next/server";

/**
 * Return a consistent success JSON response.
 */
export function apiSuccess<T>(data: T, status = 200): NextResponse {
  return NextResponse.json({ success: true, data }, { status });
}

/**
 * Return a consistent error JSON response.
 */
export function apiError(error: string, status = 400): NextResponse {
  return NextResponse.json({ success: false, error }, { status });
}
