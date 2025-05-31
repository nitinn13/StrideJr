import React, { useState, useEffect } from 'react';
import darkbg from '../../public/darkbg.jpg';
import Footer from '../components/Footer';
import kid1 from '../../public/kid1.png';
import kid2 from '../../public/kid2.png';
import kid3 from '../../public/kid3.png';
import kid4 from '../../public/kid4.png';
import kid5 from '../../public/kid5.png';
import kid6 from '../../public/kid6.png';
import Navbar from '../components/Navbar';

const StrideJrLanding = () => {
  const images = [kid1, kid2, kid3, kid4, kid5, kid6];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden" style={{ backgroundImage: `url(${darkbg})` }}>
      {/* Background overlay for texture */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className='min-h-screen'>


        <Navbar />

        {/* Main Content - Better mobile spacing */}
        <main className="relative z-10 flex flex-col items-center justify-start px-4 sm:px-4 md:px-6 lg:px-8 text-center mt-16 sm:mt-0" >
          <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-light text-white mb-8 sm:mb-6 md:mb-8 leading-tight max-w-6xl font-manrope px-2">
            A New Era for Schools Begins Here
          </h1>

          <p className="text-base sm:text-base md:text-lg lg:text-xl text-white text-opacity-80 max-w-sm sm:max-w-sm md:max-w-lg lg:max-w-2xl xl:max-w-3xl leading-relaxed font-light font-manrope px-2 mb-12 sm:mb-6 md:mb-8 lg:mb-10">
            Not just digitizing — we're redesigning how schools work, with transparency at
            every step, from attendance to AI-driven insights.
          </p>
        </main>

        {/* Rotating Image - Better mobile sizing and positioning */}
        <div className="relative z-10 flex justify-center items-center py-2 sm:py-2 md:py-3 flex-grow">
          <img
            src={images[currentImageIndex]}
            alt={`kid${currentImageIndex + 1}`}
            className="w-[95vw] h-auto sm:w-[90vw] sm:h-auto md:w-[85vw] md:h-auto lg:w-[80vw] lg:h-auto xl:w-[75vw] xl:h-auto 2xl:w-[70vw] 2xl:h-auto max-w-full max-h-[70vh] sm:max-h-[65vh] transition-opacity duration-300 object-contain"
          />
        </div>

        {/* Subtle animated elements - Better mobile positioning */}
        <div className="absolute top-1/4 left-[8%] sm:left-[8%] md:left-[10%] lg:left-1/4 w-12 h-12 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 xl:w-32 xl:h-32 bg-white bg-opacity-5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-[8%] sm:right-[8%] md:right-[10%] lg:right-1/4 w-16 h-16 sm:w-18 sm:h-18 md:w-24 md:h-24 lg:w-36 lg:h-36 xl:w-48 xl:h-48 bg-yellow-300 bg-opacity-10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-[5%] sm:right-[5%] md:right-[8%] lg:right-1/6 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 bg-purple-400 bg-opacity-10 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <Footer />
    </div>
  );
};

export default StrideJrLanding;