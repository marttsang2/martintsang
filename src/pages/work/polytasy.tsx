import Container from '@/components/Container/Container'
import WorkTemplate from '@/components/Template/WorkTemplate'
import { workTemplateMapping } from '@/constants/works'
import React from 'react'

const PolytasyPage = () => {
  return (
    <WorkTemplate
      {...workTemplateMapping['polytasy']}
    />
  )
}

export default PolytasyPage