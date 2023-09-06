import Container from '@/components/Container/Container'
import WorkTemplate from '@/components/Template/WorkTemplate'
import React from 'react'

const PolytasyPage = () => {
  return (
    <Container maxWidth='xl'>
      <WorkTemplate
        backdropImage='/work/polytasy_logo.jpeg'
        date='JUNE 2022'
        name='Polytasy'
        description='A GameFi platform for POLYTASY. Built in Polygon, empowering gamers to earn rewards'
        category='Website, Game'
        originLink=''
      />
      <section className='relative h-screen z-20'>
        <video loop autoPlay muted className='object-fit'>
          <source src="/polytasy_demo.mp4" type="video/mp4" />
        </video>
      </section>
    </Container>
  )
}

export default PolytasyPage