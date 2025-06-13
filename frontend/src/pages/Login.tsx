import { useState } from 'react';
import darkbg from '../../public/darkbg.jpg';
import Navbar from '../components/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios"
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const { name, link } = location.state || {};
  const navigate = useNavigate();
  const handlelogin = async () => {
    await axios.post('http://localhost:3000/auth/login', {
      email: email,
      password: password
    })
    .then(res => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate(link);
    })
    .catch(err => {
      console.log(err);
    })
    
  }

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

        <div className="flex flex-col gap-4 mt-4 border-2 border-white border-opacity-50 rounded-lg p-10">
          <input type="text" placeholder='enter your email' value={email} onChange={(e) => setEmail(e.target.value)}
            className=" px-4 py-2 mt-4 text-white text-opacity-80 bg-black bg-opacity-20 ring-2 ring-white ring-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 transition-all duration-200 ease-in-out" />
          <div className='text-white'>
            {email}
          </div>

          <input type="password" placeholder='enter your password' value={password} onChange={(e) => setPassword(e.target.value)}
            className=" px-4 py-2 mt-4 text-white text-opacity-80 bg-black bg-opacity-20 ring-2 ring-white ring-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50 transition-all duration-200 ease-in-out" />
            <div className='text-white'>
            {password}
          </div>
          <button
            onClick={handlelogin}
            className="px-4 py-2 mt-4 text-white text-opacity-80 bg-black border rounded-lg transition-all duration-200 ease-in-out  hover:text-white">Login</button>
        </div>
      </main>
    </div>
  );
};

export default Login;