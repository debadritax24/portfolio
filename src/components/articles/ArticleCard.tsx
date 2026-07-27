import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Clock, BookOpen } from "lucide-react";
import Link from "next/link";
import type { BlogListItem } from "@/types/blog";
const estimateReadTime = (text: string) => {
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
};

const formatDate = (value: string | Date) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export function BlogCard({ blog, index }: { blog: BlogListItem; index: number }) {
  return (
    <Link href={`/blogs/${blog.slug}`} className="group block">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
        className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 p-5 bg-white dark:bg-[#111111] rounded-2xl border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all duration-200"
      >
        <div className="flex-1">
          <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {blog.title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 sm:line-clamp-none max-w-2xl mb-1">
            {blog.excerpt}
          </p>
        </div>
        
        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start shrink-0 text-xs font-medium text-slate-500 dark:text-zinc-500 gap-1.5 sm:pt-1">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(blog.createdAt)}
          </span>
          <span className="flex items-center gap-1.5 sm:mt-1">
            <Clock className="w-3.5 h-3.5" />
            {estimateReadTime(blog.excerpt)} min read
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
