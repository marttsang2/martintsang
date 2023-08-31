import Container from '@/components/Container/Container'
import { useEffect, useState } from 'react'
import { IoLogoGithub, IoArrowForward, IoLogoLinkedin } from 'react-icons/io5'
import Link from 'next/link'
import TypeWriter from '@/components/TypeWriter/TypeWriter'

const hats = [
  { prep: '', suffix: 'Martin Tsang' },
  { prep: 'a', suffix: 'a Software Engineer' },
]

export default function Home() {
  const [section, setSection] = useState('')
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('Martin Tsang');
  const [isGoingBack, setIsGoingBack] = useState(false);
  const words = ['Martin Tsang', 'a Software Engineer'];
  const word = words[currentWordIndex];

  useEffect(() => {

  }, []);

  useEffect(() => {
    setSection('EXPERIENCES')
  }, [])

  // const ListItem = ({ order, title }: ListItemProps) => (
  //   <li 
  //     className={`my-2 group/item flex items-center hover:!opacity-100 cursor-pointer ${title === section ? 'opacity-100' : 'opacity-50'}`} 
  //     onClick={() => setSection(title)}>
  //     <p className='text-sm dark:text-white'>{String(order).padStart(2, '0')}</p>
  //     <div className='mx-4 transition-all w-[40px] group-hover/item:w-[80px] h-[1px] bg-black dark:bg-white'></div>
  //     <p className='text-md dark:text-white font-semibold'>{title}</p>
  //   </li>
  // )

  return (
    <Container maxWidth='xl'>
      <div className='lg:h-screen flex justify-center items-center'>
        <div>
          <p className='mb-4 text-2xl text-center dark:text-white font-bold tracking-wider'>Welcome</p>
          <TypeWriter appendClass="text-6xl" hats={hats} prefix='I am' />
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
        </div>
      </div>
    </Container>
  )
}
