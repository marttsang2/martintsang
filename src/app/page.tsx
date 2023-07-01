import Image from 'next/image'
import React from 'react'
import ExperienceCard from '@/components/Card/ExperienceCard'
import experiences from '@/constants/expereinces'
import aboutMe from '@/constants/aboutMe'
import Section from '@/components/Section'
import ProjectCard from '@/components/Card/ProjectCard'
import projects from '@/constants/projects'

export default function Home() {
  return (
    <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
      <main className="flex flex-col items-center">
        <div className="relative lg:flex lg:justify-between lg:gap-4">
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
            <div className='flex flex-col'>
              <p className="text-5xl font-bold">
                Martin Tsang
              </p>
              <p className="text-xl font-medium mt-2">
                Software Engineer at Apoidea
              </p>
            </div>
            <div className="grid grid-cols-8 mt-12">
              <a href="https://github.com/marttsang2">
                <Image src="/icons/github.svg" alt="github icon" width={32} height={32} />
              </a>
              <a href="https://www.linkedin.com/in/martin-tsang-7608401aa/">
                <Image src="/icons/linkedin.svg" alt="linkedin icon" width={32} height={32} />
              </a>
            </div>
          </header>
          <div className='pt-12 lg:w-1/2 lg:py-24'>
            <p className=" whitespace-pre-line">{
              aboutMe.map((text) => <p key={text} className="mb-4 text-medium font-sm text-slate-400">{text}<br /></p>)
            }</p>
            <Section title='Experience'>
              {
                experiences.map((experience) => (
                  <ol key={experience.title} className="lg:mb-12">
                    <ExperienceCard
                      title={experience.title}
                      company={experience.company}
                      startDate={experience.startDate}
                      endDate={experience.endDate}
                      skills={experience.skills}
                      description={experience.description}
                      url={experience.url}
                    />
                  </ol>
                ))
              }
            </Section>
            <Section title='Project'>
              {
                projects.map((project) => (
                  <ol key={project.title} className="lg:mb-12">
                    <ProjectCard
                      title={project.title}
                      company={project.company}
                      date={project.date}
                      skills={project.skills}
                      description={project.description}
                      url={project.url}
                    />
                  </ol>
                ))
              }
            </Section>
          </div>
        </div>
      </main>
    </div>
  )
}
