import WorkTemplate from '@/components/Template/WorkTemplate'
import Container from '@/components/Container/Container'
import React from 'react'

const SuperaccPage = () => {
  return (
    <Container maxWidth='xl'>
      <WorkTemplate
        backdropImage='/work/superacc_demo.svg'
        date='JUNE 2023'
        name='Superacc'
        description='Website'
        category='Website'
        originLink='https://www.superacc.ai'
      />
    </Container>
  )
}

export default SuperaccPage