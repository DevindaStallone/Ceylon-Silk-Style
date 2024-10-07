// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { registerUser } from '../api/userApi';
import { HoveredLink } from "../components/ui/navbar-menu";
import { motion } from "framer-motion";
import { LampContainer } from "../components/ui/lamp";


const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error message
    try {
      const response = await registerUser(formData);
      console.log('User registered:', response);
      setSuccess(true);  // Success message
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 140 }}
        whileInView={{ opacity: 1, y: 180 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className=" bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text 
      text-4xl tracking-normal text-transparent md:text-7xl ">

        <div className="register-page">
          <div class="font-[sans-serif] max-w-7xl mx-auto h-screen  top-56 relative  ">
            <div class=" items-center gap-8 h-full">

              <form class="max-w-lg max-md:mx-auto w-full p-6" onSubmit={handleSubmit}>
                <div class="mb-12">
                  <h3 class="text-white text-4xl font-extrabold">Sign up</h3>
                  <p class="text-white text-sm mt-6">Immerse yourself in a hassle-free login journey with our intuitively designed login form. Effortlessly access your account.</p>
                  {error && <p   className='text-white text-center mt-5 text-lg  bg-red-700 p-1 rounded-full'>{error}</p>}
                  {success && <p   className='text-white text-center mt-5 text-lg  bg-green-700 p-1 rounded-full'>Registration successful! Please log in.</p>}
                </div>
                <div>
                  <label class="text-violet-700 text-[15px] mb-2 block">Name</label>
                  <div class="relative flex items-center">
                    <input name="Name" required class="w-full text-sm text-black focus:text-white bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-blue-600"
                      placeholder="Enter Name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-4" viewBox="0 0 682.667 682.667">
                      <defs>
                        <clipPath id="a" clipPathUnits="userSpaceOnUse">
                          <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                        </clipPath>
                      </defs>
                      <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                        <path fill="none" stroke-miterlimit="10" stroke-width="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                        <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                      </g>
                    </svg>
                  </div>
                </div>

                <div class="mt-4">
                  <label class="text-violet-700 text-[15px] mb-2 block">Email</label>
                  <div class="relative flex items-center">
                    <input name="email" required class="w-full text-sm text-black focus:text-white bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-blue-600"
                      placeholder="Enter email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-4" viewBox="0 0 682.667 682.667">
                      <defs>
                        <clipPath id="a" clipPathUnits="userSpaceOnUse">
                          <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                        </clipPath>
                      </defs>
                      <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                        <path fill="none" stroke-miterlimit="10" stroke-width="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                        <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                      </g>
                    </svg>
                  </div>
                </div>

                <div class="mt-4">
                  <label class="text-violet-700 text-[15px] mb-2 block">Password</label>
                  <div class="relative flex items-center">
                    <input name="password" type="password" required class="w-full text-sm text-black bg-gray-100 focus:bg-transparent focus:text-white px-4 py-3.5 rounded-md outline-blue-600"
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                      <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                    </svg>
                  </div>
                </div>

                <div class="mt-2">
                  <button type="submit" class="w-full shadow-xl py-3 px-6 text-sm tracking-wide font-semibold rounded-md text-white bg-violet-700 hover:bg-cyan-700 focus:outline-none">
                    Sign in
                  </button>
                </div>
                <p class="text-sm mt-8 text-center text-gray-400">Have an account?
                  <a class="text-violet-700 font-semibold tracking-wide hover:underline ml-1">
                    <HoveredLink to="/login">Login</HoveredLink>
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

export default RegisterPage;
