/**
 * Centralized server-only environment validation.
 *
 * Import this module in any server-side code that needs validated env vars.
 * It throws at module-load time if a required variable is missing, ensuring
 * fast-fail during startup rather than silent runtime errors.
 *
 * IMPORTANT: This file must NEVER be imported from client components.
 */

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
        `Set it in your .env file or deployment environment.`
    );
  }
  return value;
}

/**
 * Validated server-only environment variables.
 * Access via `serverEnv.JWT_SECRET`, etc.
 */
export const serverEnv = {
  /** Secret key for signing/verifying JWT tokens. Must be cryptographically random. */
  get JWT_SECRET() {
    return requireEnv("JWT_SECRET");
  },

  /** Neon PostgreSQL connection string. */
  get DATABASE_URL() {
    return requireEnv("DATABASE_URL");
  },

  /** IndexNow API key for search engine notifications. */
  get INDEXNOW_KEY() {
    return process.env.INDEXNOW_KEY ?? "";
  },

  /** Vercel Blob read/write token. */
  get BLOB_READ_WRITE_TOKEN() {
    return process.env.BLOB_READ_WRITE_TOKEN ?? "";
  },

  /** GitHub personal access token (optional, for higher rate limits). */
  get GITHUB_TOKEN() {
    return process.env.GITHUB_TOKEN ?? "";
  },
} as const;

/**
 * Pre-encoded JWT secret for use with the `jose` library.
 * Computed lazily to avoid import-time side effects during build.
 */
let _jwtSecretEncoded: Uint8Array | null = null;

export function getJwtSecret(): Uint8Array {
  if (!_jwtSecretEncoded) {
    _jwtSecretEncoded = new TextEncoder().encode(serverEnv.JWT_SECRET);
  }
  return _jwtSecretEncoded;
}
