"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import TiltCard from "@/components/ui/tilt-card";
import MagnetButton from "@/components/ui/magnet-button";
import AnimatedCounter from "@/components/ui/animated-counter";

export default function InfoCard() {
  const stats = [
    { label: "Years Exp", value: 4, suffix: "+" },
    { label: "Projects", value: 20, suffix: "+" },
    { label: "Clients", value: 10, suffix: "+" },
  ];

  return (
    <motion.div
      id="about"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="lg:sticky lg:top-20"
    >
      <TiltCard
        className="w-full lg:w-80"
        tiltStrength={8}
        glareStrength={0.2}
      >
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-black/50 backdrop-blur-xl p-8">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-purple-500/10 to-transparent pointer-events-none" />
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-[60px] pointer-events-none" />

          {/* Profile image */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative z-10 mx-auto"
          >
            <div className="relative w-32 h-32 mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 animate-spin-slow opacity-75 blur-sm" />
              <div className="absolute inset-1 rounded-full bg-black" />
              <Image
                src="/avatar.jpg"
                alt="Martin Tsang"
                fill
                className="rounded-full object-cover p-1"
                priority
              />
            </div>

            {/* Status indicator */}
            <div className="absolute bottom-2 right-1/2 translate-x-8 flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs text-green-400">Available</span>
            </div>
          </motion.div>

          {/* Name and title */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative z-10 text-center mt-6"
          >
            <h2 className="text-2xl font-bold text-white">Martin Tsang</h2>
            <p className="text-cyan-400 font-medium mt-1">Software Engineer</p>
            <div className="flex items-center justify-center gap-1 text-neutral-400 text-sm mt-2">
              <MapPin size={14} />
              <span>Toronto, Canada</span>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative z-10 grid grid-cols-3 gap-4 mt-6 py-4 border-y border-white/10"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-xl font-bold text-white">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    duration={1.5}
                    delay={0.5 + index * 0.1}
                  />
                </div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="relative z-10 flex justify-center gap-3 mt-6"
          >
            <MagnetButton magnetStrength={0.3}>
              <a
                href="https://github.com/marttsang2"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300"
              >
                <Github className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
              </a>
            </MagnetButton>

            <MagnetButton magnetStrength={0.3}>
              <a
                href="https://linkedin.com/in/marttsang2"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
              </a>
            </MagnetButton>

            <MagnetButton magnetStrength={0.3}>
              <a
                href="mailto:contact@martintsang.dev"
                className="group p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300"
              >
                <Mail className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
              </a>
            </MagnetButton>
          </motion.div>

          {/* Contact button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="relative z-10 mt-6"
          >
            <a
              href="mailto:contact@martintsang.dev"
              className="group relative block w-full py-3 text-center rounded-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative font-semibold text-white">Get in Touch</span>
            </a>
          </motion.div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
