"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface DockItemProps {
  children: React.ReactNode;
  className?: string;
  mouseX: ReturnType<typeof useMotionValue<number>>;
}

function DockItem({ children, className, mouseX }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className={cn(
        "aspect-square rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

interface DockProps {
  children: React.ReactNode;
  className?: string;
}

export default function Dock({ children, className }: DockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "flex items-end gap-2 h-16 px-4 py-3 rounded-2xl bg-black/50 backdrop-blur-md border border-white/10",
        className
      )}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <DockItem key={i} mouseX={mouseX}>
              {child}
            </DockItem>
          ))
        : children}
    </motion.div>
  );
}

export { DockItem };
