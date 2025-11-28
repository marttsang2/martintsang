"use client";

import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
}

export default function GradientText({
  children,
  className = "",
  colors = ["#ffaa40", "#9c40ff", "#ffaa40"],
  animationSpeed = 8,
  showBorder = false,
}: GradientTextProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    backgroundSize: "300% 100%",
    animationDuration: `${animationSpeed}s`,
  };

  return (
    <span
      className={cn(
        "inline-block relative",
        showBorder && "p-[1px]",
        className
      )}
    >
      {showBorder && (
        <span
          className="absolute inset-0 rounded-lg animate-gradient-x opacity-50 blur-sm"
          style={gradientStyle}
        />
      )}
      <span
        className="bg-clip-text text-transparent animate-gradient-x relative"
        style={gradientStyle}
      >
        {children}
      </span>
    </span>
  );
}
