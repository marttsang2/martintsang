"use client";

import { Typography } from "@/components/ui/typography";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="h-screen w-full flex flex-col gap-4 items-center justify-center text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h1" className="font-thin text-center text-6xl lg:text-8xl">
          Develop
          <br />
          <span className="text-yellow-300">Experience</span>
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Typography variant="p" className="text-center text-md lg:text-xl text-neutral-400">
          Martin Tsang - Software Engineer located in Toronto, Canada
          <br />
          Passionate for building custom software solutions for businesses.
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-10 animate-bounce cursor-pointer"
        onClick={() => {
            const element = document.getElementById('about');
            if (element) {
              const elementPosition = element.getBoundingClientRect().top + window.scrollY;
              window.scrollTo({ top: elementPosition - 100, behavior: 'smooth' });
            }
        }}
      >
        <div className="p-2 rounded-full border-2 border-white">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
