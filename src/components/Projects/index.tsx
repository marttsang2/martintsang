"use client";

import { Typography } from "@/components/ui/typography";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProjectProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link?: string;
}

const ProjectItem = ({ title, description, image, technologies, link }: ProjectProps) => {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col md:flex-row gap-8 p-6 rounded-lg hover:bg-accent/10 transition-colors"
    >
      <div className="relative w-full md:w-1/3 aspect-square rounded-lg overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-4 w-full md:w-1/2">
        <Typography variant="h3" className="font-semibold">
          {title}
        </Typography>
        <Typography variant="muted" className="text-muted-foreground">
          {description}
        </Typography>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs bg-secondary rounded-full text-secondary-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div className="absolute top-6 right-6 text-yellow-300 group-hover:translate-x-2 transition-transform duration-200">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </div>
    </motion.a>
  );
};

export default function Projects() {
  const projects: ProjectProps[] = [
    {
      title: "WP Legal And Notary Public",
      description: "A modern website for a legal firm providing notary public and legal services in Toronto.",
      image: "/projects/wplegal.png",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Google Analytics", "SEO"],
      link: "https://wplegal.ca"
    },
    {
      title: "Jomud",
      description: "An AI-powered job search platform that streamlines the application process and matches candidates with ideal opportunities.",
      image: "/projects/jomud.png",
      technologies: ["Next.js", "Java Spring Boot", "PostgreSQL", "AWS"],
      link: "https://jomud.com"
    },
    // Add more projects as needed
  ];

  return (
    <div id="projects" className="min-h-screen w-full px-4 md:px-8 text-white">
      <div className="max-w-7xl mx-auto">
      <Typography variant="h2" className="text-5xl lg:text-7xl font-bold mb-12 uppercase text-center lg:text-left px-6">
          Recent<br/>
          <span className="text-yellow-300">Projects</span>
        </Typography>
        <div className="flex flex-col gap-12">
          {projects.map((project, index) => (
            <ProjectItem key={index} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
}
