import React from 'react'
import { motion } from 'framer-motion'
import { IoArrowUp } from 'react-icons/io5';
import Link from 'next/link';

const experiences = [
  {
    title: "Software Engineer",
    company: "Asynk.ai",
    year: "2023",
    skills: ["Next.js", "Javascript", "Typescript", "Styled component"],
    description: "Built and Developed high-performance web apps from scratch using Next.js. Collaborated with designers and developers to create interactive components. Implemented server-side rendering and optimized performance for faster page loads.",
    url: ""
  },
  {
    title: "Software Engineer",
    company: "Apoidea",
    year: "2022",
    skills: ["TypeScript", "Nest.js", "MySQL", "MongoDB", "ActiveMQ", "Jest", "Mocha"],
    description: "Built scalable web apps with TypeScript and Nest.js, reducing bugs by implementing test-driven development. Automated testing and code reviews improved software quality. Active Agile/Scrum participation ensured adherence to best practices.",
    url: "https://www.apoidea.ai/"
  },
  {
    title: "Software Engineer",
    company: "P L Technology Limited",
    year: "2021",
    skills: ["Django", "Python", "React", "AWS", "PostgreSQL", "CodeBuild", "CodeDeploy"],
    description: "Developed student loan platforms using Django, React, AWS, and PostgreSQL. Implemented CI/CD pipelines with AWS CodeBuild and CodeDeploy, enhancing software delivery speed and efficiency.",
    url: "https://zwap.hk/"
  },
  {
    title: "Programmer (Part-time)",
    company: "Technine",
    year: "2021",
    skills: ["Next.js", "TypeScript", "Javascript", "MariaDB"],
    description: "Developed an e-commerce website (PewPewMall) using Next.js and TypeScript.",
    url: "https://technine.io/en"
  },
  {
    title: "Deep Learning Engineer (Intern)",
    company: "R2C2 Limited",
    year: "2020",
    skills: ["PyTorch", "Python"],
    description: "Developed a rock classification model (Rock Model) using PyTorch and Python.",
    url: "https://www.r2c2.ai/"
  }
];

const ExperienceSection = () => {
  return (
    <motion.ul className='group'>
      {
        experiences.map((experience, index) => (
          <Link href={experience.url} target="_blank" key={experience.company}>
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1 * (index / experiences.length)}}  
              className='group/item py-6 px-8 mb-2 w-full bg-gray-100 hover:bg-gray-600 hover:text-white dark:bg-[#0a182b] cursor-pointer rounded-lg' 
              key={experience.company}
            >
              <div className='hover:!opacity-100 group-hover:opacity-50'>
                <p className='relative inline-block pr-8 text-xl dark:text-gray-50 font-semibold'>
                  {experience.title}
                  <IoArrowUp size={20} className='absolute transition-all ease-in duration-100 top-0 right-0 m-1.5 group-hover/item:m-0 rotate-45' />
                </p>
                <p className='text-md dark:text-gray-50 opacity-75'>{experience.company} · {experience.year}</p>
                <p className='text-md dark:text-gray-50 opacity-75'>{experience.description}</p>
              </div>
            </motion.div>
          </Link>
        ))
      }
    </motion.ul>
  )
}

export default ExperienceSection