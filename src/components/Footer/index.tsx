"use client";

export default function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <span>
          © {new Date().getFullYear()} Martin Tsang · Built in Toronto
        </span>
        <span className="font-mono">
          Next.js · TypeScript · Tailwind
        </span>
      </div>
    </footer>
  );
}
