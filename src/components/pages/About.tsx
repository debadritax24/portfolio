"use client";

import { ArrowLeft, Mail, ExternalLink, ShieldCheck, Zap, Code, Target } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ThemeToggle from "../layout/ThemeToggle";
import ButtonCreativeTop from "../creative/Button";
import Breadcrumb from "../ui/Breadcrumb";
import { FileText } from "lucide-react";

export default function AboutPage() {
  const router = useRouter();

  return (
    <main
      className="min-h-screen bg-white dark:bg-[#0e0e0e] transition-colors duration-300"
      itemScope
      itemType="https://schema.org/AboutPage"
    >
      <div className="container mx-auto px-4 sm:px-6 pt-12 pb-6">
        <div className="max-w-2xl mx-auto">
          <header className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/")}
                className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                About Me
              </h1>
            </div>
            <ThemeToggle />
          </header>

          <div className="w-full h-px bg-slate-200 dark:bg-white/10 mb-6" />

          <section className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Engineering at the intersection of product and performance.
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed" itemProp="description">
                I am <strong itemProp="author" itemScope itemType="https://schema.org/Person"><span itemProp="name" className="text-slate-900 dark:text-white">Debadrita Goswami</span></strong>, a software engineer obsessed with building robust, scalable applications. I don't just write code; I take <strong>ownership</strong> of the entire product lifecycle—from database architecture to high-availability deployments.
              </p>
              <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                My approach is rooted in a strong <strong>product mindset</strong>. I believe that engineering quality is meaningless if it doesn't solve real user problems. I write clean, maintainable code because it allows teams to move faster and scale without accumulating technical debt.
              </p>
            </div>

            <div className="mt-8">
              <Link
                href="/resume"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium tracking-wide bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>View Resume</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#1C1C1C] p-5 hover:shadow-md transition-shadow">
                <Zap className="w-5 h-5 text-amber-500 mb-3" />
                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">Performance & Scalability</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  I architect systems designed to handle growth. From optimizing database queries to implementing Edge caching, I ensure applications remain lightning fast under load.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#1C1C1C] p-5 hover:shadow-md transition-shadow">
                <Code className="w-5 h-5 text-blue-500 mb-3" />
                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">Clean Code & Architecture</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Writing code is easy; writing maintainable code is hard. I enforce strict typing, modular architectures (like Domain-Driven Design), and comprehensive testing.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#1C1C1C] p-5 hover:shadow-md transition-shadow">
                <ShieldCheck className="w-5 h-5 text-emerald-500 mb-3" />
                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">DevSecOps & Reliability</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Security and uptime are features. I integrate CI/CD pipelines, automated testing, and security scanning directly into the deployment workflow.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#1C1C1C] p-5 hover:shadow-md transition-shadow">
                <Target className="w-5 h-5 text-purple-500 mb-3" />
                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">Continuous Learning</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  The tech landscape evolves rapidly. I am constantly exploring new paradigms—from AI engineering workflows to modern Rust-based tooling—to stay at the cutting edge.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonCreativeTop href="/send-email" icon={<Mail className="w-4 h-4" />}>
                <span className="font-medium tracking-wide text-sm">
                  Send an email
                </span>
              </ButtonCreativeTop>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
