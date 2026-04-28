"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

interface ProjectProps {
  title: string;
  role: string;
  year: string;
  description: string;
  highlights: string[];
  technologies: string[];
  image?: string;
  fallbackInitials: string;
  fallbackGradient: string;
  link: string;
  linkLabel: string;
}

const projects: ProjectProps[] = [
  {
    title: "GoPlace",
    role: "Lead Engineer",
    year: "2024 — Present",
    description:
      "Multi-tenant booking platform for spas and wellness studios. Powers staff scheduling, customer bookings, and admin operations for live businesses in the GTA.",
    highlights: [
      "Designed event-driven domain model unifying bookings, breaks, and vacations on one entity",
      "Implemented JWT auth with refresh-token queueing and action-keyed RBAC",
      "Deployed Spring Boot + dual React apps on AWS EKS via CodeBuild → ECR pipelines",
    ],
    technologies: ["Spring Boot", "Java 21", "PostgreSQL", "React", "Vite", "AWS EKS", "Flyway"],
    image: "/projects/goplace.png",
    fallbackInitials: "GP",
    fallbackGradient: "from-yellow-300/30 via-orange-400/20 to-rose-400/10",
    link: "https://booking.goplace.com",
    linkLabel: "booking.goplace.com",
  },
  {
    title: "WP Legal & Notary Public",
    role: "Full-Stack Developer",
    year: "2024",
    description:
      "Multi-language marketing site for a Toronto legal and notary firm. Bilingual content, SEO-tuned, integrated with Resend for lead capture and Telegram for instant notifications.",
    highlights: [
      "Bilingual EN/ZH content via next-intl with MDX-driven articles",
      "Schema.org structured data and Google Analytics for SEO performance",
      "Lead form → Resend email + Telegram bot for real-time alerts",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind", "next-intl", "Resend", "Vercel"],
    image: "/projects/wplegal.png",
    fallbackInitials: "WP",
    fallbackGradient: "from-blue-400/30 via-indigo-400/20 to-violet-400/10",
    link: "https://wplegal.ca",
    linkLabel: "wplegal.ca",
  },
  {
    title: "Help Me Clean",
    role: "Full-Stack Developer",
    year: "2024",
    description:
      "Marketing site for a GTA cleaning company serving medical, industrial, and food-processing facilities. Multi-language, SEO-first, with an automated PDF intro generator for B2B outreach.",
    highlights: [
      "Custom PDF generation pipeline with PDFKit for branded sales collateral",
      "next-intl + MDX for service pages across multiple languages",
      "Vercel Analytics + Speed Insights to monitor Core Web Vitals",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind", "PDFKit", "next-intl", "Resend"],
    image: "/projects/helpmeclean.png",
    fallbackInitials: "HMC",
    fallbackGradient: "from-emerald-300/30 via-teal-400/20 to-cyan-400/10",
    link: "https://helpmeclean.ca",
    linkLabel: "helpmeclean.ca",
  },
  {
    title: "Jomud",
    role: "Founding Engineer",
    year: "2023",
    description:
      "AI-powered job search platform that matches candidates with roles and streamlines applications. Built the resume builder tool that boosted ATS scan success by 30%.",
    highlights: [
      "Resume builder generating ATS-optimized PDFs from structured data",
      "Spring Boot service layer with PostgreSQL, deployed on AWS",
      "Next.js frontend with server-rendered job listings and search",
    ],
    technologies: ["Next.js", "Spring Boot", "PostgreSQL", "AWS", "TypeScript"],
    image: "/projects/jomud.png",
    fallbackInitials: "JM",
    fallbackGradient: "from-fuchsia-400/30 via-pink-400/20 to-rose-400/10",
    link: "https://jomud.io",
    linkLabel: "jomud.io",
  },
];

const ProjectCard = ({ project, index }: { project: ProjectProps; index: number }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-colors hover:border-yellow-300/30"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr,1fr]">
        <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[340px]">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div
              className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${project.fallbackGradient}`}
            >
              <span className="font-mono text-7xl font-light tracking-tight text-white/80">
                {project.fallbackInitials}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        <div className="flex flex-col justify-between gap-6 p-6 sm:p-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
                {project.title}
              </h3>
              <span className="font-mono text-xs text-neutral-500">{project.year}</span>
            </div>
            <span className="text-sm text-yellow-300">{project.role}</span>
            <p className="text-sm leading-relaxed text-neutral-400">
              {project.description}
            </p>
            <ul className="mt-2 flex flex-col gap-2">
              {project.highlights.map((h) => (
                <li
                  key={h}
                  className="flex gap-2 text-sm leading-relaxed text-neutral-400"
                >
                  <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-yellow-300" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-neutral-300"
                >
                  {tech}
                </span>
              ))}
            </div>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-1.5 text-sm text-white transition-colors hover:text-yellow-300"
            >
              {project.linkLabel}
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 py-24 sm:py-32">
      <SectionHeading
        eyebrow="02 / Selected work"
        title="Recent projects"
        description="A small selection of production systems I&apos;ve designed and shipped over the past two years."
      />
      <div className="mt-12 flex flex-col gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
