import Image from 'next/image'
import React from 'react'
import { ExperienceCard } from '../components/Card'
import experiences from '../constants/expereinces'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center py-24 px-96">
      <div className="relative w-full grid grid-cols-2 gap-4">
        <div>
          <div className="sticky h-[85vh] top-24 flex flex-col justify-between">
            <div className='flex flex-col'>
              <p className="text-5xl font-bold">
                Martin Tsang
              </p>
              <p className="text-xl font-medium mt-2">
                Software Engineer at Apoidea
              </p>
            </div>
            <div className="grid grid-cols-8">
              <a href="https://github.com/marttsang2">
                <Image src="/icons/github.svg" alt="github icon" width={32} height={32} />
              </a>
              <a href="https://www.linkedin.com/in/martin-tsang-7608401aa/">
                <Image src="/icons/linkedin.svg" alt="linkedin icon" width={32} height={32} />
              </a>
            </div>
          </div>
        </div>
        <li className="flex flex-col group/list">
          {
            experiences.map((experience) => (
              <ol key={experience.title} className="mb-12">
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
        </li>
      </div>
    </main>
  )
}
