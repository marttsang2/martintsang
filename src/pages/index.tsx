import Container from '@/components/Container/Container'
import { useEffect, useState } from 'react'
import { IoLogoGithub, IoArrowForward, IoLogoLinkedin } from 'react-icons/io5'
import Link from 'next/link'
import TypeWriter from '@/components/TypeWriter/TypeWriter'
import { motion } from 'framer-motion'
import Carousel from '@/components/Carousel/Carousel'

const names = [
  { name: 'Martin Tsang' },
  { name: 'a Software Engineer' },
  { name: 'a Freelancer' },
]

export default function Home() {
  const words = ['Martin Tsang', 'a Software Engineer'];

  return (
    <Container maxWidth='xl'>
      <section className='relative h-screen flex justify-center items-center'>
        <div className='absolute top-1/3 left-1/2 -translate-x-1/6 -translate-y-1/2 w-[100px] h-[100px] rotate-[60deg] bg-sky-300 dark:bg-sky-500 rounded-full blur-2xl'/>
        <div className='z-20'>
          <p className='mb-4 text-2xl text-center dark:text-white font-bold tracking-wider'>Welcome</p>
          <TypeWriter appendClass="text-6xl" names={names} prefix='I am' />
          <p className='mt-2 text-center dark:text-white opacity-75 leading-[1.5]'>
            {`Technology and design are the core of success for real estate related businesses.`}
          </p>
          <div className='flex justify-center items-center mt-4'>
            <Link target="_blank" href="https://github.com/marttsang2" className='relative flex items-center p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md'>
              <IoLogoGithub size={28} className='dark:text-gray-50' />
            </Link>
            <Link target="_blank" href="https://www.linkedin.com/in/marttsang2/" className='relative flex items-center p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md'>
              <IoLogoLinkedin size={28} className='dark:text-gray-50' />
            </Link>
          </div>
          <div className='mt-40 w-full flex justify-center'>
            <a href="#my_work" className='flex justify-center w-10 h-16 border-2 border-black dark:border-white rounded-full'>
              <motion.div
                animate={{ y: [0, 44], opacity: [1, 0] }}
                transition={{ ease: 'easeIn', repeat: Infinity, duration: 1, repeatDelay: 0.5 }}
                className='w-4 h-4 bg-black dark:bg-white rounded-full'/>
            </a>
          </div>
        </div>
      </section>
      <section id="my_work" className='pt-40 h-screen flex flex-col items-center'>
        <p className='mb-6 text-xl text-center dark:text-white uppercase'>work</p>
        <Carousel />
      </section>
    </Container>
  )
}
