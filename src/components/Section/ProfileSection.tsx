import React from 'react'
import Section from './Section'
import { educations, experiences } from '@/constants/profile'

const ExperienceSection = () => {
  return (
    <div className='flex flex-col gap-4 mt-10'>
      <h1 className='text-2xl font-semibold mb-4'>Experience</h1>
      {
        experiences.map((experience) => (
          <div key={experience.company} className='grid lg:grid-cols-6 grid-cols-1 gap-2'>
            <div className='col-span-2 flex flex-col gap-1'>
              <p className='text-xl font-semibold'>{experience.company}</p>
              <p className='text-sm font-light'>{experience.date}</p>
            </div>
            <div className='col-span-4 flex flex-col gap-2'>
              <p className='text-xl font-bold text-gray-900'>{experience.title}</p>
              <ul>
                {
                  experience.descriptions.map((description: string) => (
                    <li key={description} className='list-disc list-inside text-base ≈'>{description}</li>
                  ))
                }
              </ul>
            </div>
          </div>
        ))
      }
    </div>
  )
}

const EducationSection = () => {
  return (
    <div className='flex flex-col gap-4 mt-10'>
      <h1 className='text-2xl font-semibold mb-4'>Education</h1>
      {
        educations.map((education) => (
          <div key={education.school} className='grid lg:grid-cols-6 grid-cols-1 gap-2'>
            <div className='col-span-2'>
              <p className='text-xl font-semibold'>{education.school}</p>
              <p className='text-sm font-light'>{education.date}</p>
            </div>
            <div className='col-span-4 flex flex-col gap-2'>
              <p className='text-xl font-bold text-gray-900'>{education.title}</p>
              <p className='text-gray-700'>{education.descriptions}</p>
            </div>
          </div>
        ))
      }
    </div>
  )
}

const ProfileSection = () => {
  return (
    <Section id='profile' label='My Profile'>
      <ExperienceSection />
      <EducationSection />
    </Section>
  )
}

export default ProfileSection