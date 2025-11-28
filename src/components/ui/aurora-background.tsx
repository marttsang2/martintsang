"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface AuroraBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  showRadialGradient?: boolean;
}

export default function AuroraBackground({
  children,
  className,
  showRadialGradient = true,
}: AuroraBackgroundProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col h-screen items-center justify-center bg-zinc-950 text-white overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            `
            [--aurora:repeating-linear-gradient(100deg,#3b82f6_10%,#8b5cf6_15%,#06b6d4_20%,#3b82f6_25%,#8b5cf6_30%)]
            [background-image:var(--aurora)]
            [background-size:300%_300%]
            [background-position:50%_50%]
            absolute
            inset-0
            opacity-50
            blur-[100px]
            will-change-transform
            `,
            showRadialGradient &&
              "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]"
          )}
        >
          <motion.div
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 [background-image:var(--aurora)] [background-size:300%_300%]"
          />
        </div>

        {/* Secondary aurora layer */}
        <div
          className={cn(
            `
            [--aurora2:repeating-linear-gradient(100deg,#06b6d4_10%,#3b82f6_15%,#8b5cf6_20%,#06b6d4_25%,#3b82f6_30%)]
            [background-image:var(--aurora2)]
            [background-size:200%_200%]
            absolute
            inset-0
            opacity-30
            blur-[120px]
            will-change-transform
            `,
            showRadialGradient &&
              "[mask-image:radial-gradient(ellipse_at_0%_100%,black_10%,transparent_70%)]"
          )}
        >
          <motion.div
            animate={{
              backgroundPosition: ["100% 100%", "0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 [background-image:var(--aurora2)] [background-size:200%_200%]"
          />
        </div>
      </div>
      {children}
    </div>
  );
}
