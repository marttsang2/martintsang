import WorkTemplate from '@/components/Template/WorkTemplate'
import React from 'react'

const GamehubPage = () => {
  return (
    <WorkTemplate
      backdropImage='/work/gamehub_logo.png'
      date='JUNE 2022'
      name='Gamehub'
      description='E-commerce platform for game developers to sell their console games.'
      category='Website'
      originLink=''
      sources={[
        { type: 'image', link: '/work/gamehub_demo.png' }
      ]}
    />
  )
}

export default GamehubPage