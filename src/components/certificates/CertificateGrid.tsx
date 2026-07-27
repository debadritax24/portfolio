"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Award, Calendar, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { getCertifications } from "@/lib/data";
import Link from "next/link";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { CertificationListItem } from "@/types/certification";

export default function CertificateGrid({ initialData }: { initialData?: CertificationListItem[] }) {
  const [certifications, setCertifications] = useState<CertificationListItem[]>(initialData || []);

  useEffect(() => {
    if (!initialData || initialData.length === 0) {
      getCertifications().then((data) => setCertifications(data as CertificationListItem[]));
    } else {
      setCertifications(initialData);
    }
  }, [initialData]);

  if (certifications.length === 0) return null;

  return (
    <section id="certifications" className="container mx-auto px-4 sm:px-6 pt-16 pb-12 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <SectionHeading
          title="Certifications"
          subtitle="Professional credentials and verified achievements."
          centered
          className="mb-8"
        />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            className="group flex flex-col sm:flex-row bg-slate-50 dark:bg-[#0e0e0e] rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all duration-300 hover:shadow-md"
          >
            {/* Certificate Image */}
            <div className="sm:w-48 h-32 sm:h-auto bg-slate-200 dark:bg-[#0e0e0e] flex items-center justify-center relative overflow-hidden border-b sm:border-b-0 sm:border-r border-slate-200 dark:border-white/10 shrink-0">
              {cert.imageUrl ? (
                <img
                  src={cert.imageUrl}
                  alt={cert.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-6 text-slate-400 dark:text-slate-500">
                  <ShieldCheck className="w-10 h-10 mb-2 opacity-50" />
                  <span className="text-[10px] uppercase tracking-widest font-semibold">Verified</span>
                </div>
              )}
            </div>

            {/* Certificate Info */}
            <div className="flex-1 p-5 flex flex-col justify-center">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                  <Award className="w-3.5 h-3.5" />
                  {cert.issuer}
                </div>
                {cert.issueDate && (
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <Calendar className="w-3 h-3" />
                    {cert.issueDate}
                  </div>
                )}
              </div>

              <h3 className="text-base font-bold tracking-tight text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {cert.title}
              </h3>
              
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3 line-clamp-2">
                {cert.description}
              </p>

              <div className="mt-auto">
                <Link
                  href={`/certifications/${cert.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  View Credential <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="flex justify-center mt-8"
      >
        <Link
          href="/certifications"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-900 dark:text-white text-sm font-medium rounded-lg transition-colors border border-slate-200 dark:border-white/10"
        >
          View All Certifications
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </section>
  );
}
