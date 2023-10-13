import Link from 'next/link'
import { useState } from 'react'
import { IoClose, IoLogoGithub, IoLogoLinkedin, IoMail, IoMenuOutline } from 'react-icons/io5'

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const NavButton = ({ id, label }: { id: string, label: string }) => {
    const scrollTo = () => {
      if (document.getElementById(id) === null) {
        return;
      }
      document.getElementById(id)?.scrollIntoView({behavior: 'smooth'})
      setShowMobileMenu(false)
    }
    return (
      <button
        type='button' 
        className='text-md p-1.5 px-4 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md'
        onClick={scrollTo}
      >
        {label}
      </button>
    )
  }

  return (
    <>
      {showMobileMenu && (
        <div className='fixed top-0 left-0 h-screen w-screen flex justify-center items-center flex-col bg-white dark:bg-[#27374D] gap-4 z-40'>
          <NavButton id='home' label='Home' />
          <NavButton id='about' label='About' />
          <NavButton id='profile' label='Profile' />
          <NavButton id='projects' label='Projects' />
        </div>
      )}
      <nav className='fixed top-0 left-0 w-full flex justify-center bg-slate-50 px-5 z-40'>
        <div className='relative w-[1024px] mx-auto py-4 flex items-center justify-between'>
          <div className='invisible lg:visible group group/list flex dark:text-white'>
            <NavButton id='home' label='Home' />
            <NavButton id='about' label='About' />
            <NavButton id='profile' label='Profile' />
            <NavButton id='projects' label='Projects' />
          </div>
          <div className='invisible lg:visible absolute right-0 flex items-center gap-2'>
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
          <div className='visible lg:invisible absolute right-0 flex items-center'>
            <button
              className="relative p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md inline-flex items-center cursor-pointer"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {!showMobileMenu && <IoMenuOutline size={20} />}
              {showMobileMenu && <IoClose size={20} />}
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar