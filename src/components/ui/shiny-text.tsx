"use client";

import { cn } from "@/lib/utils";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export default function ShinyText({
  text,
  disabled = false,
  speed = 5,
  className = "",
}: ShinyTextProps) {
  return (
    <span
      className={cn(
        "inline-block bg-clip-text text-transparent",
        "bg-[linear-gradient(120deg,rgba(255,255,255,0)_40%,rgba(255,255,255,0.8)_50%,rgba(255,255,255,0)_60%)]",
        "bg-[length:200%_100%]",
        disabled ? "" : "animate-shine",
        className
      )}
      style={{
        backgroundImage: `linear-gradient(120deg, rgba(255,255,255,1) 40%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,1) 60%)`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        animationDuration: `${speed}s`,
      }}
    >
      {text}
    </span>
  );
}
