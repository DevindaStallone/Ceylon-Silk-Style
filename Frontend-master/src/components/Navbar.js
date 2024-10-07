import React, { useState, useEffect } from 'react';
import CartSidebar from '../pages/CartSidebar'; // Import CartSidebar component
import { HoveredLink, Menu, MenuItem } from "../components/ui/navbar-menu";
import { cn } from "../lib/utils";
import logo from '../assets/images/logo-text.png';

export function Navbar({ user, setUser }) {
    const [userName, setUserName] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
   
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.name) {
            setUserName(storedUser.name);   
        }
    }, [user]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setUserName(''); // Clear user name
    };

    const removeFromCart = (productId, size) => {
        const updatedCart = cart.filter(
            (item) => !(item._id === productId && item.selectedSize === size)
        );
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage
    };

    const updateQuantity = (productId, size, quantityChange) => {
        const updatedCart = cart.map((item) => {
            if (item._id === productId && item.selectedSize === size) {
                return { ...item, quantity: Math.max(1, item.quantity + quantityChange) };
            }
            return item;
        });
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage
    };

    return (
        <div className="relative w-full flex items-center justify-center">
            <NavbarDemo
                userName={userName}
                onLogout={handleLogout}
                toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} // Pass toggle function to NavbarDemo
                cart={cart} // Pass cart as a prop
            />

            <CartSidebar
                cart={cart}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
            />
        </div>
    );
}

function NavbarDemo({ className, userName, onLogout, toggleSidebar,cart }) {
    const [active, setActive] = useState(null);

    return (
        <div className={cn("fixed top-0 inset-x-0 bg-black shadow-lg z-50", className)} 
        style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',   // Slight transparency
            backdropFilter: 'blur(10px)',                 // Frosted glass effect
            border: '1px solid rgba(255, 255, 255, 0.2)',  // Light border to enhance effect
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'    // Subtle shadow
        }}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            {/* Left Side: Logo */}
            <div className="flex items-center space-x-8">
                <HoveredLink to="/" className="text-2xl font-extrebold text-white hover:text-indigo-600 transition">
                <img src={logo} alt='company logo' className='w-44'/>
                </HoveredLink>
                <Menu setActive={setActive}>
                    <div className="flex space-x-6">
                        <MenuItem setActive={setActive} active={active} item="Men" >
                            <div className="flex flex-col space-y-4 text-sm text-gray-300">
                                <HoveredLink to="/mens" className="hover:text-indigo-600 transition">Shop All</HoveredLink>
                                <HoveredLink to="/mens/tee" className="hover:text-indigo-600 transition">T-Shirts</HoveredLink>
                                <HoveredLink to="/mens/short" className="hover:text-indigo-600 transition">Shorts</HoveredLink>
                                <HoveredLink to="/mens/pant" className="hover:text-indigo-600 transition">Pants</HoveredLink>
                            </div>
                        </MenuItem>
                        <MenuItem setActive={setActive} active={active} item="Women">
                            <div className="flex flex-col space-y-4 text-sm text-gray-300">
                                <HoveredLink to="/women" className="hover:text-indigo-600 transition">Shop All</HoveredLink>
                                <HoveredLink to="/womens/tee" className="hover:text-indigo-600 transition">T-Shirts</HoveredLink>
                                <HoveredLink to="/womens/skirt" className="hover:text-indigo-600 transition">Skirts</HoveredLink>
                                <HoveredLink to="/womens/legging" className="hover:text-indigo-600 transition">Leggings</HoveredLink>
                            </div>
                        </MenuItem>
                    </div>
                </Menu>
            </div>
    
            {/* Right Side: User Actions */}
            <div className="flex items-center space-x-6">
                {!userName ? (
                    <>
                        <HoveredLink to="/login" className="text-gray-300 hover:text-indigo-600 transition">Login</HoveredLink>
                        <HoveredLink to="/register" className="text-gray-300 hover:text-indigo-600 transition">Register</HoveredLink>
                    </>
                ) : (
                    <>
                        <HoveredLink to="/profile">
                            <button className="bg-violet-800 text-white px-4 py-2 rounded-md hover:bg-violet-700 transition capitalize">
                                {userName}
                            </button>
                        </HoveredLink>
                        <button
                            onClick={onLogout}
                            className="text-gray-300 hover:text-red-600 transition"
                        >
                            Logout
                        </button>
    
                        {/* Cart Sidebar Toggle */}
                        <button onClick={toggleSidebar} className="relative">
                            <i className="fa fa-shopping-cart text-xl text-gray-300 hover:text-indigo-600 transition"></i>
                            {cart.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
                                    {cart.length}
                                </span>
                            )}
                        </button>
                    </>
                )}
            </div>
        </div>
    </div>
    
    );
    
}
