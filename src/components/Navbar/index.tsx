"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, FolderKanban, Briefcase, User, LucideProps } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface NavItemProps {
  href: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  label: string;
  isActive?: boolean;
}

const NavItem = ({ href, icon: Icon, label, isActive }: NavItemProps) => (
  <Tooltip delayDuration={100}>
    <TooltipTrigger asChild>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          const element = document.getElementById(href.replace("/", "") || "hero");
          if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: elementPosition - 100, behavior: "smooth" });
          }
        }}
        className={`relative p-3 rounded-xl transition-all duration-300 ${
          isActive
            ? "text-white bg-white/10"
            : "text-neutral-400 hover:text-white hover:bg-white/5"
        }`}
      >
        <Icon size={20} />
        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </motion.button>
    </TooltipTrigger>
    <TooltipContent
      side="bottom"
      className="bg-black/90 backdrop-blur-md border border-white/10 text-white"
    >
      <p>{label}</p>
    </TooltipContent>
  </Tooltip>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section
      const sections = ["hero", "about", "projects", "experiences"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="fixed top-0 w-full flex justify-center z-50 px-4 pt-4"
      >
        <motion.div
          animate={{
            backgroundColor: scrolled ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.3)",
            backdropFilter: scrolled ? "blur(20px)" : "blur(10px)",
          }}
          transition={{ duration: 0.3 }}
          className="px-2 py-2 rounded-2xl border border-white/10 shadow-lg"
        >
          <div className="flex items-center justify-center gap-1">
            <TooltipProvider>
              <NavItem
                href="/"
                icon={Home}
                label="Home"
                isActive={activeSection === "hero"}
              />
              <NavItem
                href="/about"
                icon={User}
                label="About"
                isActive={activeSection === "about"}
              />
              <NavItem
                href="/projects"
                icon={FolderKanban}
                label="Projects"
                isActive={activeSection === "projects"}
              />
              <NavItem
                href="/experiences"
                icon={Briefcase}
                label="Experience"
                isActive={activeSection === "experiences"}
              />
            </TooltipProvider>
          </div>
        </motion.div>
      </motion.nav>
    </AnimatePresence>
  );
}
