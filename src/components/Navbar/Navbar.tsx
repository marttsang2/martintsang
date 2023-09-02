import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ThemeToggle from '../Toggle/ThemeToggle'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { IoMenuOutline } from 'react-icons/io5'

const Navbar = () => {
  const { scrollYProgress } = useScroll()
  const [hookedYPostion, setHookedYPosition] = React.useState(0);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setHookedYPosition(latest);
  })

  const navClass = hookedYPostion === 0 ? 'w-[800px]' : 'w-full'

  return (
    <nav className='fixed top-0 w-full px-4 flex justify-center items-center backdrop-blur-md z-40'>
      <div className={`py-4 flex container justify-between items-center transition-[width] ease-in-out duration-1000 mx-auto ${navClass}`}>
        <Link href='/' className='relative flex items-center'>
          <Image src="/favicon.png" alt='favicon' width={28} height={28} />
        </Link>
        <div className='flex items-center'>
          <div className='invisible lg:visible group group/list transition-all flex dark:text-white'>
            <Link className='text-md p-1.5 px-4 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md' href='/'>Home</Link>
            <Link className='text-md p-1.5 px-4 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md' href='/#my_work'>Work</Link>
            <Link className='text-md p-1.5 px-4 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md' href='/Martin_Tsang_Resume.pdf' target="_blank" rel="noopener noreferrer">Resume</Link>
            <ThemeToggle />
          </div>
          <div className='visible lg:invisible flex items-center'>
            <ThemeToggle />
            <label className="relative p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md inline-flex items-center cursor-pointer">
              <IoMenuOutline size={20} />
            </label>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar