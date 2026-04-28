"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

interface SkillCategory {
  label: string;
  items: string[];
}

const skills: SkillCategory[] = [
  {
    label: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vite", "Framer Motion"],
  },
  {
    label: "Backend",
    items: ["Java", "Spring Boot", "Node.js", "Python", "Django", "Go"],
  },
  {
    label: "Databases",
    items: ["PostgreSQL", "MongoDB", "Oracle", "Redis", "Flyway"],
  },
  {
    label: "Cloud & DevOps",
    items: ["AWS (EKS, ECR)", "Kubernetes", "Docker", "CodeBuild", "Vercel", "Cloudflare"],
  },
  {
    label: "Tooling",
    items: ["Git", "GitHub Actions", "Linear", "Figma", "Postman"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-24 sm:py-32">
      <SectionHeading
        eyebrow="04 / Toolbox"
        title="Tech stack"
        description="The languages, frameworks, and tools I reach for most often."
      />
      <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((category, i) => (
          <motion.div
            key={category.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="flex flex-col gap-4 bg-background p-6 transition-colors hover:bg-white/[0.02]"
          >
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-yellow-300">
              {category.label}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {category.items.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-neutral-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
