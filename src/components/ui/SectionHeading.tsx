"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-3"
    >
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-yellow-300">
        {eyebrow}
      </span>
      <h2 className="text-balance text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-2 max-w-2xl text-balance text-base text-neutral-400">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
