"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en" dir="ltr">
      <body className="min-h-screen bg-white dark:bg-[#0e0e0e] transition-colors duration-300">
        <main className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-sm font-bold tracking-widest text-slate-500 uppercase mb-4">
              System Error
            </p>

            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Something went wrong
            </h1>

            <p className="text-slate-600 dark:text-slate-300 text-base mb-8 max-w-md mx-auto leading-relaxed">
              An unexpected error occurred while loading the page. Please try again or return to the homepage.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={reset}
                className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium px-6 py-3 rounded-lg text-sm hover:bg-slate-700 dark:hover:bg-slate-100 transition-colors"
                aria-label="Try again"
              >
                Try Again
              </button>
              <a
                href="/"
                className="bg-white dark:bg-[#1C1C1C] text-slate-900 dark:text-white font-medium px-6 py-3 rounded-lg text-sm border border-slate-300 dark:border-[#333] hover:bg-slate-50 dark:hover:bg-[#252525] transition-colors"
                aria-label="Go to homepage"
              >
                Go Home
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
