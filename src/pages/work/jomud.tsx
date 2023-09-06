import WorkTemplate from '@/components/Template/WorkTemplate'
import { workTemplateMapping } from '@/constants/works'
import React from 'react'

const JomudWork = () => {
  return (
    <WorkTemplate
      {...workTemplateMapping['jomud']}
    />
  )
}

export default JomudWork