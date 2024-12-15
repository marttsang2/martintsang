"use client";

import { Typography } from "@/components/ui/typography";
import { motion } from "framer-motion";

interface ExperienceProps {
  company: string;
  position: string;
  duration: string;
  description: string[];
  technologies: string[];
}

const ExperienceItem = ({ company, position, duration, description, technologies }: ExperienceProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col gap-6 p-6 rounded-lg hover:bg-accent/10 transition-colors"
    >
      <div className="flex flex-col gap-2">
        <Typography variant="h3" className="font-semibold">
          {position} @ {company}
        </Typography>
        <Typography variant="muted" className="text-neutral-300">
          {duration}
        </Typography>
      </div>
      <div className="flex flex-col gap-4">
        {description.map((item, index) => (
          <Typography key={index} variant="muted" className="text-neutral-300">
            • {item}
          </Typography>
        ))}
      </div>
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
    </motion.div>
  );
};

export default function Experiences() {
  const experiences: ExperienceProps[] = [
    {
      company: "Asynk",
      position: "Software Developer",
      duration: "Feb 2023 - Present",
      description: [
        "Developed a career development platform using Next JS, Typescript from scratch with a team of 5 members",
        "Led a new team member in building a resume builder tool using Node JS, improving ATS scan success by 30%",
        "Deployed the frontend and backend services in Kubernetes environment using AWS ECR, AWS EKS"
      ],
      technologies: ["Next.js", "TypeScript", "Node.js", "AWS", "Kubernetes"]
    },
    {
      company: "Ace Innovation Limited",
      position: "Software Developer", 
      duration: "Jan 2024 - May 2024",
      description: [
        "Developed a game provider service using Java, Spring Boot, OracleDB, leading to increased customer retention",
        "Enhanced user validation service by incorporating Jumio KYC Identity verification and Google Address Validation Service"
      ],
      technologies: ["Java", "Spring Boot", "Oracle", "Jumio KYC"]
    },
    {
      company: "Apoidea",
      position: "Software Engineer",
      duration: "Mar 2022 - Jan 2024", 
      description: [
        "Developed a generic financial analysis report-generation module for efficient data manipulation and analysis",
        "Developed a microservice module using Node JS to handle PDF file-based integrations",
        "Utilized MongoDB to handle and process data from machine learning models, enhancing data management capabilities"
      ],
      technologies: ["Node.js", "MongoDB", "Microservices"]
    },
    {
      company: "P L Technology Limited",
      position: "Software Engineer",
      duration: "Jan 2021 - Feb 2022",
      description: [
        "Implemented Selenium web crawlers to automate digital marketing data extraction, eliminating 2 manual workforce",
        "Continuously improved features on a loan website using React JS and Django with a team of 5 engineers",
        "Revamped over 200 test cases, increasing code coverage by 40% and reducing post-deployment issues by 60%"
      ],
      technologies: ["React", "Django", "Selenium", "Python"]
    }
  ];

  return (
    <div id="experiences" className="min-h-screen w-full px-4 md:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        <Typography variant="h2" className="text-5xl lg:text-7xl font-bold mb-12 uppercase text-center lg:text-left px-6">
          Work<br/>
          <span className="text-yellow-300">Experience</span>
        </Typography>
        <div className="flex flex-col gap-12">
          {experiences.map((experience, index) => (
            <ExperienceItem key={index} {...experience} />
          ))}
        </div>
      </div>
    </div>
  );
}
