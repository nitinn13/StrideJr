import darkbg from '../../public/darkbg.jpg'; // Adjust path as needed
import Navbar from '../components/Navbar';
import { useLocation } from 'react-router-dom'; // Import the hook

const Login = () => {
  const location = useLocation();
  const { name, link } = location.state || {}; // Access the state, with a fallback for safety

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: `url(${darkbg})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <Navbar />
      <main className="relative z-10 flex flex-col items-center justify-start px-4 sm:px-4 md:px-6 lg:px-8 text-center mt-16 sm:mt-0">
        <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-light text-white mb-8 sm:mb-6 md:mb-8 leading-tight max-w-6xl font-manrope px-2">
          {name} Login
        </h1>
        
      </main>
    </div>
  );
};

export default Login;