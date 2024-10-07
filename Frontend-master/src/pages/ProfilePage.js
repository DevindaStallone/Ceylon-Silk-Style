import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import for navigation after logout
import Profile from '../assets/images/profile.JPG';

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
  });
  const [orderDetailsVisible, setOrderDetailsVisible] = useState(false);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();  // Initialize navigation

  // Sample hard-coded orders
  const sampleOrders = [
    {
      _id: '1',
      items: [
        { title: 'Product 1' },
        { title: 'Product 2' },
      ],
      totalPrice: 50,
      status: 'Shipped',
    },
    {
      _id: '2',
      items: [
        { title: 'Product 3' },
      ],
      totalPrice: 30,
      status: 'Pending',
    },
  ];

  // Fetch user details from local storage
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    if (userInfo) {
      setUser(userInfo);
    }
  }, []);

  // Fetch order details when the button is clicked
  const fetchOrderDetails = () => {
    // Simulating an API call with hard-coded data
    setOrders(sampleOrders);
    setOrderDetailsVisible(true); // Show order details section
  };

  // Logout function to clear user data and redirect to login
  const handleLogout = () => {
    localStorage.removeItem('user');  // Clear user data from localStorage
    navigate('/login');  // Redirect to the login page
  };

  return (
    <div className="flex">
      <div className="fixed top-0 pt-24 left-0 h-screen w-72 bg-gradient-to-b from-[#27285C] to-[#15142B] p-6 text-white">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-44 h-44 rounded-full bg-white flex items-center justify-center">
            <img
              src={Profile}
              alt="Profile"
              className="rounded-full w-40 h-40"
            />
          </div>
          <h2 className="text-2xl mt-4 font-semibold uppercase">{user.name}</h2>
        </div>

        {/* Profile Details */}
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <i className="fa fa-envelope" aria-hidden="true"></i>
            <span className=''>{user.email}</span>
          </div>

          {/* Order Details Button */}
          <button
            onClick={fetchOrderDetails}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-400 py-2 text-lg font-semibold rounded-md"
          >
            Order Details
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full mt-4 bg-red-600 py-2 text-lg font-semibold rounded-md"
          >
            Logout
          </button>
          
        </div>
      </div>

      {/* Order Details Section */}
      <div className="flex-grow p-6 mt-24 ml-72">
        {orderDetailsVisible && (
          <div className="bg-white text-white p-4 rounded-lg shadow-lg bg-gradient-to-b from-[#27285C] to-[#15142B]">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            {orders.length > 0 ? (
              <ul className="space-y-4">
                {orders.map((order) => (
                  <li key={order._id} className="border-b pb-2">
                    <p><strong>Order ID:</strong> {order._id}</p>
                    <p><strong>Items:</strong> {order.items.map(item => item.title).join(', ')}</p>
                    <p><strong>Total Price:</strong> ${order.totalPrice}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No orders found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
