"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getBlogs } from "@/lib/data";
import { BlogCard } from "./ArticleCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EmptyState } from "@/components/common/EmptyState";
import { fadeInUp } from "@/animations";
import type { BlogListItem } from "@/types/blog";

export function ArticleGrid({ initialData }: { initialData?: BlogListItem[] }) {
  const [blogs, setBlogs] = useState<BlogListItem[]>(initialData || []);

  useEffect(() => {
    if (!initialData || initialData.length === 0) {
      getBlogs().then((data) => setBlogs(data as BlogListItem[]));
    } else {
      setBlogs(initialData);
    }
  }, [initialData]);

  // Removed early return so the section is visible even when empty

  const featuredBlogs = blogs.slice(0, 3);

  return (
    <section id="blogs" className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 max-w-7xl">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="text-center mb-8"
      >
        <SectionHeading
          title="Learning Logs"
          subtitle="Technical deep dives, build journals, and notes on what I'm learning."
          centered
          className="mb-0"
        />
      </motion.div>

      {blogs.length === 0 ? (
        <EmptyState
          title="No Learning Logs"
          description="Check back later for new technical articles and deep dives."
        />
      ) : (
        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
          {featuredBlogs.map((blog, index) => (
            <BlogCard key={blog.id} blog={blog} index={index} />
          ))}
        </div>
      )}

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="flex justify-center mt-8"
      >
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-900 dark:text-white text-sm font-medium rounded-lg transition-colors border border-slate-200 dark:border-white/10"
        >
          View All Articles
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </section>
  );
}
