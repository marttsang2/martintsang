"use client";

import { motion } from "framer-motion";
import { Building2, Calendar, ChevronRight } from "lucide-react";
import SplitText from "@/components/ui/split-text";
import GradientText from "@/components/ui/gradient-text";

interface ExperienceProps {
  company: string;
  position: string;
  duration: string;
  description: string[];
  technologies: string[];
}

const ExperienceCard = ({
  company,
  position,
  duration,
  description,
  technologies,
  index,
}: ExperienceProps & { index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      {/* Timeline connector */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-cyan-500 to-transparent hidden md:block" />

      {/* Timeline dot */}
      <div className="absolute -left-[5px] top-8 hidden md:block">
        <div className="relative">
          <div className="w-3 h-3 rounded-full bg-cyan-500 group-hover:bg-purple-500 transition-colors duration-300" />
          <div className="absolute inset-0 w-3 h-3 rounded-full bg-cyan-500 animate-ping opacity-50" />
        </div>
      </div>

      {/* Card */}
      <div className="md:ml-8 p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors flex items-center gap-2">
              {position}
              <ChevronRight className="w-5 h-5 text-neutral-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-300" />
            </h3>
            <div className="flex items-center gap-2 text-neutral-400 mt-1">
              <Building2 className="w-4 h-4" />
              <span className="font-medium">{company}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <Calendar className="w-4 h-4" />
            <span>{duration}</span>
          </div>
        </div>

        {/* Description */}
        <ul className="space-y-3 mb-4">
          {description.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
              className="flex items-start gap-3 text-neutral-400"
            >
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex-shrink-0" />
              <span className="leading-relaxed">{item}</span>
            </motion.li>
          ))}
        </ul>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-white/10 text-neutral-300 hover:border-cyan-500/50 transition-colors"
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
  const experiences: ExperienceProps[] = [
    {
      company: "Asynk",
      position: "Software Developer",
      duration: "Feb 2023 - Present",
      description: [
        "Developed a career development platform using Next JS, Typescript from scratch with a team of 5 members",
        "Led a new team member in building a resume builder tool using Node JS, improving ATS scan success by 30%",
        "Deployed the frontend and backend services in Kubernetes environment using AWS ECR, AWS EKS",
      ],
      technologies: ["Next.js", "TypeScript", "Node.js", "AWS", "Kubernetes"],
    },
    {
      company: "Ace Innovation Limited",
      position: "Software Developer",
      duration: "Jan 2024 - May 2024",
      description: [
        "Developed a game provider service using Java, Spring Boot, OracleDB, leading to increased customer retention",
        "Enhanced user validation service by incorporating Jumio KYC Identity verification and Google Address Validation Service",
      ],
      technologies: ["Java", "Spring Boot", "Oracle", "Jumio KYC"],
    },
    {
      company: "Apoidea",
      position: "Software Engineer",
      duration: "Mar 2022 - Jan 2024",
      description: [
        "Developed a generic financial analysis report-generation module for efficient data manipulation and analysis",
        "Developed a microservice module using Node JS to handle PDF file-based integrations",
        "Utilized MongoDB to handle and process data from machine learning models, enhancing data management capabilities",
      ],
      technologies: ["Node.js", "MongoDB", "Microservices"],
    },
    {
      company: "P L Technology Limited",
      position: "Software Engineer",
      duration: "Jan 2021 - Feb 2022",
      description: [
        "Implemented Selenium web crawlers to automate digital marketing data extraction, eliminating 2 manual workforce",
        "Continuously improved features on a loan website using React JS and Django with a team of 5 engineers",
        "Revamped over 200 test cases, increasing code coverage by 40% and reducing post-deployment issues by 60%",
      ],
      technologies: ["React", "Django", "Selenium", "Python"],
    },
  ];

  return (
    <div id="experiences" className="w-full px-4 md:px-8 text-white py-20">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="text-cyan-400 text-sm font-medium tracking-widest uppercase">Career</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          </div>

          <div className="text-center">
            <SplitText
              text="Work Experience"
              className="text-4xl md:text-5xl lg:text-6xl font-bold"
              delay={30}
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-neutral-400 mt-4 max-w-xl mx-auto"
            >
              My professional journey building{" "}
              <GradientText colors={["#8b5cf6", "#06b6d4", "#8b5cf6"]} animationSpeed={3}>
                scalable solutions
              </GradientText>
            </motion.p>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative space-y-8 md:pl-8">
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} {...experience} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
