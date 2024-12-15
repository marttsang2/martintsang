"use client";

import { Typography } from "@/components/ui/typography";

export default function Footer() {
  return (
    <footer className="w-full px-4 md:px-8 py-8 border-t border-accent/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <Typography variant="small" className="text-neutral-400">
          © {new Date().getFullYear()} Martin Tsang. All rights reserved.
        </Typography>
        <Typography variant="small" className="text-neutral-400">
          Built with Next.js, TypeScript, and Tailwind CSS
        </Typography>
      </div>
    </footer>
  );
}
