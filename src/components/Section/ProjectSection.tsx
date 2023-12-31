import React from 'react'
import Section from './Section'
import Image from 'next/image'
import Link from 'next/link'
import { IoLogoGithub } from 'react-icons/io5'
import projects from '@/constants/projects.json'

const ProjectSection = () => {
  return (
    <Section id='projects' label='My Projects'>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>
        {
          projects.map((project) => (
            <div key={project.name} className='relative border-2 border-gray-100 rounded-lg shadow-xl min-h-[340px]'>
              <Image src={project.backdropImage} alt='project' width={300} height={200} className='h-[160px] w-full object-cover rounded-tl-lg rounded-tr-lg' />
              <div className='flex flex-col gap-2 p-4'>
                <p className='text-xl font-semibold'>{project.name}</p>
                <p className='text-sm text-gray-600'>{project.description}</p>
                <div className='absolute bottom-4 flex items-center gap-2'>
                  {project.originLink && <Link href={project.originLink} className='self-start text-sm bg-slate-500 hover:bg-slate-600 text-white px-3 py-1 rounded-lg'>Link to Demo</Link>}
                  {project.githubLink && 
                  <Link href={project.githubLink} className='self-start text-sm bg-slate-500 hover:bg-slate-600 text-white px-3 py-1 rounded-lg flex items-center gap-1'>
                    <IoLogoGithub size={20} />
                    View Code
                  </Link>
                  }
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </Section>
  )
}

export default ProjectSection