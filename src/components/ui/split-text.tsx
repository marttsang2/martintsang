"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation, Variant } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  animationFrom?: { opacity: number; transform: string };
  animationTo?: { opacity: number; transform: string };
  easing?: string;
  threshold?: number;
  textAlign?: "left" | "center" | "right";
  onLetterAnimationComplete?: () => void;
}

export default function SplitText({
  text,
  className = "",
  delay = 50,
  animationFrom = { opacity: 0, transform: "translate3d(0,40px,0)" },
  animationTo = { opacity: 1, transform: "translate3d(0,0,0)" },
  easing = "easeOut",
  threshold = 0.1,
  textAlign = "center",
  onLetterAnimationComplete,
}: SplitTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      controls.start("visible");
      setHasAnimated(true);
    }
  }, [isInView, controls, hasAnimated]);

  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay / 1000,
      },
    },
  };

  const letterVariants: { hidden: Variant; visible: Variant } = {
    hidden: {
      opacity: animationFrom.opacity,
      transform: animationFrom.transform,
    },
    visible: {
      opacity: animationTo.opacity,
      transform: animationTo.transform,
      transition: {
        duration: 0.5,
        ease: easing === "easeOut" ? [0.25, 0.46, 0.45, 0.94] : [0.43, 0.13, 0.23, 0.96],
      },
    },
  };

  return (
    <motion.p
      ref={ref}
      className={`flex flex-wrap ${textAlign === "center" ? "justify-center" : textAlign === "right" ? "justify-end" : "justify-start"} ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-flex mr-[0.25em]">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              variants={letterVariants}
              className="inline-block"
              onAnimationComplete={
                wordIndex === words.length - 1 && charIndex === word.length - 1
                  ? onLetterAnimationComplete
                  : undefined
              }
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.p>
  );
}
