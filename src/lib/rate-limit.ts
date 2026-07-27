/**
 * In-memory rate limiter for serverless environments.
 *
 * LIMITATION: This rate limiter is per-instance. On Vercel serverless, each
 * cold-start gets a fresh Map. For true production-grade multi-instance rate
 * limiting, use an external store like Upstash Redis.
 *
 * Despite this limitation, it still provides meaningful protection against:
 * - Rapid sequential requests within a single instance
 * - Automated scripts targeting the same warm instance
 *
 * For most portfolio-scale traffic, this is sufficient.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const limiters = new Map<string, Map<string, RateLimitEntry>>();

// Periodic cleanup to prevent memory leaks in long-lived instances
const CLEANUP_INTERVAL_MS = 60_000; // 1 minute
let cleanupTimer: ReturnType<typeof setInterval> | null = null;

function ensureCleanupTimer() {
  if (cleanupTimer) return;
  cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [, entries] of limiters) {
      for (const [key, entry] of entries) {
        if (now > entry.resetAt) {
          entries.delete(key);
        }
      }
    }
  }, CLEANUP_INTERVAL_MS);
  // Allow the process to exit without waiting for the timer
  if (cleanupTimer && typeof cleanupTimer === "object" && "unref" in cleanupTimer) {
    cleanupTimer.unref();
  }
}

interface RateLimitOptions {
  /** Unique name for this limiter (e.g., "admin-login", "contact-form"). */
  name: string;
  /** Maximum number of requests allowed in the window. */
  max: number;
  /** Window duration in milliseconds. */
  windowMs: number;
}

interface RateLimitResult {
  /** Whether the request is allowed. */
  success: boolean;
  /** Remaining requests in the current window. */
  remaining: number;
}

/**
 * Check and consume a rate limit for the given identifier (typically an IP).
 *
 * @param identifier - The key to rate-limit on (e.g., client IP address)
 * @param options - Rate limit configuration
 * @returns Whether the request is allowed and how many requests remain
 */
export function rateLimit(
  identifier: string,
  options: RateLimitOptions
): RateLimitResult {
  ensureCleanupTimer();

  const { name, max, windowMs } = options;

  if (!limiters.has(name)) {
    limiters.set(name, new Map());
  }

  const entries = limiters.get(name)!;
  const now = Date.now();
  const entry = entries.get(identifier);

  // No existing entry or window expired — create fresh
  if (!entry || now > entry.resetAt) {
    entries.set(identifier, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: max - 1 };
  }

  // Within window — check count
  if (entry.count >= max) {
    return { success: false, remaining: 0 };
  }

  entry.count++;
  return { success: true, remaining: max - entry.count };
}

/**
 * Extract the client IP from a Request object.
 * Falls back to "unknown" if no forwarding header is present.
 */
export function getClientIp(req: Request): string {
  const forwarded = (req.headers.get("x-forwarded-for") ?? "").split(",")[0]?.trim();
  const realIp = req.headers.get("x-real-ip")?.trim();
  return forwarded || realIp || "unknown";
}
