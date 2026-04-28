"use client";

import { useEffect, useState } from "react";

const links = [
  { id: "about", label: "About" },
  { id: "projects", label: "Work" },
  { id: "experiences", label: "Career" },
  { id: "skills", label: "Stack" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    const ids = ["hero", ...links.map((l) => l.id)];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top - 64, behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <div
        className={`flex items-center gap-1 rounded-full border px-2 py-1.5 backdrop-blur-md transition-colors ${
          scrolled
            ? "border-white/10 bg-black/60"
            : "border-white/5 bg-black/30"
        }`}
      >
        <button
          onClick={() => scrollTo("hero")}
          className="hidden px-3 py-1.5 text-sm font-medium text-white sm:block"
          aria-label="Home"
        >
          MT<span className="text-yellow-300">.</span>
        </button>
        <span className="hidden h-4 w-px bg-white/10 sm:block" />
        {links.map((link) => {
          const isActive = active === link.id;
          return (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {link.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
