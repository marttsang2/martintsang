import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IoArrowForward } from 'react-icons/io5'
import { motion } from 'framer-motion'

const HomeSection = () => {
  const scrollTo = (id: string) => {
    if (document.getElementById(id) === null) {
      return;
    }
    document.getElementById(id)?.scrollIntoView({behavior: 'smooth'})
  }
  return (
    <section id="home" className='relative h-screen flex items-center'>
      <div className='flex flex-col lg:flex-row justify-between items-center w-full'>
        <div className='flex flex-col items-center gap-4 text-center lg:text-start'>
          <p className='text-6xl dark:text-white font-bold tracking-wider self-start whitespace-nowrap'>Martin Tsang</p>
          <p className='text-2xl dark:text-white font-bold tracking-wider lg:self-start'>{`I'm Software Engineer`}</p>
          <Link href='/resume.pdf' target="_blank" className='w-fit mt-4 flex items-center self-center lg:self-start gap-2 p-2 px-4 bg-gray-200 hover:bg-gray-600 hover:text-white rounded-md'>
            <p>View Resume</p>
            <IoArrowForward />
          </Link>
        </div>
        <Image src="/hero.svg" alt="hero" width={600} height={500} />
      </div>
      <div className='absolute bottom-20 lg:bottom-28 mt-40 w-full flex justify-center'>
        <button type='button' onClick={() => scrollTo('about')} className='flex justify-center w-10 h-16 border-2 border-black dark:border-white rounded-full'>
          <motion.div
            animate={{ y: [0, 44], opacity: [1, 0] }}
            transition={{ ease: 'easeIn', repeat: Infinity, duration: 1, repeatDelay: 0.5 }}
            className='w-4 h-4 bg-black dark:bg-white rounded-full'/>
        </button>
      </div>
    </section>
  )
}

export default HomeSection