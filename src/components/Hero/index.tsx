"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-center pt-24 pb-16"
    >
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.5 }}
        className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-yellow-300/20 bg-yellow-300/[0.04] px-3 py-1 text-xs text-yellow-300/90"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-300/60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-yellow-300" />
        </span>
        Available for select freelance work
      </motion.div>

      <motion.h1
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="text-balance text-5xl font-medium leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
      >
        Software engineer
        <br />
        building <span className="text-yellow-300">production</span>
        <br />
        web platforms.
      </motion.h1>

      <motion.p
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-8 max-w-xl text-balance text-base leading-relaxed text-neutral-400 sm:text-lg"
      >
        I&apos;m Martin — a software engineer based in Toronto. I design and ship
        full-stack systems across booking, legal, and AI domains, from Spring Boot
        backends on Kubernetes to polished React frontends.
      </motion.p>

      <motion.div
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="mt-10 flex flex-wrap items-center gap-3"
      >
        <a
          href="mailto:tsangmartin1225@gmail.com"
          className="inline-flex items-center gap-2 rounded-full bg-yellow-300 px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-yellow-200"
        >
          <Mail size={16} />
          Get in touch
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
      </motion.div>

      <motion.button
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.5 }}
        onClick={() => {
          const element = document.getElementById("about");
          if (element) {
            const top = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: top - 80, behavior: "smooth" });
          }
        }}
        aria-label="Scroll to about section"
        className="mt-20 inline-flex w-fit items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-yellow-300"
      >
        <ArrowDown size={14} className="animate-bounce" />
        Scroll
      </motion.button>
    </section>
  );
}
