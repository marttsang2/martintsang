"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  direction?: "top" | "bottom" | "left" | "right";
  animateBy?: "words" | "letters";
}

export default function BlurText({
  text,
  className = "",
  delay = 100,
  direction = "bottom",
  animateBy = "words",
}: BlurTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      controls.start("visible");
      setHasAnimated(true);
    }
  }, [isInView, controls, hasAnimated]);

  const getInitialTransform = () => {
    switch (direction) {
      case "top":
        return "translateY(-20px)";
      case "bottom":
        return "translateY(20px)";
      case "left":
        return "translateX(-20px)";
      case "right":
        return "translateX(20px)";
      default:
        return "translateY(20px)";
    }
  };

  const items = animateBy === "words" ? text.split(" ") : text.split("");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay / 1000,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
      transform: getInitialTransform(),
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transform: "translateY(0px) translateX(0px)",
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.p
      ref={ref}
      className={`flex flex-wrap ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          variants={itemVariants}
          className={`inline-block ${animateBy === "words" ? "mr-[0.25em]" : ""}`}
        >
          {item === " " ? "\u00A0" : item}
        </motion.span>
      ))}
    </motion.p>
  );
}
