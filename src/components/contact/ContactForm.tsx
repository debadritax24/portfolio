"use client";

import { motion } from "framer-motion";
import { Mail, Send, MessageSquare, Clock, ArrowUpRight, MapPin } from "lucide-react";
import { FaDiscord, FaGithub, FaLinkedin } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";
import { SectionHeading } from "@/components/common/SectionHeading";
import { siteConfig } from "@/config/site";

export function ContactForm() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    setFormState("sending");
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Something went wrong.");
      }

      setFormState("sent");
      toast.success(data.message || "Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setFormState("idle"), 3000);
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message || "Failed to send message.");
      setFormState("idle");
    }
  };

  return (
    <section id="contact" className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center justify-center text-center mb-8"
      >
        <SectionHeading
          title="Get in Touch"
          subtitle="Open to internships, collaborations, and interesting conversations."
          centered
          className="mb-0"
        />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Contact Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="space-y-3"
        >
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-3 p-4 sm:p-5 bg-slate-50 dark:bg-[#0e0e0e] rounded-xl border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-colors group"
          >
            <div className="p-2 bg-slate-200 dark:bg-[#0e0e0e] rounded-lg group-hover:bg-blue-500/10 transition-colors">
              <Mail className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-blue-500 transition-colors" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white">Email</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{siteConfig.email}</div>
            </div>
          </a>

          <a
            href={siteConfig.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 sm:p-5 bg-slate-50 dark:bg-[#0e0e0e] rounded-xl border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-colors group"
          >
            <div className="p-2 bg-slate-200 dark:bg-[#0e0e0e] rounded-lg group-hover:bg-blue-500/10 transition-colors">
              <FaLinkedin className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-blue-500 transition-colors" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white">LinkedIn</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Let&apos;s connect professionally</div>
            </div>
          </a>

          <div className="grid grid-cols-2 gap-3">
            <a
              href={siteConfig.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-4 sm:p-5 bg-slate-50 dark:bg-[#0e0e0e] rounded-xl border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-colors group"
            >
              <FaGithub className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
              <div className="text-sm font-medium text-slate-900 dark:text-white">GitHub</div>
            </a>

            <a
              href={siteConfig.socialLinks.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-4 sm:p-5 bg-slate-50 dark:bg-[#0e0e0e] rounded-xl border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-colors group"
            >
              <FaDiscord className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-indigo-500 transition-colors" />
              <div className="text-sm font-medium text-slate-900 dark:text-white">Discord</div>
            </a>
          </div>

          {/* Response Time */}
          <div className="flex items-center gap-2 px-4 py-2 text-xs text-slate-500 dark:text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            <span>Usually reply within 24 hours</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 px-4 py-2 text-xs text-slate-500 dark:text-slate-400">
            <MapPin className="w-3.5 h-3.5" />
            <span>Kolkata, West Bengal</span>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-6 bg-slate-50 dark:bg-[#0e0e0e] rounded-xl border border-slate-200 dark:border-white/10 h-full">
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare className="w-4 h-4 text-blue-500 dark:text-blue-400" />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Send a message</h3>
            </div>
            
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
                required
                className="px-4 py-2.5 text-sm bg-white dark:bg-[#0e0e0e] border border-slate-200 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 text-slate-900 dark:text-white transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                required
                className="px-4 py-2.5 text-sm bg-white dark:bg-[#0e0e0e] border border-slate-200 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 text-slate-900 dark:text-white transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="What is this regarding?"
                required
                className="px-4 py-2.5 text-sm bg-white dark:bg-[#0e0e0e] border border-slate-200 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 text-slate-900 dark:text-white transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
              />
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="message" className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="How can I help you?"
                required
                rows={4}
                className="px-4 py-2.5 text-sm bg-white dark:bg-[#0e0e0e] border border-slate-200 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 text-slate-900 dark:text-white transition-shadow resize-none flex-1 min-h-[120px] placeholder:text-slate-400 dark:placeholder:text-slate-600"
              />
            </div>

            <button
              type="submit"
              disabled={formState === "sending"}
              className="mt-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/70 text-white text-sm font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#121212] hover:translate-y-[-1px] hover:shadow-lg hover:shadow-blue-600/20 active:translate-y-0"
            >
              {formState === "sending" ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : formState === "sent" ? (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Sent!
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
