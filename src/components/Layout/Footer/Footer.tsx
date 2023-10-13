import Link from 'next/link'
import React from 'react'
import { IoLogoGithub, IoLogoLinkedin, IoMail } from 'react-icons/io5'

const Footer = () => {
  return (
    <footer className='flex items-center gap-10 justify-center h-24 border-t'>
      <div className='flex items-center gap-2'>
        <Link target="_blank" href="https://github.com/marttsang2" className='relative flex items-center p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md'>
          <IoLogoGithub size={28} className='dark:text-gray-50' />
        </Link>
        <Link target="_blank" href="https://www.linkedin.com/in/marttsang2/" className='relative flex items-center p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md'>
          <IoLogoLinkedin size={28} className='dark:text-gray-50' />
        </Link>
        <Link target="_blank" href="mailto:tsangmartin1225@gmail.com" className='relative flex items-center p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md'>
          <IoMail size={28} className='dark:text-gray-50' />
        </Link>
      </div>
      <p>© 2023 Martin Tsang. All rights reserved.</p>
    </footer>
  )
}

export default Footer