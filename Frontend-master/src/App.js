// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MensPage from './pages/MensPage';
import WomensPage from './pages/WomensPage';
import {Navbar} from './components/Navbar';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './admin/admin';
import ProductDetailPage from './pages/ProductDetailPage';

import MenTee from './mens/tee';
import Short from './mens/short';
import Pant from './mens/pants';

import WomenTee from './womens/tee';
import Skirt from './womens/skirt';
import Legging from './womens/legging';
import Checkout from './pages/Checkout';
import Footer from './components/Footer';


function App() {
  const [user, setUser] = useState(null);
  
  

  useEffect(() => {
    // Check for user in localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]); // Add the product to the cart array
  };


  return (
    <Router>
      <Navbar user={user} setUser={setUser}/>
      <Routes>
        <Route path="/" element={<HomePage addToCart={addToCart}/>} />
        <Route path="/login" element={<LoginPage setUser={setUser}/>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/mens" element={<MensPage />} />
        <Route path="/profile" element={<ProfilePage user={user} />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/products/:id" element={<ProductDetailPage addToCart={addToCart} />} />
        <Route path='/mens' element={<MensPage/>} />
        <Route path='/women' element={<WomensPage/>} />

        <Route path='/mens/tee' element={<MenTee/>} />
        <Route path='/mens/pant' element={<Pant/>} />
        <Route path='/mens/short' element={<Short/>} />

        <Route path='/womens/tee' element={<WomenTee/>} />
        <Route path='/womens/skirt' element={<Skirt/>} />
        <Route path='/womens/legging' element={<Legging/>} />
        <Route path='/checkout' element={<Checkout cart={cart}/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}
export default App;
