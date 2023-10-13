import React from 'react'

type SectionProps = {
    id: string;
    label?: string;
    children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, label, children }) => {
  return (
    <section id={id} className='pt-20 min-h-screen my-4'>
      {label && <p className='mb-6 text-3xl font-bold text-center dark:text-white'>{label}</p>}
      {children}
    </section>
  )
}

export default Section