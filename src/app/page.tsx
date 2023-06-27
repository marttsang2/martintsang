import React from 'react'
import { ExperienceCard } from '../components/Card'
import experiences from '../constants/expereinces'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center py-24 px-96">
      <div className="relative w-full grid grid-cols-2 gap-4">
        <div>
          <div className="sticky top-24 flex flex-col">
            <p className="text-5xl font-bold">
              Martin Tsang
            </p>
            <p className="text-xl font-medium mt-2">
              Software Engineer at Apoidea
            </p>
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
