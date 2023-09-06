import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import Image from 'next/image';
import Link from 'next/link';
import { useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { workTemplateMapping } from "@/constants/works";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [sliderRef, instanceRef] = useKeenSlider({
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
      spacing: 150,
    },
  })

  const handleMoveBackward = () => {
    if (currentSlide === 0) return
    setCurrentSlide((prev) => prev - 1)
    instanceRef?.current?.moveToIdx(currentSlide - 1)
  }

  const handleMoveForward = () => {
    if (currentSlide >= Object.values(workTemplateMapping).length - 2) return
    setCurrentSlide((prev) => prev + 1)
    instanceRef?.current?.moveToIdx(currentSlide + 1)
  }

  return (
    <div ref={sliderRef} className="relative keen-slider">
      <button 
        className="absolute top-1/2 left-0 transform -translate-y-1/2 p-4 rounded-full bg-[#0000008b] backdrop-blur-md z-20"
        onClick={handleMoveBackward}
      >
        <IoChevronBack size={24} className='text-white' />
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 p-4 rounded-full bg-[#0000008b] backdrop-blur-md z-20"
        onClick={handleMoveForward}
      >
        <IoChevronForward size={24} className='text-white' />
      </button>
      {Object.values(workTemplateMapping).map(({ name, date, category, backdropImage }, idx) => (
        <Link key={idx} href={`/work/${name.toLowerCase()}`} className="keen-slider__slide relative flex justify-center items-center h-[600px] rounded-xl group">
          <Image className='transition-all group-hover:brightness-[.25] group-hover:blur group-hover:scale-110 duration-500 object-cover' src={backdropImage} alt='' fill />\
          <div className='z-10'>
            <p className='invisible group-hover:visible text-md text-white text-center uppercase z-10 mb-4'>{date}</p>
            <p className='invisible group-hover:visible text-3xl text-white text-center font-bold duration-500 z-10 mb-4'>{name}</p>
            <p className='invisible group-hover:visible text-md text-white text-center duration-500 z-10'>{category}</p>
          </div>
        </Link>
      ))}
    </div>
  )
};

export default Carousel;