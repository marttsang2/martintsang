"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

interface ExperienceProps {
  company: string;
  position: string;
  duration: string;
  location?: string;
  description: string[];
  technologies: string[];
}

const experiences: ExperienceProps[] = [
  {
    company: "Asynk",
    position: "Software Developer",
    duration: "Feb 2023 — Present",
    location: "Remote",
    description: [
      "Built a career development platform with Next.js and TypeScript from scratch alongside a team of 5",
      "Led a new hire in shipping a resume builder service in Node.js, lifting ATS scan success by 30%",
      "Owned deployment of frontend and backend services to AWS EKS via ECR pipelines",
    ],
    technologies: ["Next.js", "TypeScript", "Node.js", "AWS", "Kubernetes"],
  },
  {
    company: "Ace Innovation Limited",
    position: "Software Developer",
    duration: "Jan 2024 — May 2024",
    location: "Hong Kong",
    description: [
      "Developed a game provider service in Java / Spring Boot / OracleDB, contributing to higher customer retention",
      "Integrated Jumio KYC identity verification and Google Address Validation into the user onboarding service",
    ],
    technologies: ["Java", "Spring Boot", "Oracle", "Jumio KYC"],
  },
  {
    company: "Apoidea",
    position: "Software Engineer",
    duration: "Mar 2022 — Jan 2024",
    location: "Hong Kong",
    description: [
      "Built a generic financial analysis report-generation module powering downstream data manipulation",
      "Shipped a Node.js microservice handling PDF-based integrations across multiple data pipelines",
      "Used MongoDB to manage data flowing from ML models, improving data lifecycle handling",
    ],
    technologies: ["Node.js", "MongoDB", "Microservices"],
  },
  {
    company: "P L Technology Limited",
    position: "Software Engineer",
    duration: "Jan 2021 — Feb 2022",
    location: "Hong Kong",
    description: [
      "Automated digital marketing data extraction with Selenium crawlers, eliminating 2 manual roles",
      "Iterated on a loan website using React and Django alongside a team of 5 engineers",
      "Revamped 200+ test cases, raising coverage by 40% and cutting post-deploy issues by 60%",
    ],
    technologies: ["React", "Django", "Selenium", "Python"],
  },
];

const ExperienceItem = ({
  company,
  position,
  duration,
  location,
  description,
  technologies,
  index,
}: ExperienceProps & { index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative grid grid-cols-1 gap-6 border-t border-white/5 pt-8 sm:grid-cols-[200px,1fr] sm:pt-10"
    >
      <div className="flex flex-col gap-1">
        <span className="font-mono text-xs uppercase tracking-wider text-neutral-500">
          {duration}
        </span>
        {location ? (
          <span className="text-xs text-neutral-600">{location}</span>
        ) : null}
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-xl font-medium tracking-tight text-white">
            {position}
            <span className="text-neutral-500"> · </span>
            <span className="text-yellow-300">{company}</span>
          </h3>
        </div>
        <ul className="flex flex-col gap-2">
          {description.map((item) => (
            <li
              key={item}
              className="flex gap-2 text-sm leading-relaxed text-neutral-400"
            >
              <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-yellow-300/60" />
              {item}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-1.5 pt-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-neutral-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function Experiences() {
  return (
    <section id="experiences" className="scroll-mt-24 py-24 sm:py-32">
      <SectionHeading
        eyebrow="03 / Career"
        title="Where I&apos;ve worked"
        description="Five years across startups and product companies in Toronto and Hong Kong."
      />
      <div className="mt-12 flex flex-col gap-2">
        {experiences.map((experience, i) => (
          <ExperienceItem key={experience.company} {...experience} index={i} />
        ))}
      </div>
    </section>
  );
}
