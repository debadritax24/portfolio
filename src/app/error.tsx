"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-white dark:bg-[#0e0e0e] transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 pt-20 pb-16">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-slate-500 text-sm tracking-widest uppercase">
            Something went wrong
          </p>

          <h1 className="dark:text-white font-bold mt-3 text-slate-900 text-xl">
            {error.message || "An unexpected error occurred"}
          </h1>

          <p className="dark:text-slate-300 mt-4 text-slate-600 text-sm">
            An error occurred while loading this page. Please try again.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
            <button
              onClick={reset}
              className="bg-slate-700 dark:bg-[#C7C7C7] dark:text-[#0E0D09] font-medium gap-2 inline-flex items-center px-3 py-1.5 rounded-[9px] sm:px-5 sm:py-2.5 text-sm text-white"
              aria-label="Try again"
            >
              Try Again
            </button>
            <a
              href="/"
              className="bg-white border border-slate-300 dark:bg-[#2E2E2E] dark:border-transparent dark:text-[#D4D4D4] font-medium gap-2 inline-flex items-center px-3 py-1.5 rounded-[9px] sm:px-5 sm:py-2.5 text-slate-900 text-sm"
              aria-label="Go to homepage"
            >
              Go Home
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
