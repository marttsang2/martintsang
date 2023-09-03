import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import Image from 'next/image';
import Link from 'next/link';

const works = [
  { title: 'Jomud', image: '/work/jomud_demo.svg', date: 'June 2023', description: 'Website', link: '/work/jomud' },
  { title: 'Superacc', image: '/work/superacc_demo.svg', date: 'June 2023', description: 'Website', link: '/work/superacc' },
  { title: 'Polytasy', image: '/work/polytasy_logo.jpeg', date: 'June 2022', description: 'Game', link: '/work/polytasy' },
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
      spacing: 150,
    },
  })

  return (
    <div ref={sliderRef} className="keen-slider">
      {works.map(({ title, date, description, image, link }, idx) => (
        <Link key={idx} href={link} className="keen-slider__slide relative flex justify-center items-center h-[600px] rounded-xl group">
          <Image className='transition-all group-hover:brightness-[.25] group-hover:blur group-hover:scale-110 duration-500 object-cover' src={image} alt='' fill />\
          <div className='z-10'>
            <p className='invisible group-hover:visible text-md text-white text-center uppercase z-10 mb-4'>{date}</p>
            <p className='invisible group-hover:visible text-3xl text-white text-center font-bold duration-500 z-10 mb-4'>{title}</p>
            <p className='invisible group-hover:visible text-md text-white text-center duration-500 z-10'>{description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
};

export default Carousel;