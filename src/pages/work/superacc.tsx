import WorkTemplate from '@/components/Template/WorkTemplate'
import { workTemplateMapping } from '@/constants/works'
import React from 'react'

const SuperaccPage = () => {
  return (
    <WorkTemplate
      {...workTemplateMapping['superacc']}
    />
  )
}

export default SuperaccPage