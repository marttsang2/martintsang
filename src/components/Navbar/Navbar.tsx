import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='w-full flex justify-center items-center'>
      <div className='py-4 w-11/12 flex justify-between items-end'>
        <Link href='/' className='flex items-center'>
          <Image src="/favicon.png" alt='favicon' width={24} height={24} />
          <p className='text-2xl font-semibold ml-2'>Martin Tsang</p>
        </Link>
        <div className='group group/list transition-all grid grid-cols-5 gap-8'>
          <Link className='hover:!opacity-100 group-hover/list:opacity-50 text-lg text-white' href='/'>Home</Link>
          <Link className='hover:!opacity-100 group-hover/list:opacity-50 text-lg text-white' href='/about'>About</Link>
          <Link className='hover:!opacity-100 group-hover/list:opacity-50 text-lg text-white' href='/blog'>Blog</Link>
          <Link className='hover:!opacity-100 group-hover/list:opacity-50 text-lg text-white' href='/projects'>Projects</Link>
          <Link className='hover:!opacity-100 group-hover/list:opacity-50 text-lg text-white' href='/timer'>Timer</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar