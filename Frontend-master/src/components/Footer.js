// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import logotext from '../assets/images/logo-text.png';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#27285C] to-[#15142B] shadow-lg p-6">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo on the left */}
        <img src={logotext} alt="company logo" className="w-40 sm:w-96" />

        {/* Links on the right */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <Link to="/" className="text-white hover:text-gray-300 transition">
            Home
          </Link>
          <Link to="/mens" className="text-white hover:text-gray-300 transition">
            Men's Section
          </Link>
          <Link to="/women" className="text-white hover:text-gray-300 transition">
            Women's Section
          </Link>
          <br/>
          <Link to="/login" className="text-white hover:text-gray-300 transition">
            Login
          </Link>
          <Link to="/register" className="text-white hover:text-gray-300 transition">
            Register
          </Link>
          <Link to="/checkout" className="text-white hover:text-gray-300 transition">
            Checkout
          </Link>
        </div>
      </div>
      <br/>


      {/* Copyright text */}
      <p className="text-white text-sm mt-4 text-center">
        © 2024 Devinda Stallone. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
