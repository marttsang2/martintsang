import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ThemeToggle from '../Toggle/ThemeToggle'

const Navbar = () => {
  return (
    <nav className='fixed top-0 w-full flex justify-center items-center'>
      <div className='py-4 container flex justify-between items-end'>
        <Link href='/' className='flex items-center'>
          <Image src="/favicon.png" alt='favicon' width={28} height={28} />
        </Link>
        <div className='flex items-center'>
          <div className='group group/list transition-all flex dark:text-white'>
            <Link className='text-md p-1.5 px-4 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md' href='/'>Home</Link>
            <Link className='text-md p-1.5 px-4 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md' href='/about'>About</Link>
            <Link className='text-md p-1.5 px-4 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md' href='/blog'>Blog</Link>
            <Link className='text-md p-1.5 px-4 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md' href='/projects'>Projects</Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar