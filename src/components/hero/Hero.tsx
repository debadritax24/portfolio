
"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import Image from "next/image";
import { Eye, MapPin, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import ThemeToggle from "@/components/layout/ThemeToggle";
import CountUp from "@/components/ui/CountUp";
import Link from "next/link";
import profileImage from "../../../public/cutie.webp";
import { AvailableBadge } from "@/components/common/AvailableBadge";
import { SocialLinks } from "@/components/common/SocialLinks";
import { siteConfig } from "@/config/site";

export function Hero() {
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const idleWindow =
      typeof window !== "undefined"
        ? (window as Window & {
          requestIdleCallback?: (cb: IdleRequestCallback, options?: IdleRequestOptions) => number;
          cancelIdleCallback?: (handle: number) => void;
        })
        : null;

    const incrementViewCount = async () => {
      try {
        const response = await fetch("/api/view-count");
        if (!response.ok) return;
        const data = await response.json();
        if (isMounted && typeof data?.count === "number") {
          setViewCount(data.count);
        }
      } catch {
        // Silently fail
      }
    };

    const idleId = idleWindow?.requestIdleCallback
      ? idleWindow.requestIdleCallback(() => incrementViewCount(), { timeout: 1500 })
      : window.setTimeout(incrementViewCount, 200);

    return () => {
      isMounted = false;
      if (idleWindow?.cancelIdleCallback) {
        idleWindow.cancelIdleCallback(idleId);
      } else {
        clearTimeout(idleId);
      }
    };
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <section className="container mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-0">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="max-w-3xl mx-auto relative"
          style={{ willChange: "transform, opacity" }}
        >
          {/* Theme Toggle */}
          <div className="absolute top-0 -right-1 z-10">
            <ThemeToggle />
          </div>

          {/* Profile + Name Header */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-10"
            style={{ willChange: "transform, opacity" }}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 relative shrink-0">
              <Image
                src={profileImage}
                alt={siteConfig.name}
                className="w-full h-full object-cover"
                width={96}
                height={96}
                priority
                fetchPriority="high"
                placeholder="blur"
                quality={80}
                sizes="(max-width: 640px) 80px, 96px"
              />
            </div>
            
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
                {siteConfig.name}
              </h1>
              <p className="font-mono text-xs sm:text-sm text-slate-500 dark:text-zinc-500">
                Singular Focus. Global Reach.
              </p>
            </div>
          </m.div>

          {/* Tagline */}
          <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 tracking-tight mb-6 max-w-2xl leading-relaxed">
            I&apos;m a <span className="font-semibold text-slate-900 dark:text-white">self-taught developer</span> who tries to learn everything — strongest in <span className="font-semibold text-slate-900 dark:text-white">full stack web development</span>.
          </p>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-500 dark:text-zinc-400 leading-relaxed max-w-2xl mb-10">
            I craft digital experiences with a focus on precision, motion, and minimal aesthetics. My work bridges the gap between functional engineering and artistic design.
          </p>

          {/* Status Footer */}
          <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-zinc-500 mb-10">
            <AvailableBadge />
            <span className="opacity-50">•</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              Kolkata, West Bengal
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <Link
              href="/resume"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold tracking-wide rounded-xl transition-all hover:translate-y-[-1px] hover:shadow-lg hover:shadow-blue-600/20 active:translate-y-0"
            >
              Resume
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <SocialLinks />
            <span className="hidden sm:inline text-slate-300 dark:text-slate-600">|</span>
            <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 w-full sm:w-auto mt-2 sm:mt-0">
              <Eye className="w-3.5 h-3.5" />
              <span className="text-sm">
                <CountUp
                  from={0}
                  to={viewCount}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />
              </span>
            </div>
          </div>
        </m.div>
      </section>
    </LazyMotion>
  );
}
