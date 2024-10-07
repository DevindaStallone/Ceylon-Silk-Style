import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { HoveredLink } from "../components/ui/navbar-menu";
import { motion } from "framer-motion";
import { LampContainer } from "../components/ui/lamp";

const LoginPage = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // To navigate to other pages after login

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if credentials are for admin
      if (email === 'admin@gmail.com' && password === 'admin123') {
        // Redirect to admin page if credentials match
        navigate('/admin');
        return;
      }

      // Handle regular user login
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      const { token, user } = response.data;

      // Store the JWT token and user in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Pass user information to the Navbar
      setUser(user);

      // Redirect to user's page after successful login
      navigate('/');
    } catch (error) {
      // Display error message if login fails
      setErrorMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 90 }}
        whileInView={{ opacity: 1, y: 120 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className=" bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text 
        text-4xl tracking-normal text-transparent md:text-7xl ">

        <div className="login-page">
          <div className="font-[sans-serif] max-w-7xl mx-auto h-screen top-72 relative">
            <div className="items-center gap-8 h-full">
              <form className="max-w-lg max-md:mx-auto w-full p-6" onSubmit={handleSubmit}>
                <div className="mb-12">
                  <h3 className="text-white text-4xl font-extrabold">Sign in</h3>
                  <p className="text-white text-sm mt-6">Immerse yourself in a hassle-free login journey with our intuitively designed login form. Effortlessly access your account.</p>
                  <p className='text-red-500 font-bold text-center mt-5 text-lg p-1 rounded-full'>{errorMessage}</p>
                </div>

                <div>
                  <label className="text-violet-700 text-[15px] mb-2 block">Email</label>
                  <div className="relative flex items-center">
                    <input
                      name="email"
                      required
                      className="w-full text-sm text-black focus:text-white bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-blue-600"
                      placeholder="Enter email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4" viewBox="0 0 682.667 682.667">
                      <defs>
                        <clipPath id="a" clipPathUnits="userSpaceOnUse">
                          <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                        </clipPath>
                      </defs>
                      <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                        <path fill="none" strokeMiterlimit="10" strokeWidth="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                        <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                      </g>
                    </svg>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-violet-700 text-[15px] mb-2 block">Password</label>
                  <div className="relative flex items-center">
                    <input
                      name="password"
                      type="password"
                      required
                      className="w-full text-sm text-black bg-gray-100 focus:bg-transparent focus:text-white px-4 py-3.5 rounded-md outline-blue-600"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                      <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                    </svg>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 justify-between mt-4">
                  <div className="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" className="shrink-0 h-4 w-4 text-violet-700 focus:ring-blue-500 border-gray-300 rounded-md" />
                    <label htmlFor="remember-me" className="ml-3 block text-sm text-violet-700">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="" className="text-violet-700 font-semibold hover:underline">
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div className="mt-4">
                  <button type="submit" className="w-full shadow-xl py-3 px-6 text-sm tracking-wide font-semibold rounded-md text-white bg-violet-700 hover:bg-violet-900 focus:outline-none">
                    Log in
                  </button>
                </div>
                <p className="text-sm mt-8 text-center text-gray-400">Don't have an account?
                  <a className="text-violet-700 font-semibold tracking-wide hover:underline ml-1">
                    <HoveredLink to="/register">Register</HoveredLink>
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </motion.h1>
    </LampContainer>
  );
};

export default LoginPage;
