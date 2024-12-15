"use client";

import { Home, FolderKanban, Briefcase, LucideProps } from "lucide-react";
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
}

const NavItem = ({ href, icon: Icon, label }: NavItemProps) => (
  <Tooltip delayDuration={100}>
    <TooltipTrigger asChild>
      <button
        onClick={() => {
          const element = document.getElementById(href.replace("/", "") || "hero");
          if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: elementPosition - 100, behavior: "smooth" });
          }
        }}
        className="text-white hover:text-white transition-colors"
      >
        <Icon size={24} />
      </button>
    </TooltipTrigger>
    <TooltipContent>
      <p>{label}</p>
    </TooltipContent>
  </Tooltip>
);

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-black flex justify-center z-50">
      <div className="px-4 sm:px-6 lg:px-8 mt-4 py-1 bg-[#ffffff12] rounded-2xl">
        <div className="flex items-center justify-center space-x-8 py-2">
          <TooltipProvider>
            <NavItem href="/" icon={Home} label="Home" />
            <NavItem href="/projects" icon={FolderKanban} label="Projects" />
            <NavItem href="/experiences" icon={Briefcase} label="Experiences" />
          </TooltipProvider>
        </div>
      </div>
    </nav>
  );
}
