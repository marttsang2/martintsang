"use client";

import { motion } from "framer-motion";
import SplitText from "@/components/ui/split-text";
import GradientText from "@/components/ui/gradient-text";
import RotatingText from "@/components/ui/rotating-text";
import Particles from "@/components/ui/particles";
import MagnetButton from "@/components/ui/magnet-button";

export default function Hero() {
  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - 100, behavior: "smooth" });
    }
  };

  return (
    <div
      id="hero"
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Animated particles background */}
      <Particles
        className="absolute inset-0"
        quantity={80}
        staticity={30}
        ease={80}
        particleColors={["#3b82f6", "#8b5cf6", "#06b6d4", "#ffffff"]}
      />

      {/* Aurora gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black pointer-events-none" />

      {/* Radial gradient spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,119,198,0.15),transparent_50%)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-4">
        {/* Main title with split text animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <SplitText
            text="DEVELOP"
            className="text-6xl md:text-7xl lg:text-9xl font-black tracking-tight text-white"
            delay={50}
            animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0) rotateX(-90deg)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0) rotateX(0deg)" }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <GradientText
            className="text-5xl md:text-6xl lg:text-8xl font-black tracking-tight"
            colors={["#3b82f6", "#8b5cf6", "#06b6d4", "#3b82f6"]}
            animationSpeed={3}
          >
            EXPERIENCE
          </GradientText>
        </motion.div>

        {/* Subtitle with rotating text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex flex-col md:flex-row items-center gap-2 text-lg md:text-xl lg:text-2xl text-neutral-400 mt-4"
        >
          <span>Martin Tsang</span>
          <span className="hidden md:inline text-neutral-600">•</span>
          <RotatingText
            texts={["Software Engineer", "Full Stack Developer", "Tech Enthusiast", "Problem Solver"]}
            className="text-cyan-400 font-semibold"
            interval={2500}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="text-neutral-500 text-center max-w-md mt-2"
        >
          Building exceptional digital experiences in Toronto, Canada
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="flex gap-4 mt-6"
        >
          <MagnetButton magnetStrength={0.2}>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById("projects");
                if (element) {
                  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                  window.scrollTo({ top: elementPosition - 100, behavior: "smooth" });
                }
              }}
              className="group relative px-6 py-3 bg-white text-black font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(139,92,246,0.5)]"
            >
              <span className="relative z-10">View Projects</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold">
                View Projects
              </span>
            </a>
          </MagnetButton>

          <MagnetButton magnetStrength={0.2}>
            <a
              href="https://github.com/marttsang2"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/40 transition-all duration-300"
            >
              GitHub
            </a>
          </MagnetButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.8 }}
          className="absolute bottom-10 cursor-pointer"
          onClick={scrollToAbout}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-neutral-500 text-sm tracking-widest uppercase">Scroll</span>
            <div className="w-6 h-10 rounded-full border-2 border-neutral-500 flex items-start justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full bg-cyan-400"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />
    </div>
  );
}
