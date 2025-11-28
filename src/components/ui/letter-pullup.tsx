"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface LetterPullupProps {
  words: string;
  className?: string;
  delay?: number;
}

export default function LetterPullup({
  words,
  className = "",
  delay = 0.05,
}: LetterPullupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const letters = words.split("");

  const pullupVariant = {
    initial: { y: 100, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * delay,
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    }),
  };

  return (
    <div ref={ref} className={cn("flex justify-center", className)}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          variants={pullupVariant}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          custom={i}
          className={cn(
            "inline-block",
            letter === " " ? "w-[0.3em]" : ""
          )}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </div>
  );
}
