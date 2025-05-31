import React from 'react'
import Explore from './Explore'

const Navbar = () => {
  return (
    <header className="relative z-10 flex justify-between items-center p-3 sm:p-3 md:p-5 lg:p-7 xl:p-8">
        <div className="text-white text-xl sm:text-xl md:text-2xl lg:text-3xl font-light font-manrope whitespace-nowrap">
          Stride Jr.
        </div>
        <div className='flex flex-row gap-3 sm:gap-3'>
          <Explore name="Teacher " link="/teacher" />
          <Explore name="Parent" link="/parent" />
          
        </div>
      </header>
  )
}

export default Navbar