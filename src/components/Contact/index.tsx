"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-yellow-300/[0.06] via-white/[0.02] to-transparent p-8 sm:p-12 lg:p-16"
      >
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-yellow-300">
          05 / Contact
        </span>
        <h2 className="mt-4 max-w-2xl text-balance text-3xl font-medium tracking-tight text-white sm:text-5xl">
          Have a project in mind?
          <br />
          <span className="text-neutral-500">Let&apos;s build it.</span>
        </h2>
        <p className="mt-6 max-w-xl text-balance text-base text-neutral-400">
          I&apos;m taking on a small number of new freelance and contract projects
          this year. The fastest way to reach me is email.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="mailto:tsangmartin1225@gmail.com"
            className="inline-flex items-center gap-2 rounded-full bg-yellow-300 px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-yellow-200"
          >
            <Mail size={16} />
            tsangmartin1225@gmail.com
            <ArrowUpRight size={14} />
          </a>
          <a
            href="https://github.com/marttsang2"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/30 hover:bg-white/[0.06]"
          >
            <Github size={16} />
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/marttsang2"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/30 hover:bg-white/[0.06]"
          >
            <Linkedin size={16} />
            LinkedIn
          </a>
        </div>
      </motion.div>
    </section>
  );
}
