"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import GradientText from "@/components/ui/gradient-text";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/marttsang2", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/marttsang2", label: "LinkedIn" },
    { icon: Mail, href: "mailto:contact@martintsang.dev", label: "Email" },
  ];

  return (
    <footer className="relative w-full border-t border-white/10">
      {/* Gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center gap-8">
          {/* Logo/Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold">
              <GradientText colors={["#06b6d4", "#8b5cf6", "#3b82f6", "#06b6d4"]} animationSpeed={5}>
                Martin Tsang
              </GradientText>
            </h3>
            <p className="text-neutral-500 text-sm mt-2">Software Engineer</p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-xl bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                aria-label={link.label}
              >
                <link.icon size={20} />
              </motion.a>
            ))}
          </motion.div>

          {/* Divider */}
          <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Copyright & Credits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center gap-2 text-center"
          >
            <p className="text-neutral-500 text-sm">
              © {currentYear} Martin Tsang. All rights reserved.
            </p>
            <p className="text-neutral-600 text-xs flex items-center gap-1">
              Built with <Heart size={12} className="text-red-500" /> using Next.js, TypeScript & Tailwind CSS
            </p>
          </motion.div>
        </div>
      </div>

      {/* Background gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
    </footer>
  );
}
