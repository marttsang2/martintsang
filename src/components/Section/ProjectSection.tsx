import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'
import { IoArrowUp } from 'react-icons/io5'

export type ProjectProps = {
    title: string,
    company: string,
    date: string,
    skills?: string[],
    description: string,
    url: string,
}

const projects: ProjectProps[] = [
    // {
    //     title: 'Jomud',
    //     description: 'Jomud is a web application that allows users to manage their accounts and transactions. It is built with React, TypeScript, and Firebase.',
    //     url: '',
    //     company: 'Asynk.ai',
    //     date: '2023',
    // },
    {
        title: 'Superacc',
        description: 'Superacc is designed for various financial institutions to streamline traditional banking process and conduct credit analysis on the bank statements',
        url: 'https://superacc.ai',
        company: 'Apoidea',
        date: '2022',
    },
    {
        title: 'Zwap',
        description: 'Zwap is a student loan platform that allows students to apply for loans and manage their accounts',
        url: 'https://platform.zwap.hk',
        company: 'P L Technology Limited',
        date: '2021',
    },
    {
        title: 'PewPewMall',
        description: 'PewPewMall is an e-commerce website that allows users to buy products',
        url: 'https://pewpewmall.com.hk',
        company: 'Technine',
        date: '2021',
    }
]

const ProjectSection = () => {
  return (
        <div className='group'>
        {
            projects.map((project, index) => (
                <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 1.5 * (index / projects.length)}}    
                    className='py-6 px-8 mb-2 w-full bg-[#0a182b] cursor-pointer' 
                    key={project.company}
                >
                    <div className='hover:!opacity-100 group-hover:opacity-50 group/item'>
                        <p className='relative inline-block pr-8 text-xl font-semibold group-hover/item:text-sky-400'>
                            {project.title}
                            <IoArrowUp size={20} className='absolute ease-in duration-100 top-0 right-0 m-1.5 group-hover/item:m-0 rotate-45' />
                        </p>
                        <p className='text-md opacity-75'>{project.company} · {project.date}</p>
                        <p className='text-md opacity-75'>{project.description}</p>
                    </div>
                </motion.div>
            ))
        }
    </div>
  )
}

export default ProjectSection