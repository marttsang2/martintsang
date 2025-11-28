"use client";

import { cn } from "@/lib/utils";

interface GridBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  gridSize?: number;
  gridColor?: string;
  fadeStrength?: "none" | "light" | "medium" | "strong";
}

export default function GridBackground({
  children,
  className,
  gridSize = 40,
  gridColor = "rgba(255,255,255,0.03)",
  fadeStrength = "medium",
}: GridBackgroundProps) {
  const fadeStyles = {
    none: "",
    light: "[mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]",
    medium: "[mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]",
    strong: "[mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_60%)]",
  };

  return (
    <div className={cn("relative w-full overflow-hidden bg-black", className)}>
      {/* Grid pattern */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none",
          fadeStyles[fadeStrength]
        )}
        style={{
          backgroundImage: `
            linear-gradient(${gridColor} 1px, transparent 1px),
            linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60 pointer-events-none" />

      {children}
    </div>
  );
}
