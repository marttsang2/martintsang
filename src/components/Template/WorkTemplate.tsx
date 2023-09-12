import React from 'react'
import Container from '../Container/Container'
import Image from 'next/image'
import Link from 'next/link'
import { IoArrowBack, IoEye } from 'react-icons/io5'

export type WorkTemplateProps = {
    backdropImage: string,
    date: string,
    name: string,
    description: string,
    category: string,
    originLink: string,
    sources?: {
        type: 'image' | 'video',
        link: string
    }[]
}

const WorkTemplate = ({ backdropImage, date, name, description, category, originLink, sources = [] }: WorkTemplateProps) => {
  return (
    <Container maxWidth='xl'>
      <div className='z-10'>
        <Image className='absolute top-0 left-0 object-contain z-10' src={backdropImage} alt='backdrop' fill />
        <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-t from-slate-50 to-[#ffffff6d] dark:from-slate-800 dark:to-[#000000d4] bg-opacity-50 z-10'></div>
      </div>
      <section className='relative h-screen pt-20 z-20'>
        <Link
          className='relative inline-block group/back gap-2'
          href="/#my_work"
        >
          <div className='flex items-center'>
            <IoArrowBack size={24} className='transition-all group-hover/back:-translate-x-2' />
            <span className='text-white'>Go Back</span>
          </div>
        </Link>
        <div className='absolute w-full left-0 bottom-40'>
          <p className='text-gray-300'>{date}</p>
          <p className='text-7xl font-bold my-4'>{name}</p>
          <p className='text-gray-300 mb-8'>{description}</p>
          <p>{category}</p>
          <div className='w-full h-[1px] bg-gradient-to-r from-black dark:from-white to-transparent my-4'></div>
          {originLink !== '' && 
          <Link
            href={originLink}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-block'
          >
            <div className='flex items-center gap-2 text-white ring-2 ring-white rounded-md px-4 py-2 hover:bg-white hover:text-black transition-all'>
              <IoEye size={24} />
              <span>View Project</span>
            </div>
          </Link>}
        </div>
      </section>
      {
        sources.map((source) => (
          <>
            {
              source.type === 'image' ?
                <section className='relative h-screen z-20'>
                  <Image className='object-contain' src={source.link} alt='' fill />
                </section>
                :
                <section className='relative h-screen z-20'>
                  <video loop autoPlay muted className='object-contain'>
                    <source src={source.link} type="video/mp4" />
                  </video>
                </section>
            }
          </>
        ))
      }
    </Container>
  )
}

export default WorkTemplate