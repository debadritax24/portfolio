"use client";

import { ReactLenis } from 'lenis/react';

export default function SmoothScroll({
  children,
  isEnabled = true,
}: {
  children: React.ReactNode;
  isEnabled?: boolean;
}) {
  // If not enabled or we want to bypass, just return children
  if (!isEnabled) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08, // Adjust for smoothness (lower is smoother/slower)
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
