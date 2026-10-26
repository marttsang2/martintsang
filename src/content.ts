export const site = {
  url: "https://martintsang.vercel.app",
  name: "Martin Tsang",
  jobTitle: "Software Engineer",
  title: "Martin Tsang — Software Engineer",
  description:
    "Software engineer in Toronto building production web platforms across booking, legal, and AI domains.",
  statement: "Software engineer building production web platforms.",
  intro:
    "I’m Martin — a software engineer based in Toronto. I design and ship full-stack systems across booking, legal, and AI domains, from Spring Boot backends on Kubernetes to polished React frontends.",
  availability: "Available for select freelance work",
  city: "Toronto",
  timeZone: "America/Toronto",
  email: "tsangmartin1225@gmail.com",
  github: "https://github.com/marttsang2",
  linkedin: "https://linkedin.com/in/marttsang2",
  avatar: "/avatar.jpg",
};

export type SectionId = "about" | "projects" | "experiences" | "skills" | "contact";

export const nav: { id: SectionId; label: string }[] = [
  { id: "about", label: "About" },
  { id: "projects", label: "Work" },
  { id: "experiences", label: "Career" },
  { id: "skills", label: "Stack" },
  { id: "contact", label: "Contact" },
];

export const about = {
  title: "A bit about me",
  location: "Toronto, Canada",
  facts: [
    { label: "Experience", value: "5+ yrs" },
    { label: "Shipped", value: "15+ projects" },
    { label: "Focus", value: "Full-stack" },
  ],
};

export type Project = {
  title: string;
  role: string;
  year: string;
  description: string;
  highlights: string[];
  technologies: string[];
  image: string;
  link: string;
  linkLabel: string;
};

export const projectsIntro = {
  title: "Recent projects",
  description:
    "A small selection of production systems I’ve designed and shipped over the past two years.",
};

export const projects: Project[] = [
  {
    title: "GoPlace",
    role: "Lead Engineer",
    year: "2024 – Present",
    description:
      "Multi-tenant booking platform for spas and wellness studios. Powers staff scheduling, customer bookings, and admin operations for live businesses in the GTA.",
    highlights: [
      "Designed event-driven domain model unifying bookings, breaks, and vacations on one entity",
      "Implemented JWT auth with refresh-token queueing and action-keyed RBAC",
      "Deployed Spring Boot + dual React apps on AWS EKS via CodeBuild → ECR pipelines",
    ],
    technologies: ["Spring Boot", "Java 21", "PostgreSQL", "React", "Vite", "AWS EKS", "Flyway"],
    image: "/projects/goplace.png",
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
    link: "https://jomud.io",
    linkLabel: "jomud.io",
  },
];

export type Role = {
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string[];
  technologies: string[];
};

export const careerIntro = {
  title: "Where I’ve worked",
  description: "Five years across startups and product companies in Toronto and Hong Kong.",
};

export const roles: Role[] = [
  {
    company: "Asynk",
    position: "Software Developer",
    duration: "Feb 2023 – Present",
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
    duration: "Jan 2024 – May 2024",
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
    duration: "Mar 2022 – Jan 2024",
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
    duration: "Jan 2021 – Feb 2022",
    location: "Hong Kong",
    description: [
      "Automated digital marketing data extraction with Selenium crawlers, eliminating 2 manual roles",
      "Iterated on a loan website using React and Django alongside a team of 5 engineers",
      "Revamped 200+ test cases, raising coverage by 40% and cutting post-deploy issues by 60%",
    ],
    technologies: ["React", "Django", "Selenium", "Python"],
  },
];

export type SkillGroup = { label: string; items: string[] };

export const stackIntro = {
  title: "Tech stack",
  description: "The languages, frameworks, and tools I reach for most often.",
};

export const skills: SkillGroup[] = [
  { label: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vite", "Framer Motion"] },
  { label: "Backend", items: ["Java", "Spring Boot", "Node.js", "Python", "Django", "Go"] },
  { label: "Databases", items: ["PostgreSQL", "MongoDB", "Oracle", "Redis", "Flyway"] },
  {
    label: "Cloud & DevOps",
    items: ["AWS (EKS, ECR)", "Kubernetes", "Docker", "CodeBuild", "Vercel", "Cloudflare"],
  },
  { label: "Tooling", items: ["Git", "GitHub Actions", "Linear", "Figma", "Postman"] },
];

export const contact = {
  title: "Have a project in mind?",
  followUp: "Let’s build it.",
  body: "I’m taking on a small number of new freelance and contract projects this year. The fastest way to reach me is email.",
};

export const footer = {
  credit: "Built in Toronto",
  builtWith: "Next.js · TypeScript · Tailwind",
};
