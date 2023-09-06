import Container from '@/components/Container/Container'
import WorkTemplate from '@/components/Template/WorkTemplate'
import React from 'react'

const JomudWork = () => {
  return (
    <Container maxWidth='xl'>
      <WorkTemplate
        backdropImage='/work/jomud_demo.svg'
        date='JUNE 2023'
        name='Jomud'
        description='Job search platform for JOMUD.'
        category='Website'
        originLink='https://www.jomud.io'
      />
    </Container>
  )
}

export default JomudWork