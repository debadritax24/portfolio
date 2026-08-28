"use client";

import { Databuddy } from "@databuddy/sdk/react";

/**
 * Databuddy analytics component
 * Only loads in production to avoid CORS errors on localhost.
 * Wrapped in error boundary to prevent analytics failures from breaking the app.
 */
export default function DatabuddyLoader() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <Databuddy
      clientId="9eded4d4-0ec8-4430-a741-ee4e59b29c4d"
      trackAttributes={true}
      trackOutgoingLinks={true}
      trackInteractions={true}
      trackWebVitals={true}
    />
  );
}
