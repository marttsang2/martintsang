import React from 'react'
import Section from './Section'
import Image from 'next/image'

type SkillTagProps = {
    label: string;
}

const SkillTag = ({ label }: SkillTagProps) => {
  return (
    <span className='px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded-md text-xs'>{label}</span>
  )
}

type SkillSectionProps = {
    title: string;
    skills: string[];
}

const SkillSection = ({ title, skills }: SkillSectionProps) => {
  return (
    <div className='flex flex-col md:flex-row md:items-center gap-4'>
      <h1 className='text-sm w-44'>{title}</h1>
      <div className='flex gap-2'>
        {skills.map((skill) => (
          <SkillTag label={skill} key={skill} />
        ))}
      </div>
    </div>
  )
}

const AboutSection = () => {
  return (
    <Section id='about'>
      <div className='relative grid grid-cols-1 lg:grid-cols-2 gap-4 items-center'>
        <div className='w-full flex justify-center'>
          <Image src="/selfie.svg" alt="hero" width={600} height={500} />
        </div>
        <div className='flex flex-col gap-3'>
          <h1 className='text-4xl font-bold'>Martin Tsang</h1>
          <p className='text-xl font-semibold'>A Software Engineer</p>
          <p className='my-2 dark:text-white opacity-75 leading-[1.5]'>
            {`Hi, I'm Martin, a software engineer from Toronto. I am legally entitled to work in Canada, and currently seeking for any opportunities available in Canada.`}
          </p>
          <SkillSection title='Frontend & Design' skills={['Next.js', 'React.js', 'Redux', 'SASS']} />
          <SkillSection title='Backend Development' skills={['Nest.js', 'Express.js', 'Spring Boot']} />
          <SkillSection title='Database Management' skills={['Postgresql', 'MySQL', 'MongoDB', 'Redis']} />
          <SkillSection title='Cloud Computing' skills={['AWS', 'GCP']} />
          <SkillSection title='Programming Language' skills={['Java', 'Typescript', 'Javascript', 'Python']} />
          <SkillSection title='Language' skills={['Cantonese', 'English', 'Mandarin']} />
        </div>
      </div>
    </Section>
  )
}

export default AboutSection