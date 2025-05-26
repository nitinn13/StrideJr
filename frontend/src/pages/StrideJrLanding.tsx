import Explore from '../components/Explore';
import darkbg from '../../public/darkbg.jpg';
import Footer from '../components/Footer';

const StrideJrLanding = () => {
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden" style={{backgroundImage: `url(${darkbg})`}}>
      {/* Background overlay for texture */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      
      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="text-white text-xl sm:text-2xl md:text-3xl font-light font-manrope">
          Stride Jr.
        </div>
        <Explore/>react
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-4 sm:px-6 md:px-8 text-center mt-[-30px] sm:mt-[-40px] md:mt-[-50px]">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-light text-white mb-6 sm:mb-8 leading-tight max-w-6xl font-manrope">
          A New Era for Schools Begins Here
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-white text-opacity-80 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl leading-relaxed font-light font-manrope">
          Not just digitizing — we're redesigning how schools work, with transparency at 
          every step, from attendance to AI-driven insights.
        </p>
      </main>

      {/* Subtle animated elements */}
      <div className="absolute top-1/4 left-[10%] sm:left-1/4 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-white bg-opacity-5 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-[10%] sm:right-1/4 w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-48 bg-yellow-300 bg-opacity-10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 right-[8%] sm:right-1/6 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-purple-400 bg-opacity-10 rounded-full blur-lg animate-pulse" style={{animationDelay: '2s'}}></div>
      <Footer/>
    </div>
  );
};

export default StrideJrLanding;