"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import SpotlightCard from "@/components/ui/spotlight-card";
import SplitText from "@/components/ui/split-text";
import GradientText from "@/components/ui/gradient-text";

interface ProjectProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link?: string;
  github?: string;
  featured?: boolean;
}

const ProjectCard = ({ title, description, image, technologies, link, github, featured }: ProjectProps) => {
  return (
    <SpotlightCard
      className={`group ${featured ? "md:col-span-2" : ""}`}
      spotlightColor="rgba(6, 182, 212, 0.15)"
    >
      <div className={`flex flex-col ${featured ? "md:flex-row" : ""} gap-6 p-6`}>
        {/* Image */}
        <div className={`relative ${featured ? "md:w-1/2" : "w-full"} aspect-video rounded-xl overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Overlay icons */}
          <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-black/50 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-white" />
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-black/50 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors"
              >
                <Github className="w-4 h-4 text-white" />
              </a>
            )}
          </div>
        </div>

        {/* Content */}
        <div className={`flex flex-col gap-4 ${featured ? "md:w-1/2 md:justify-center" : ""}`}>
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
              {title}
            </h3>
            <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
          </div>

          <p className="text-neutral-400 leading-relaxed">{description}</p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-neutral-300 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* View project link */}
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors mt-2"
            >
              <span>View Project</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
};

export default function Projects() {
  const projects: ProjectProps[] = [
    {
      title: "WP Legal And Notary Public",
      description:
        "A modern, responsive website for a legal firm providing notary public and legal services in Toronto. Features include appointment booking, service information, and SEO optimization.",
      image: "/projects/wplegal.png",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Google Analytics", "SEO"],
      link: "https://wplegal.ca",
      featured: true,
    },
    {
      title: "Jomud",
      description:
        "An AI-powered job search platform that streamlines the application process and matches candidates with ideal opportunities using advanced machine learning algorithms.",
      image: "/projects/jomud.png",
      technologies: ["Next.js", "Java Spring Boot", "PostgreSQL", "AWS"],
      link: "https://jomud.io",
      featured: true,
    },
  ];

  return (
    <div id="projects" className="w-full px-4 md:px-8 text-white py-20">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
            <span className="text-purple-400 text-sm font-medium tracking-widest uppercase">Portfolio</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          </div>

          <div className="text-center">
            <SplitText
              text="Recent Projects"
              className="text-4xl md:text-5xl lg:text-6xl font-bold"
              delay={30}
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-neutral-400 mt-4 max-w-xl mx-auto"
            >
              A selection of projects that showcase my skills in building{" "}
              <GradientText colors={["#06b6d4", "#8b5cf6", "#06b6d4"]} animationSpeed={3}>
                modern web applications
              </GradientText>
            </motion.p>
          </div>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>

        {/* View more CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/marttsang2"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-neutral-400 hover:text-white hover:border-white/30 transition-all duration-300"
          >
            <Github className="w-5 h-5" />
            <span>View More on GitHub</span>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
