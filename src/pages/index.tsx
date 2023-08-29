import Container from '@/components/Container/Container'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ProjectSection from '@/components/Section/ProjectSection'
import ExperienceSection from '@/components/Section/ExperienceSection'
import { IoLogoGithub, IoArrowForward, IoLogoLinkedin } from 'react-icons/io5'
import Link from 'next/link'
import MusicSection from '@/components/Section/MusicSection'
type ListItemProps = {
  order: number
  title: string
}

export default function Home() {
  const [section, setSection] = useState('')

  useEffect(() => {
    setSection('EXPERIENCES')
  }, [])

  const ListItem = ({ order, title }: ListItemProps) => (
    <li 
      className={`my-2 group/item flex items-center hover:!opacity-100 cursor-pointer ${title === section ? 'opacity-100' : 'opacity-50'}`} 
      onClick={() => setSection(title)}>
      <p className='text-sm'>{String(order).padStart(2, '0')}</p>
      <div className='mx-4 transition-all w-[40px] group-hover/item:w-[80px] h-[1px] bg-white'></div>
      <p className='text-md font-semibold'>{title}</p>
    </li>
  )

  return (
    <Container maxWidth='lg'>
      <div className='h-screen flex pt-20 lg:grid lg:grid-cols-2'>
        <div>
          <p className='mb-6 text-7xl font-semibold leading-[1.2]'>
            {`Hello I’m`}
            <br/>
            Martin Tsang
          </p>
          <p className='mb-6 w-[480px] opacity-75 leading-[1.5]'>
            {`I am currently seeking opportunities to work as a software engineer.
            I specialize in building scalable and high-performing solutions that users love. With a collaborative mindset and experience in Agile methodologies, I enjoy working as part of a team to bring projects to life.`}
          </p>
          <ul className='group group/list text-md'>
            <ListItem order={1} title='EXPERIENCES' />
            <ListItem order={2} title='PROJECTS' />
            <ListItem order={3} title='BLOGS' />
            <ListItem order={4} title='MUSIC' />
          </ul>
          <div className='absolute bottom-20 flex items-center mt-6'>
            <Link href="https://github.com/marttsang2" className='relative flex items-center mr-4 opacity-75 hover:opacity-100'>
              <IoLogoGithub color='white' size={28} />
            </Link>
            <Link href="https://www.linkedin.com/in/marttsang2/" className='relative flex items-center mr-4 opacity-75 hover:opacity-100'>
              <IoLogoLinkedin color='white' size={28} />
            </Link>
          </div>
        </div>
        <div className='px-4 h-full overflow-y-auto'>
            {section === 'PROJECTS' && <ProjectSection />}
            {section === 'EXPERIENCES' && <ExperienceSection />}
            {section === 'BLOGS' && <div>Blogs</div>}
            {section === 'MUSIC' && <MusicSection />}
        </div>
      </div>
    </Container>
  )
}
