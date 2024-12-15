"use client";

import Image from "next/image";
import { Typography } from "@/components/ui/typography";
import { Github, Linkedin } from "lucide-react";

export default function InfoCard() {
  return (
    <div id="about" className="lg:sticky lg:top-20 flex flex-col items-center gap-4 bg-[#ffffff] p-10 rounded-lg h-[30rem] w-full lg:w-80">
      <div className="relative w-60 h-60">
        <Image
          src="/avatar.jpg" 
          alt="Martin Tsang"
          fill
          className="rounded-lg object-cover"
          priority
        />
      </div>
      <div className="flex flex-col">
        <Typography variant="h2" className="font-black uppercase">
          Martin Tsang
        </Typography>
        <Typography variant="h4" className="text-muted-foreground text-center">
          Software Engineer
        </Typography>
      </div>
      <div className="flex gap-4">
        <a
          href="https://github.com/marttsang2"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-black text-white hover:bg-yellow-300 transition-colors"
        >
          <Github />
        </a>
        <a
          href="https://linkedin.com/in/marttsang2"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-black text-white hover:bg-yellow-300 transition-colors"
        >
          <Linkedin />
        </a>
      </div>
    </div>
  );
}
