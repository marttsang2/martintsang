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
        <ThemeToggle />
      </div>
    </nav>
  )
}

export default Navbar