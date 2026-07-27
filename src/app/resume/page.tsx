"use client";

import { motion } from "framer-motion";
import { ExternalLink, Download, Maximize, Heart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ResumePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFullscreen = () => {
    const elem = document.getElementById("pdf-viewer");
    if (elem?.requestFullscreen) {
      elem.requestFullscreen();
    }
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#000000] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Top Navigation */}
      <nav className="w-full px-6 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center group">
          {/* Logo representation - mimicking the T from screenshot but adapted */}
          <div className="w-8 h-8 flex items-center justify-center font-bold text-xl group-hover:opacity-80 transition-opacity">
          </div>
        </Link>
      </nav>

      <div className="max-w-[1200px] mx-auto px-6 pt-4 pb-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1
              className="text-5xl md:text-[4rem] font-black tracking-tight mb-3 text-white leading-none"

            >
              Resume
            </h1>
            <p className="text-gray-400 text-sm md:text-[15px] font-medium tracking-wide">
              A concise view of my experience, stack, and the product work I ship
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 md:pb-1">
            <button
              onClick={handleFullscreen}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-transparent border border-white/10 hover:bg-[#111] hover:border-white/20 text-gray-300 font-medium text-xs transition-all duration-300"
            >
              <Maximize className="w-3.5 h-3.5" />
              Fullscreen
            </button>
            <a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-transparent border border-white/10 hover:bg-[#111] hover:border-white/20 text-gray-300 font-medium text-xs transition-all duration-300"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open in New Tab
            </a>
            <a
              href="/Resume.pdf"
              download="Resume.pdf"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-white text-black font-bold text-xs transition-colors duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            >
              <Download className="w-3.5 h-3.5" />
              Download PDF
            </a>
          </div>
        </div>

        {/* PDF Viewer Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full bg-[#f8f9fa] rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl relative"
          style={{ height: "calc(100vh - 280px)", minHeight: "650px" }}
          id="pdf-viewer"
        >
          <iframe
            src="/Resume.pdf#toolbar=0&navpanes=0&scrollbar=0"
            className="w-full h-full rounded-2xl md:rounded-[2rem] border-none"
            title="Debadrita Goswami Resume"
          >
            <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-gray-100 rounded-2xl">
              <p className="text-gray-600 mb-6 font-medium">
                Your browser does not support viewing PDFs directly.
              </p>
              <a
                href="/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-black text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors shadow-lg"
              >
                Download PDF Instead
              </a>
            </div>
          </iframe>
        </motion.div>

        {/* Footer */}
        <div className="mt-10 pt-4 text-center text-[11px] text-gray-500 flex flex-col items-center gap-1.5 font-medium tracking-wide">
          <p className="flex items-center justify-center gap-1.5">
            Designed & built by <Heart className="w-3 h-3 text-gray-500" /> <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Debadrita Goswami</span>
          </p>
          <p className="text-gray-600">© {new Date().getFullYear()} All rights reserved</p>
        </div>
      </div>
    </main>
  );
}
