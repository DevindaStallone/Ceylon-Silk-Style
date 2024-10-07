import React, { useState } from 'react';

const Checkout = () => {
    // Retrieve cart from localStorage
    const [cart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // State for billing details
    const [billingDetails, setBillingDetails] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
    });

    // Calculate total price
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Handle input changes for billing details
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBillingDetails({ ...billingDetails, [name]: value });
    };

    // Function to handle the "Buy Now" button click
    const handleBuyNow = () => {
        const { name, address, phone, email } = billingDetails;

        if (!name || !address || !phone || !email) {
            alert("Please fill all billing details.");
            return;
        }

        // Prepare WhatsApp message
        const cartItems = cart.map(item => `${item.title} (Size: ${item.selectedSize}, Qty: ${item.quantity})`).join(", ");
        const message = `User ${name} has placed an order of: ${cartItems}. Billing details: Address: ${address}, Phone: ${phone}, Email: ${email}. Total: $${totalPrice.toFixed(2)}`;

        // Send to WhatsApp
        const whatsappUrl = `https://wa.me/0757099055?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="container mx-auto p-4 mt-24 grid grid-cols-2 gap-8">

            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">Order Summary</h2>
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div>
                        {cart.map((item, index) => (
                            <div key={index} className="mb-4 w-full bg-gradient-to-b from-[#27285C] to-[#15142B] rounded-lg shadow-lg flex p-4 items-center">
                                {/* Image on the left */}
                                <div className="w-24 h-24">
                                    <img
                                        src={`http://localhost:5000/${item.image}`}
                                        alt={item.title}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>

                                {/* Item details on the right */}
                                <div className="ml-4 flex-1">
                                    <h3 className="text-lg font-semibold">{item.title}</h3>
                                    <p className="text-gray-400">Size: {item.selectedSize}</p>
                                    <p className="text-gray-400">Quantity: {item.quantity}</p>
                                    <p className="text-gray-400 font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            </div>

                        ))}
                        <p className="font-bold text-2xl bg-gradient-to-b from-[#27285C] to-[#15142B] w-56 px-5 py-3 rounded-full">Total: ${totalPrice.toFixed(2)}</p>
                    </div>
                )}
            </div>
            <div className='bg-gradient-to-b from-[#27285C] to-[#15142B] h-[32rem] p-10 rounded-3xl'>
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Billing Details</h2>
                    <div className="mb-4">
                        <label className="block">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={billingDetails.name}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 p-2 rounded"
                            placeholder="Your full name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={billingDetails.address}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 p-2 rounded"
                            placeholder="Your shipping address"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={billingDetails.phone}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 p-2 rounded"
                            placeholder="Your phone number"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={billingDetails.email}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 p-2 rounded"
                            placeholder="Your email address"
                        />
                    </div>
                </div>

                <button
                    onClick={handleBuyNow}
                    className="w-24 bg-violet-800 text-white py-2 rounded hover:bg-violet-600 transition"
                >
                    Buy Now
                </button>
            </div>
        </div>
    );
};

export default Checkout;
