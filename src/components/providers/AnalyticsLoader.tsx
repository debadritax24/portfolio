"use client";

import { Analytics } from "@vercel/analytics/react";

/**
 * Vercel Analytics component
 * Loaded separately to avoid blocking main bundle
 */
export default function AnalyticsLoader() {
  return <Analytics />;
}
