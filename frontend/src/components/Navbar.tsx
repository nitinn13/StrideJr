import { useNavigate } from 'react-router-dom'
import Explore from './Explore'

const Navbar = () => {
    const navigate = useNavigate();
  return (
    <header className="relative z-10 flex justify-between items-center p-3 sm:p-3 md:p-5 lg:p-7 xl:p-8">
        <button 
        onClick={() => navigate("/")}
        className="text-white text-xl sm:text-xl md:text-2xl lg:text-3xl font-light font-manrope whitespace-nowrap">
          Stride Jr.
        </button>
        <div className='flex flex-row gap-3 sm:gap-3'>
          <Explore name="Teacher " link="/teacher" />
          <Explore name="Parent" link="/parent" />
          
        </div>
      </header>
  )
}

export default Navbar