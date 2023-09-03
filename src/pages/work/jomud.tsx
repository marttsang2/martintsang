import Container from '@/components/Container/Container'
import WorkTemplate from '@/components/Template/WorkTemplate'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IoArrowBack, IoEye } from 'react-icons/io5'

const JomudWork = () => {
  return (
    <WorkTemplate
      backdropImage='/work/jomud_demo.svg'
      date='JUNE 2023'
      name='Jomud'
      description='Job search platform for JOMUD.'
      category='Website'
      originLink='https://www.jomud.io'
    />
  )
}

export default JomudWork