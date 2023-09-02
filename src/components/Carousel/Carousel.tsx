import React, { useState } from 'react';
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import Image from 'next/image';
import Link from 'next/link';

const works = [
  { title: 'Jomud', image: '/work/jomud_demo.svg', date: '', description: '' },
  { title: 'Superacc', image: '/work/superacc_demo.svg', date: '', description: '' },
  { title: 'Polytasy', image: '/work/polytasy_logo.jpeg', date: '', description: '' },
]

const Carousel = () => {
  const [sliderRef] = useKeenSlider({
    breakpoints: {
      "(min-width: 400px)": {
        slides: { perView: 1, spacing: 5 },
      },
      "(min-width: 780px)": {
        slides: { perView: 2, spacing: 10 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 3, spacing: 10 },
      },
    },
    slides: {
      origin: "center",
      perView: 1,
      spacing: 10,
    },
  })

  return (
    <div ref={sliderRef} className="keen-slider">
      {works.map(({ title, image }, idx) => (
        <Link key={idx} href="/" className="keen-slider__slide relative flex justify-center items-center h-[600px] rounded-xl group">
          <Image className='transition-all group-hover:brightness-50 group-hover:blur group-hover:scale-125 duration-500 object-cover' src={image} alt='' fill />\
          <div className='z-10'>
            <div className='invisible group-hover:visible'>
              <p className='text-3xl text-white z-10'>{title}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
};

export default Carousel;