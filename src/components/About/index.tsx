"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 py-24 sm:py-32">
      <SectionHeading eyebrow="01 / About" title="A bit about me" />

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[280px,1fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4"
        >
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/10">
            <Image
              src="/avatar.jpg"
              alt="Martin Tsang"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 280px"
              priority
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-400">
            <MapPin size={14} className="text-yellow-300" />
            Toronto, Canada
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col gap-6 text-base leading-relaxed text-neutral-300"
        >
          <p>
            I&apos;m a full-stack software engineer with five years of experience
            shipping production systems for startups and small businesses across
            North America and Hong Kong. I work end-to-end — from designing
            PostgreSQL schemas and Spring Boot APIs to deploying React frontends on
            Kubernetes.
          </p>
          <p>
            Lately I&apos;ve been building{" "}
            <span className="text-white">GoPlace</span>, a multi-tenant booking
            platform for spas and wellness studios, alongside conversion-focused
            sites for{" "}
            <span className="text-white">WP Legal &amp; Notary Public</span> and{" "}
            <span className="text-white">Help Me Clean</span>. I care about
            measurable outcomes: faster page loads, higher form conversion, fewer
            on-call pages.
          </p>
          <p>
            Outside of work, I write Go for fun, lift heavy things, and explore
            Toronto&apos;s coffee scene.
          </p>

          <dl className="mt-4 grid grid-cols-2 gap-6 border-t border-white/5 pt-8 sm:grid-cols-3">
            <div>
              <dt className="text-xs uppercase tracking-wider text-neutral-500">
                Experience
              </dt>
              <dd className="mt-1 text-2xl font-medium text-white">5+ yrs</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-neutral-500">
                Shipped
              </dt>
              <dd className="mt-1 text-2xl font-medium text-white">15+ projects</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-neutral-500">
                Focus
              </dt>
              <dd className="mt-1 text-2xl font-medium text-white">Full-stack</dd>
            </div>
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
