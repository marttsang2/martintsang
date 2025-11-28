"use client";

import { cn } from "@/lib/utils";
import "./glitch-text.css";

interface GlitchTextProps {
  text: string;
  className?: string;
  speed?: "slow" | "medium" | "fast";
}

export default function GlitchText({
  text,
  className = "",
  speed = "medium",
}: GlitchTextProps) {
  const speedClass = {
    slow: "glitch-slow",
    medium: "glitch-medium",
    fast: "glitch-fast",
  };

  return (
    <span
      className={cn("glitch-wrapper", className)}
      data-text={text}
    >
      <span className={cn("glitch", speedClass[speed])} data-text={text}>
        {text}
      </span>
    </span>
  );
}
